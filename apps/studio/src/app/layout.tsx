import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { AppNav } from "@/components/app-nav";
import { SearchBox } from "@/components/ui/search-box";
import { UnknownOutcomeBanner } from "@/components/ui/unknown-outcome-banner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Storyworld Studio",
  description: "Governed narrative production over the Storyworld Engine",
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main"
          className="sr-only rounded-lg border border-border bg-card px-3 py-2 text-sm focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col md:flex-row">
          <AppNav />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-14 items-center gap-4 border-b border-border px-6">
              <div className="min-w-0 flex-1">
                <SearchBox />
              </div>
              <Badge variant="outline" className="shrink-0">ryan-cooper · property_owner · development identity — not verified</Badge>
            </header>
            <main id="main" className="flex-1 px-6 py-6">
              <UnknownOutcomeBanner />
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
