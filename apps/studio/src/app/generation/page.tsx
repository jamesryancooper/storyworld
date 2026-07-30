import { Suspense } from "react";
import { GenerationWorkbench } from "@/components/generation-workbench";
import { Loading } from "@/components/ui/loading";

// URL-owned context (DEC-0022) reads useSearchParams, which requires a
// Suspense boundary in the App Router.
export default function Page(): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <GenerationWorkbench />
    </Suspense>
  );
}
