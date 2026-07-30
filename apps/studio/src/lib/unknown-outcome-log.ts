/**
 * Cross-reload record of commands whose outcome was never confirmed
 * (SF2/SWUX-001). The safe-command state machine holds the retained
 * idempotency key only in memory, so a reload during an `unknown` or
 * `unavailable` outcome would otherwise forget that a command may have
 * committed. Recording a short descriptor in sessionStorage lets a
 * persistent banner warn the creator to verify before resubmitting —
 * disclosure only; it does not resurrect the key.
 */
export interface UnknownOutcomeEntry {
  id: string;
  actionLabel: string;
  subjectLabel: string;
  at: string;
}

const STORAGE_KEY = "storyworld.unknown-outcomes";
const listeners = new Set<() => void>();
let cache: UnknownOutcomeEntry[] = [];
let storageBound = false;

function readStorage(): UnknownOutcomeEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is UnknownOutcomeEntry =>
        typeof e === "object" && e !== null &&
        typeof (e as UnknownOutcomeEntry).id === "string",
    );
  } catch {
    return [];
  }
}

function writeStorage(entries: UnknownOutcomeEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // sessionStorage unavailable (private mode / quota): the in-memory
    // cache still drives the banner for this page's lifetime.
  }
}

function refresh(): void {
  cache = readStorage();
  for (const listener of listeners) listener();
}

// Seed the cache once on the client so a reload surfaces prior entries.
if (typeof window !== "undefined") {
  cache = readStorage();
}

/** Record (or refresh) an unconfirmed-outcome entry, keyed by its id. */
export function recordUnknownOutcome(entry: { id: string; actionLabel: string; subjectLabel: string }): void {
  const next = readStorage().filter((e) => e.id !== entry.id);
  next.push({ ...entry, at: new Date().toISOString() });
  writeStorage(next);
  refresh();
}

/** Clear an entry once its logical operation later resolves definitively. */
export function clearUnknownOutcome(id: string): void {
  const next = readStorage().filter((e) => e.id !== id);
  writeStorage(next);
  refresh();
}

export function listUnknownOutcomes(): UnknownOutcomeEntry[] {
  return cache;
}

/** Subscribe to changes (for useSyncExternalStore); returns an unsubscribe. */
export function subscribeUnknownOutcomes(listener: () => void): () => void {
  listeners.add(listener);
  if (!storageBound && typeof window !== "undefined") {
    storageBound = true;
    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) refresh();
    });
  }
  return () => {
    listeners.delete(listener);
  };
}
