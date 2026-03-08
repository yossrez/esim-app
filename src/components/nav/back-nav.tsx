import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

interface BackNavProps {
  title: string;
}

export default function BackNav({ title }: BackNavProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 p-5">
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.replace("/store");
          }
        }}
        className="cursor-pointer hover:bg-primary rounded-sm py-1 px-1.5 hover:text-white"
      >
        <ArrowLeft size={20} />
      </button>
      <span className="text-xl font-semibold">{title}</span>
    </div>
  );
}
