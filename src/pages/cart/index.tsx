import Carts from "@/components/carts";
import DockContainer from "@/components/docks/dock-container";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import BackNav from "@/components/nav/back-nav";
import { Button } from "@/components/ui/button";
import { useCartItemsQuery } from "@/network/api-hooks/query";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PageCart() {
  const router = useRouter();
  const { isLoading, isError } = useCartItemsQuery();
  const [slugs, setSlugs] = useState<string[]>([]);

  function handleCheck(id: string) {
    setSlugs((prev) => {
      const newArr = Array.from(prev);
      const add = prev.includes(id);
      if (add) {
        return newArr.filter((v) => v !== id);
      }
      newArr.push(id);
      return newArr;
    });
  }

  return (
    <BaseLayout title="My Cart">
      <ContentLayout>
        <BackNav title="My Cart" />
        <main>
          {isLoading && "Loading ..."}
          {isError && "Error!"}
          <Carts handleCheck={handleCheck} />
        </main>
        <DockContainer>
          <Button
            onClick={() => {
              router.push(`/checkout?plan=c-${btoa(slugs.join("#"))}`);
            }}
            className="w-full bg-active/90 hover:bg-active h-12 md:text-lg"
            disabled={slugs.length === 0}
          >
            Checkout
          </Button>
        </DockContainer>
      </ContentLayout>
    </BaseLayout>
  );
}
