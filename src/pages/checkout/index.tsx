import DockContainer from "@/components/docks/dock-container";
import ErrState from "@/components/error/err-state";
import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import BackNav from "@/components/nav/back-nav";
import { Button } from "@/components/ui/button";
import { checkoutOrigin } from "@/lib/const/checkout-origin";
import { sessionCheckoutKey } from "@/lib/const/session-keys";
import { useOrderMutation } from "@/network/api-hooks/mutation";
import { useCartItemsQuery } from "@/network/api-hooks/query";
import { Order } from "@/types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function PageCheckout() {
  const searchParams = useSearchParams();

  const paramMemo = useMemo(
    () => (searchParams.get("plan") as string) ?? "",
    [searchParams],
  );

  const isCartCheckout = useMemo(
    () => paramMemo.slice(0, 2) === checkoutOrigin.cart,
    [paramMemo],
  );

  const sessionCheckoutData = useMemo<Order | null>(() => {
    if (isCartCheckout) {
      return null;
    }
    if (typeof window === "undefined") {
      return null;
    }
    const data = sessionStorage.getItem(sessionCheckoutKey);
    if (data === null || data === "") {
      return null;
    }
    try {
      const order = JSON.parse(data) as Order;
      if (order.id !== atob(paramMemo?.slice(2))) {
        sessionStorage.removeItem(sessionCheckoutKey);
      } else {
        return order;
      }
    } catch {
      return null;
    }
    return null;
  }, [isCartCheckout, paramMemo]);

  const { data: cartData } = useCartItemsQuery(
    true,
    isCartCheckout ? paramMemo?.slice(2) : undefined,
  );

  const totalAmount = useMemo(() => {
    if (isCartCheckout) {
      return cartData?.data.reduce(
        (acc, val) => acc + val.quantity * val.plan.price,
        0,
      );
    }
    if (sessionCheckoutData === null) return 0;
    return sessionCheckoutData.quantity * sessionCheckoutData.plan.price;
  }, [cartData, sessionCheckoutData, isCartCheckout]);

  const orderMutation = useOrderMutation();

  function handleBuy() {
    if (isCartCheckout) {
      if (cartData?.data === null) {
        console.error("Cart Not Valid");
      }
      orderMutation.mutate(cartData?.data as Order[]);
      return;
    }
    if (sessionCheckoutData === null) {
      console.error("Session Not Valid");
      return;
    }
    orderMutation.mutate([sessionCheckoutData]);
  }

  if (
    paramMemo === "" ||
    ((cartData === undefined || cartData.data.length === 0) &&
      sessionCheckoutData === null)
  ) {
    return <ErrState code={404} description="Not Found!" />;
  }

  return (
    <BaseLayout title="Checkout">
      <ContentLayout>
        <BackNav title="Checkout" />
        {(() => {
          if (isCartCheckout) {
            return cartData?.data.map((v) => (
              <div key={v.id}>{JSON.stringify(v)}</div>
            ));
          }
          return <div>{JSON.stringify(sessionCheckoutData)}</div>;
        })()}
        <DockContainer>
          <div className="grid w-full gap-5">
            <div className="flex justify-between">
              <span className="block">Total</span>
              <span className="block">IDR {totalAmount?.toLocaleString()}</span>
            </div>
            <Button
              onClick={handleBuy}
              className="w-full bg-active/90 hover:bg-active h-12 md:text-lg"
              disabled={sessionCheckoutData === null || cartData === null}
            >
              Place Order
            </Button>
          </div>
        </DockContainer>
      </ContentLayout>
    </BaseLayout>
  );
}
