/**
 * Actor model for kernel commands (ADR-0008): every acceptance-class
 * command requires a human actor. Model/import actors may only propose.
 * DEC-0021 additionally binds acceptance-class commands to the
 * property_owner role; kind alone is never sufficient authority.
 */
export interface Actor {
  id: string;
  kind: "human" | "model" | "import" | "service";
  role: string;
}

export function requireHuman(actor: Actor, action: string): void {
  if (actor.kind !== "human") {
    throw new AuthorityError(
      `${action} requires an authorized human decision; actor ${actor.id} is ${actor.kind} (ADR-0008)`,
    );
  }
}

/**
 * Acceptance-class authorization (DEC-0021): a human actor holding the
 * property_owner role. Tenant binding is enforced structurally by the
 * kernel context and row-level security; delegation, expiry, and further
 * roles are deferred to the identity reserved crossing and fail closed.
 */
export function requireOwner(actor: Actor, action: string): void {
  requireHuman(actor, action);
  if (actor.role !== "property_owner") {
    throw new AuthorityError(
      `${action} requires the property_owner role; actor ${actor.id} has role "${actor.role}" (DEC-0021)`,
    );
  }
}

export class AuthorityError extends Error {}

/** Rejected input or a contract-nonconforming document (HTTP 400). */
export class ValidationError extends Error {}

/** Stale supersession or conflicting concurrent state (HTTP 409). */
export class ConflictError extends Error {}
