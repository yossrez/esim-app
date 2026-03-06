import { UseFormReturn } from "react-hook-form";
import Title from "../ui/title";
import { FormDataPlan } from "@/lib/yup/dataplan-schema";
import { activationPolicy } from "@/lib/const/activation-policy";
import { Input } from "../ui/input";
import RadioSelect from "../ui/radio-select";
import { useState } from "react";

export default function ActivationPolicy({
  form,
}: {
  form: UseFormReturn<FormDataPlan>;
}) {
  const [date, setDate] = useState<string>();

  return (
    <div className="mb-6">
      <Title>Activation Policy</Title>
      <div>
        {activationPolicy.map((v) => {
          if (v === "now") {
            return (
              <RadioSelect key={v} {...form.register("activation")} value={v}>
                {v}
              </RadioSelect>
            );
          }
          return (
            <RadioSelect key={v} {...form.register("activation")} value={date}>
              <Input type="date" onChange={(e) => setDate(e.target.value)} />
            </RadioSelect>
          );
        })}
      </div>
    </div>
  );
}
