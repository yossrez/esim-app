import BaseLayout from "@/components/layout/base-layout";
import ContentLayout from "@/components/layout/content-layout";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import DataPlans from "@/components/plan/data-plans";
import ActivationPolicy from "@/components/plan/activation-policy";
import InfoSnackBar from "@/components/snacks/info-snack-bar";
import PlanDetails from "@/components/plan/plan-details";
import { TabFilterProps } from "@/types/prop-types";
import TabFilter from "@/components/filters/tab-filter";

const dayTab: TabFilterProps = {
  filters: ["Recommended", "1 Day", "3 Day"],
  paramKey: "day",
  fallback: "recommended",
};

export default function PageDataPlan() {
  const router = useRouter();

  return (
    <BaseLayout title="Choose Plan">
      <ContentLayout>
        <div className="flex items-center gap-3 p-5">
          <button
            type="button"
            onClick={router.back}
            className="cursor-pointer hover:bg-primary rounded-sm py-1 px-1.5 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-xl font-semibold">
            {capitalizeFirstLetter(router.query.planId as string)}
          </span>
        </div>
        <main>
          <TabFilter {...dayTab} />
          <DataPlans />
          <ActivationPolicy />
          <PlanDetails />
          <InfoSnackBar description="Some info here" />
        </main>
      </ContentLayout>
    </BaseLayout>
  );
}
