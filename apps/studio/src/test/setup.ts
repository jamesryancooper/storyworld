import { afterEach, vi } from "vitest";

/**
 * Global next/navigation mock for the jsdom suite. Components now read
 * property/production from the URL (DEC-0022); this backs those hooks with
 * the controllable navState so every test file gets working router hooks
 * without its own mock. Tests deep-link via setSearchParams and assert
 * writes via navState.replaceCalls. Reset between tests.
 */
vi.mock("next/navigation", async () => {
  const mod = await import("./next-navigation");
  return {
    usePathname: () => mod.navState.pathname,
    useSearchParams: () => mod.navState.search,
    useRouter: () => mod.navState.router,
  };
});

const { resetNav } = await import("./next-navigation");
afterEach(() => resetNav());
