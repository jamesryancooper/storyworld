import { mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { canonicalJson, contentSha256, uuidv7 } from "@storyworld/domain";
import type { BlobStore } from "@storyworld/storage";
import { createFsStore } from "@storyworld/storage";
import { signDetached, verifyDetached, type SigningKeyPair } from "./signing.js";

/**
 * Portable signed package export/import (ADR-0014; envelope contract
 * tag:storyworld-platform,2026:contracts/common-package-envelope/v1).
 * Layout: <dir>/envelope.json (canonical bytes), <dir>/envelope.sig
 * (detached Ed25519), <dir>/public-key.pem, <dir>/assets/<blobKey>.
 */
export interface ExportRecord {
  ref: string;
  document: Record<string, unknown>;
}

export interface ExportAsset {
  assetVersionRef: string;
  bytes: Uint8Array;
  mediaType: string;
}

export interface ExportInput {
  workspaceId: string;
  propertyId: string;
  canonReleaseRef: string;
  authorityHost: "storyworld" | "commerce_foundry" | "bekindrewind_runtime";
  originSystemVersion: string;
  createdAt: string;
  sensitivity: "public" | "internal" | "confidential" | "restricted" | "embargoed";
  records: ExportRecord[];
  assets: ExportAsset[];
}

export interface PackageEnvelope extends Record<string, unknown> {
  schema_version: "storyworld.package-envelope.v1";
}

export async function exportPackage(
  dir: string,
  input: ExportInput,
  pair: SigningKeyPair,
): Promise<PackageEnvelope> {
  await mkdir(join(dir, "assets"), { recursive: true });
  const assetStore = createFsStore(join(dir, "assets"));
  const assetIndex = [];
  for (const asset of input.assets) {
    const stored = await assetStore.put(asset.bytes, asset.mediaType);
    assetIndex.push({
      asset_version_ref: asset.assetVersionRef,
      location: `assets/${stored.sha256.slice(0, 2)}/${stored.sha256.slice(2, 4)}/${stored.sha256}`,
      content_type: asset.mediaType,
      size_bytes: stored.sizeBytes,
      sha256: stored.sha256,
      embedding: "embedded" as const,
    });
  }
  const recordManifest = input.records.map((record) => ({
    ref: record.ref,
    sha256: contentSha256(canonicalJson(record.document)),
  }));
  const envelope: PackageEnvelope = {
    schema_version: "storyworld.package-envelope.v1",
    package_type: "portable_project",
    package_version: "0.1.0",
    origin: {
      system: "storyworld-engine",
      system_version: input.originSystemVersion,
      created_at: input.createdAt,
    },
    authority_host: input.authorityHost,
    identifiers: {
      workspace_id: input.workspaceId,
      property_id: input.propertyId,
      correlation_id: uuidv7(),
    },
    snapshots: { canon_release_ref: input.canonReleaseRef },
    manifest: {
      entity_refs: [],
      narrative_unit_refs: [],
      asset_version_refs: input.assets.map((a) => a.assetVersionRef),
    },
    asset_index: assetIndex,
    governance_metadata: {
      rights_evidence_refs: [],
      provenance_complete: true,
      disclosure_obligations: [],
      sensitivity: input.sensitivity,
    },
    approval_receipts: [],
    validation_reports: [],
    integration_associations: {},
    signature: {
      algorithm: "ed25519",
      key_id: pair.keyId,
      detached_signature_sha256: "0".repeat(64),
    },
  };
  // Records travel alongside the envelope; their hashes bind them to it.
  (envelope as Record<string, unknown>)["record_manifest"] = recordManifest;
  const canonicalUnsigned = canonicalJson(envelope);
  const signature = signDetached(new TextEncoder().encode(canonicalUnsigned), pair);
  (envelope["signature"] as Record<string, unknown>)["detached_signature_sha256"] =
    contentSha256(signature);
  await writeFile(join(dir, "envelope.json"), canonicalJson(envelope));
  await writeFile(join(dir, "envelope.sig"), signature);
  await writeFile(
    join(dir, "public-key.pem"),
    pair.publicKey.export({ type: "spki", format: "pem" }),
  );
  await mkdir(join(dir, "records"), { recursive: true });
  for (const record of input.records) {
    await writeFile(
      join(dir, "records", `${record.ref.replaceAll(/[^a-zA-Z0-9_-]/g, "_")}.json`),
      canonicalJson(record.document),
    );
  }
  return envelope;
}

export interface VerifiedPackage {
  envelope: PackageEnvelope;
  records: Map<string, Record<string, unknown>>;
  readAsset: (sha256: string) => Promise<Uint8Array>;
}

/** Deterministic verification: signature, envelope hash binding, record hashes, asset hashes. */
export async function verifyPackage(dir: string): Promise<VerifiedPackage> {
  const envelopeBytes = await readFile(join(dir, "envelope.json"));
  const signature = new Uint8Array(await readFile(join(dir, "envelope.sig")));
  const publicKeyPem = await readFile(join(dir, "public-key.pem"), "utf8");
  const envelope = JSON.parse(envelopeBytes.toString()) as PackageEnvelope;
  const claimed = (envelope["signature"] as Record<string, unknown>)[
    "detached_signature_sha256"
  ] as string;
  if (contentSha256(signature) !== claimed) {
    throw new Error("signature file does not match envelope binding");
  }
  const unsigned = structuredClone(envelope) as PackageEnvelope;
  (unsigned["signature"] as Record<string, unknown>)["detached_signature_sha256"] = "0".repeat(64);
  if (!verifyDetached(new TextEncoder().encode(canonicalJson(unsigned)), signature, publicKeyPem)) {
    throw new Error("envelope signature verification failed");
  }
  if (canonicalJson(envelope) !== envelopeBytes.toString()) {
    throw new Error("envelope is not in canonical form");
  }
  const records = new Map<string, Record<string, unknown>>();
  const manifest = (envelope["record_manifest"] ?? []) as { ref: string; sha256: string }[];
  const files = new Map<string, string>();
  for (const name of await readdir(join(dir, "records"))) {
    files.set(name, await readFile(join(dir, "records", name), "utf8"));
  }
  for (const entry of manifest) {
    const filename = `${entry.ref.replaceAll(/[^a-zA-Z0-9_-]/g, "_")}.json`;
    const raw = files.get(filename);
    if (raw === undefined) throw new Error(`record ${entry.ref} missing from package`);
    if (contentSha256(raw) !== entry.sha256) throw new Error(`record ${entry.ref} hash mismatch`);
    records.set(entry.ref, JSON.parse(raw) as Record<string, unknown>);
  }
  const assetStore: BlobStore = createFsStore(join(dir, "assets"));
  for (const asset of (envelope["asset_index"] ?? []) as { sha256: string }[]) {
    if (!(await assetStore.verify(asset.sha256))) {
      throw new Error(`asset ${asset.sha256} failed integrity verification`);
    }
  }
  return {
    envelope,
    records,
    readAsset: (sha256) => assetStore.get(sha256),
  };
}
