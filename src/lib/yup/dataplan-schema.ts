import { InferType, mixed, object, string } from "yup";

export const planSchema = object({
  plan: string().required(),
  activation: mixed()
    .test(
      "string-or-date",
      "Must be a string or valid date",
      (value: unknown) => {
        if (value === undefined || value === null) return false;

        if (typeof value === "string") {
          if (value === "now") return true;

          const parsed = Date.parse(value);
          return !Number.isNaN(parsed);
        }

        if (value instanceof Date) {
          return !Number.isNaN(value.getTime());
        }

        return false;
      },
    )
    .required(),
});

export type FormDataPlan = InferType<typeof planSchema>;
