import { Suspense } from "react";
import { ReleaseBuilder } from "@/components/release-builder";
import { Loading } from "@/components/ui/loading";

// URL-owned context (DEC-0022) reads useSearchParams, which requires a
// Suspense boundary in the App Router.
export default function Page(): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <ReleaseBuilder />
    </Suspense>
  );
}
