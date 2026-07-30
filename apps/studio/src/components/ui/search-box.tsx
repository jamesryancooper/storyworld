"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatusMessage } from "@/components/ui/status-message";
import { cn } from "@/lib/utils";
import { createEngineClient, type EngineClient, type SearchResult } from "@/lib/engine";

/**
 * Read-only, navigation-only cross-domain search (DEC-0026 / PROP-FG-10). A
 * WAI-ARIA combobox with a listbox popup: the input keeps DOM focus and the
 * active option is tracked with aria-activedescendant. Selecting a result
 * only navigates to its server-built contextual deep link — it never mutates,
 * approves, or publishes. Restricted/spoiler filtering and tenant scoping are
 * enforced server-side; this component renders whatever the API returns.
 */
export function SearchBox({ client }: { client?: EngineClient }): React.JSX.Element {
  const engine = React.useMemo(() => client ?? createEngineClient(), [client]);
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [status, setStatus] = React.useState<"idle" | "loading" | "ready" | "unavailable">("idle");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const listId = React.useId();
  const seq = React.useRef(0);

  const term = query.trim();

  React.useEffect(() => {
    if (term.length < 2) {
      setResults([]);
      setStatus("idle");
      setActive(-1);
      return;
    }
    setStatus("loading");
    const mine = ++seq.current;
    const handle = setTimeout(() => {
      void engine
        .search(term)
        .then((found) => {
          if (mine !== seq.current) return; // a newer query superseded this one
          setResults(found);
          setStatus("ready");
          setActive(-1);
        })
        .catch(() => {
          if (mine !== seq.current) return;
          setResults([]);
          setStatus("unavailable");
        });
    }, 200);
    return () => clearTimeout(handle);
  }, [engine, term]);

  const showPopup = open && term.length >= 2;

  function go(result: SearchResult | undefined): void {
    if (!result) return;
    setOpen(false);
    setActive(-1);
    router.push(result.deepLink); // navigation only — no mutation
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }
    if (!showPopup || status !== "ready" || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (event.key === "Enter") {
      if (active >= 0) {
        event.preventDefault();
        go(results[active]);
      }
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <label htmlFor="storyworld-search" className="sr-only">
        Search the storyworld
      </label>
      <Input
        id="storyworld-search"
        role="combobox"
        aria-expanded={showPopup}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
        placeholder="Search properties, canon, units, findings…"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
      />
      {showPopup ? (
        <div className="absolute z-30 mt-1 w-full rounded-lg border border-border bg-card shadow-md">
          {status === "loading" ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">Searching…</p>
          ) : status === "unavailable" ? (
            <StatusMessage variant="error" className="px-3 py-2">
              Search is unavailable — reload to retry.
            </StatusMessage>
          ) : results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">No matches.</p>
          ) : (
            <ul role="listbox" id={listId} aria-label="Search results" className="max-h-80 overflow-auto py-1">
              {results.map((result, index) => (
                <li
                  key={`${result.type}:${result.id}`}
                  id={`${listId}-opt-${index}`}
                  role="option"
                  aria-selected={active === index}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm",
                    active === index ? "bg-muted" : "hover:bg-muted",
                  )}
                  onMouseEnter={() => setActive(index)}
                  onMouseDown={(event) => {
                    // keep input focus so the click resolves before blur closes
                    event.preventDefault();
                    go(result);
                  }}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">{result.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{result.subtitle}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <Badge variant="muted">{result.type.replace("_", " ")}</Badge>
                    <span className="text-xs text-muted-foreground">{result.state}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
