import { Suspense } from "react";
import { ReviewRoom } from "@/components/review-room";
import { Loading } from "@/components/ui/loading";

// URL-owned context (DEC-0022) reads useSearchParams, which requires a
// Suspense boundary in the App Router.
export default function Page(): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <ReviewRoom />
    </Suspense>
  );
}
