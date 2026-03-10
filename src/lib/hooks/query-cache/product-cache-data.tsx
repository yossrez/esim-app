import { HttpResponse, ProductData } from "@/types";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useFilterMemo from "../filter-memo";
import {
  fallbackPageDataPlanFilter,
  pageDataPlanFilterKeys,
} from "../../const/dataplan-filter";
import { useMemo } from "react";

export default function useProductCacheData():
  | HttpResponse<ProductData>
  | undefined {
  const router = useRouter();
  const queryClient = useQueryClient();
  const filterMemo = useFilterMemo(
    pageDataPlanFilterKeys,
    fallbackPageDataPlanFilter,
  );
  const queryKey = useMemo(
    () => ["products", router.query.planId, JSON.stringify(filterMemo)],
    [router, filterMemo],
  );
  const isFetching = useIsFetching({ queryKey });

  const data: HttpResponse<ProductData> | undefined = useMemo(() => {
    // here to silent eslint
    if (isFetching) {
    }
    return queryClient.getQueryData(queryKey);
  }, [queryClient, queryKey, isFetching]);

  return data;
}
