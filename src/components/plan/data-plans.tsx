import { TabFilterProps } from "@/types/prop-types";
import TabFilter from "../filters/tab-filter";

const dataPlanTab: TabFilterProps = {
  filters: ["Limited", "Unlimited"],
  paramKey: "dataplan",
  fallback: "limited",
  replace: true,
};

export default function DataPlans() {
  return (
    <div>
      Data Plans
      <TabFilter {...dataPlanTab} />
    </div>
  );
}
