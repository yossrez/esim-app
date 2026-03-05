import ErrState from "@/components/error/err-state";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";

export default function Page500() {
  return (
    <BaseLayout title="Something went wrong...">
      <ContentLayout>
        <ErrState code={500} description="Server-side error occurred" />
      </ContentLayout>
    </BaseLayout>
  );
}
