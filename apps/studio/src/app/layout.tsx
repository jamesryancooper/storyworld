import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import "./globals.css";

export const metadata: Metadata = {
  title: "Storyworld Studio",
  description: "Governed narrative production over the Storyworld Engine",
};

const SURFACES: { href: string; label: string; ready: boolean }[] = [
  { href: "/", label: "Command Center", ready: true },
  { href: "/world-bible", label: "World Bible", ready: true },
  { href: "/arc-board", label: "Arc Board", ready: true },
  { href: "/generation", label: "Generation Workbench", ready: true },
  { href: "/continuity", label: "Continuity Console", ready: true },
  { href: "/review", label: "Review Room", ready: true },
  { href: "/release-builder", label: "Release Builder", ready: true },
  { href: "/settings", label: "Settings", ready: true },
];

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <div className="flex min-h-screen">
          <aside className="hidden w-60 shrink-0 border-r border-border md:block">
            <div className="px-5 py-5">
              <p className="text-sm font-semibold">Storyworld Studio</p>
              <p className="text-xs text-muted-foreground">governed production</p>
            </div>
            <nav aria-label="Studio surfaces" className="px-2">
              <ul className="flex flex-col gap-0.5">
                {SURFACES.map((surface) => (
                  <li key={surface.href}>
                    {surface.ready ? (
                      <Link
                        href={surface.href}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                      >
                        {surface.label}
                      </Link>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="block cursor-not-allowed rounded-lg px-3 py-2 text-sm text-muted-foreground"
                      >
                        {surface.label}
                        <Badge variant="muted" className="ml-2">soon</Badge>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-14 items-center justify-between border-b border-border px-6">
              <p className="text-sm text-muted-foreground">Storyworld Engine workspace</p>
              <Badge variant="outline">ryan-cooper · property_owner</Badge>
            </header>
            <main className="flex-1 px-6 py-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
