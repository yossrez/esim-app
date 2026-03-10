import ErrState from "@/components/error/err-state";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";

export default function Page404() {
  return (
    <BaseLayout title="Page Not Found">
      <ContentLayout>
        <ErrState code={404} description="Oops, page not exist." />
      </ContentLayout>
    </BaseLayout>
  );
}
