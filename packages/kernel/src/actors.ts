/**
 * Actor model for kernel commands (ADR-0008): every acceptance-class
 * command requires a human actor. Model/import actors may only propose.
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

export class AuthorityError extends Error {}
