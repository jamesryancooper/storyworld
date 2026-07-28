import { parseArgs } from "node:util";
import { exportProductionPackage, type KernelContext } from "@storyworld/kernel";
import { generateSigningKeyPair, importKeys, verifyPackage, type SigningKeyPair } from "@storyworld/portability";

/**
 * storyworld CLI (F3): the second public entry surface over the same
 * kernel commands as the API (ADR-0002). Commands used by the GATE-0005
 * demonstration: export-production, verify-package.
 */
export interface CliDeps {
  ctx: KernelContext;
  keys?: SigningKeyPair;
  out: (line: string) => void;
}

export async function runCli(argv: string[], deps: CliDeps): Promise<number> {
  const [command, ...rest] = argv;
  const { values } = parseArgs({
    args: rest,
    options: {
      production: { type: "string" },
      dir: { type: "string" },
      "key-id": { type: "string" },
      "signing-key-pem": { type: "string" },
    },
    strict: true,
  });
  switch (command) {
    case "export-production": {
      if (!values.production) throw new Error("--production required");
      const pair =
        deps.keys ??
        (values["signing-key-pem"]
          ? importKeys(values["key-id"] ?? "cli-key", values["signing-key-pem"])
          : generateSigningKeyPair(values["key-id"] ?? "cli-ephemeral"));
      const exported = await exportProductionPackage(deps.ctx, {
        productionId: values.production,
        ...(values.dir ? { dir: values.dir } : {}),
        pair,
      });
      deps.out(`exported ${exported.dir}`);
      return 0;
    }
    case "verify-package": {
      if (!values.dir) throw new Error("--dir required");
      const verified = await verifyPackage(values.dir);
      deps.out(
        `verified package: ${String((verified.envelope["identifiers"] as Record<string, unknown>)["correlation_id"])} records=${verified.records.size}`,
      );
      return 0;
    }
    default:
      deps.out("usage: storyworld <export-production|verify-package> [options]");
      return 2;
  }
}
