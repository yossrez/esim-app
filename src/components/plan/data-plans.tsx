import TabFilter from "../filters/tab-filter";
import Title from "../ui/title";
import { useQueryClient } from "@tanstack/react-query";
import {
  dataPlanTab,
  fallbackPageDataPlanFilter,
  pageDataPlanFilterKeys,
} from "@/lib/const/dataplan-filter";
import useFilterMemo from "@/lib/hooks/filter-memo";
import { useRouter } from "next/router";
import { HttpResponse, Product, ProductData } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import RadioSelect from "../ui/radio-select";

export default function DataPlans({
  form,
}: {
  form: UseFormReturn<FormDataPlan>;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const filterMemo = useFilterMemo(
    pageDataPlanFilterKeys,
    fallbackPageDataPlanFilter,
  );

  const data: HttpResponse<ProductData> | undefined = queryClient.getQueryData([
    "products",
    router.query.planId,
    JSON.stringify(filterMemo),
  ]);

  return (
    <div className="mb-6">
      <Title>Data Plans</Title>
      <div className="flex justify-center mt-3 mb-6">
        <TabFilter {...dataPlanTab} />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        {data?.data?.product_items.map((v) => (
          <DataPlanCard key={v.natural_name} plan={v} form={form} />
        ))}
      </div>
    </div>
  );
}

function DataPlanCard({
  plan,
  form,
}: {
  plan: Product;
  form: UseFormReturn<FormDataPlan>;
}) {
  return (
    <RadioSelect {...form.register("plan")} value={plan.natural_name}>
      {plan.natural_name}
    </RadioSelect>
  );
}
