import { Info } from "lucide-react";

export default function InfoSnackBar({
  description = "Info here",
}: {
  description: string;
}) {
  return (
    <div className="flex gap-3 items-center bg-secondary p-3 rounded-lg">
      <div className="bg-amber-500 p-1.5 rounded-lg w-fit">
        <Info color="white" size={17} />
      </div>
      <span className="text-sm">{description}</span>
    </div>
  );
}
