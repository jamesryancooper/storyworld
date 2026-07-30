/**
 * Controllable next/navigation state for the jsdom suite. The global mock in
 * setup.ts reads from here; tests mutate it to deep-link (setSearchParams),
 * set the route (setPathname), and assert URL writes (replaceCalls). Router
 * writes update the search in place so a component that re-reads sees them.
 */
export const navState = {
  pathname: "/",
  search: new URLSearchParams(),
  replaceCalls: [] as string[],
  pushCalls: [] as string[],
  router: {
    replace(url: string): void {
      navState.replaceCalls.push(url);
      navState.search = new URLSearchParams(url.split("?")[1] ?? "");
    },
    push(url: string): void {
      navState.pushCalls.push(url);
      navState.search = new URLSearchParams(url.split("?")[1] ?? "");
    },
  },
};

export function resetNav(pathname = "/"): void {
  navState.pathname = pathname;
  navState.search = new URLSearchParams();
  navState.replaceCalls = [];
  navState.pushCalls = [];
}

export function setPathname(pathname: string): void {
  navState.pathname = pathname;
}

export function setSearchParams(query: string): void {
  navState.search = new URLSearchParams(query);
}
