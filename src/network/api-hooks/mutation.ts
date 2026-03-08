import kyClient from "@/lib/ky-client";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import { Order } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";

export function useAddToCartMutation(reset: UseFormReset<FormDataPlan>) {
  return useMutation({
    mutationFn: (newPlan: FormDataPlan) => {
      return kyClient.post("carts", { json: newPlan });
    },
    onSuccess: () => {
      reset();
      alert("Plan added to cart!");
    },
  });
}

export function usePlaceOrderMutation() {
  return useMutation({
    mutationFn: (newOrders: Order[]) => {
      return kyClient.post("orders/buy", { json: newOrders });
    },
    onSuccess: () => {
      alert("Order has been placed!");
    },
  });
}
