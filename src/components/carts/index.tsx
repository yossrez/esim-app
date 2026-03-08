import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import useCartCacheData from "@/lib/hooks/query-cache/cart-cache-data";
import { Cart } from "@/types";

interface CartsProps {
  handleCheck: (id: string) => void;
}

export default function Carts({ handleCheck }: CartsProps) {
  const data = useCartCacheData();

  return (
    <FieldGroup className="mx-auto w-3/4">
      {data?.data?.map((v) => (
        <CartBox key={v.id} data={v} handleCheck={handleCheck} />
      ))}
    </FieldGroup>
  );
}

interface CartBoxProps extends CartsProps {
  data: Cart;
}

function CartBox({ data, handleCheck }: CartBoxProps) {
  return (
    <Field orientation="horizontal" className="bg-white p-5 rounded-lg">
      <Checkbox
        id={data.id}
        name={data.plan.name}
        className="mt-1"
        onClick={() => handleCheck(data.id)}
      />
      <FieldContent>
        <FieldLabel htmlFor={data.id}>{data.plan.name}</FieldLabel>
        <FieldDescription></FieldDescription>
      </FieldContent>
    </Field>
  );
}
