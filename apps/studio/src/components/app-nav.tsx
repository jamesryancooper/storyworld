"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SURFACES: { href: string; label: string }[] = [
  { href: "/", label: "Command Center" },
  { href: "/world-bible", label: "World Bible" },
  { href: "/arc-board", label: "Arc Board" },
  { href: "/generation", label: "Generation Workbench" },
  { href: "/continuity", label: "Continuity Console" },
  { href: "/review", label: "Review Room" },
  { href: "/release-builder", label: "Release Builder" },
  { href: "/settings", label: "Settings" },
];

function isActive(pathname: string | null, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
}

function NavList({ pathname, onNavigate }: { pathname: string | null; onNavigate?: () => void }): React.JSX.Element {
  return (
    <ul className="flex flex-col gap-0.5">
      {SURFACES.map((surface) => {
        const active = isActive(pathname, surface.href);
        return (
          <li key={surface.href}>
            <Link
              href={surface.href}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm hover:bg-muted",
                active ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
              )}
              {...(active ? { "aria-current": "page" as const } : {})}
              {...(onNavigate ? { onClick: onNavigate } : {})}
            >
              {surface.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Studio navigation (SWUX-008/018). One client component serves both
 * breakpoints: a persistent sidebar at md and up, and — below md, where the
 * sidebar is hidden — an inline disclosure so narrow-screen and keyboard
 * users can still reach every surface. The active route is marked with
 * aria-current. The mobile disclosure is inline (not an overlay), so it needs
 * no focus trap; Escape closes it and returns focus to the toggle.
 */
export function AppNav(): React.JSX.Element {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  const close = React.useCallback(() => setOpen(false), []);

  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-border md:block">
        <div className="px-5 py-5">
          <p className="text-sm font-semibold">Storyworld Studio</p>
          <p className="text-xs text-muted-foreground">governed production</p>
        </div>
        <nav aria-label="Studio surfaces" className="px-2">
          <NavList pathname={pathname} />
        </nav>
      </aside>

      <div
        className="border-b border-border md:hidden"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggleRef.current?.focus();
          }
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold">Storyworld Studio</span>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((prior) => !prior)}
            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Menu
            <Badge variant="muted" aria-hidden>
              {open ? "×" : "≡"}
            </Badge>
          </button>
        </div>
        {open ? (
          <nav id="mobile-nav" aria-label="Studio surfaces menu" className="px-2 pb-3">
            <NavList pathname={pathname} onNavigate={close} />
          </nav>
        ) : null}
      </div>
    </>
  );
}
