import pg from "pg";
import type { Pool, PoolClient } from "pg";

export function createPool(connectionString: string): Pool {
  return new pg.Pool({ connectionString, max: 5 });
}

/**
 * Run work inside a transaction scoped to one tenant. RLS policies read
 * storyworld.tenant_id via current_setting; the setting is transaction-local
 * (set_config(..., true)) so pooled connections never leak tenant scope.
 */
export async function withTenant<T>(
  pool: Pool,
  tenantId: string,
  work: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT set_config('storyworld.tenant_id', $1, true)", [tenantId]);
    const value = await work(client);
    await client.query("COMMIT");
    return value;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
