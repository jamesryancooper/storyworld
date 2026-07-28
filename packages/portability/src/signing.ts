import {
  generateKeyPairSync,
  sign as edSign,
  verify as edVerify,
  createPrivateKey,
  createPublicKey,
  type KeyObject,
} from "node:crypto";

/**
 * Ed25519 detached signatures over canonical package bytes (ADR-0014).
 * Key custody is deployment-specific; this module never persists keys.
 */
export interface SigningKeyPair {
  keyId: string;
  signingKey: KeyObject;
  publicKey: KeyObject;
}

export function generateSigningKeyPair(keyId: string): SigningKeyPair {
  const { privateKey: signingKey, publicKey } = generateKeyPairSync("ed25519");
  return { keyId, signingKey, publicKey };
}

export function exportPublicKeyPem(pair: SigningKeyPair): string {
  return pair.publicKey.export({ type: "spki", format: "pem" }).toString();
}

export function importKeys(keyId: string, signingKeyPem: string): SigningKeyPair {
  const signingKey = createPrivateKey(signingKeyPem);
  return { keyId, signingKey, publicKey: createPublicKey(signingKey) };
}

export function signDetached(bytes: Uint8Array, pair: SigningKeyPair): Uint8Array {
  return new Uint8Array(edSign(null, bytes, pair.signingKey));
}

export function verifyDetached(
  bytes: Uint8Array,
  signature: Uint8Array,
  publicKeyPem: string,
): boolean {
  return edVerify(null, bytes, createPublicKey(publicKeyPem), signature);
}
