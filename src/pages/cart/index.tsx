import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";

export default function PageCart() {
  return (
    <BaseLayout title="My Cart">
      <ContentLayout>
        <div>Cart</div>
      </ContentLayout>
    </BaseLayout>
  );
}
