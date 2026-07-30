"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

/**
 * URL-owned property/production context (SWUX-013; DEC-0022). The query
 * string is the canonical carrier — `?property=<id>&production=<id>` — so
 * selection is deep-linkable and restored on reload, Back, and Forward.
 * No hidden global store and no localStorage. Changing the property clears
 * the production, since a production belongs to one property.
 */
export interface UrlContext {
  property: string | null;
  production: string | null;
  setProperty(id: string | null): void;
  setProduction(id: string | null): void;
}

export function useUrlContext(): UrlContext {
  const pathname = usePathname();
  const router = useRouter();
  const search = useSearchParams();
  const property = search.get("property");
  const production = search.get("production");

  const write = React.useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname],
  );

  const setProperty = React.useCallback(
    (id: string | null) => {
      const next = new URLSearchParams(search.toString());
      if (id) next.set("property", id);
      else next.delete("property");
      next.delete("production");
      write(next);
    },
    [search, write],
  );

  const setProduction = React.useCallback(
    (id: string | null) => {
      const next = new URLSearchParams(search.toString());
      if (id) next.set("production", id);
      else next.delete("production");
      write(next);
    },
    [search, write],
  );

  return { property, production, setProperty, setProduction };
}
