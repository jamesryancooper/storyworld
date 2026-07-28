import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import type { Pool } from "pg";

export interface AppliedMigration {
  filename: string;
  sha256: string;
}

/**
 * Plain-SQL migration runner (DEC-0009). Applied migrations are immutable:
 * a content-hash mismatch against an applied file is a hard error, never a
 * re-apply (ADR-0009 discipline applied to schema history).
 */
export async function migrate(pool: Pool, dir: string): Promise<AppliedMigration[]> {
  await pool.query(`CREATE TABLE IF NOT EXISTS public.schema_migrations (
    filename text PRIMARY KEY,
    sha256 text NOT NULL,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);
  const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();
  const appliedRows = await pool.query<{ filename: string; sha256: string }>(
    "SELECT filename, sha256 FROM public.schema_migrations",
  );
  const applied = new Map(appliedRows.rows.map((r) => [r.filename, r.sha256]));
  const result: AppliedMigration[] = [];
  for (const filename of files) {
    const sql = await readFile(join(dir, filename), "utf8");
    const sha256 = createHash("sha256").update(sql).digest("hex");
    const existing = applied.get(filename);
    if (existing !== undefined) {
      if (existing !== sha256) {
        throw new Error(`applied migration ${filename} changed on disk (immutable history)`);
      }
      continue;
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("INSERT INTO public.schema_migrations (filename, sha256) VALUES ($1, $2)", [
        filename,
        sha256,
      ]);
      await client.query("COMMIT");
      result.push({ filename, sha256 });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
  return result;
}
