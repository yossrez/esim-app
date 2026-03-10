import { CartData, HttpResponse } from "@/types";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useCartCacheData(): HttpResponse<CartData> | undefined {
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => ["carts"], []);
  const isFectching = useIsFetching({ queryKey });

  const data: HttpResponse<CartData> | undefined = useMemo(() => {
    // here to silent eslint
    if (isFectching) {
    }
    return queryClient.getQueryData(queryKey);
  }, [queryClient, isFectching, queryKey]);

  return data;
}
