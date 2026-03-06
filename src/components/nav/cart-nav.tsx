import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import activeNav from "@/lib/active-nav";

export default function CartNav({ iconSize = 22 }: { iconSize?: number }) {
  const pathname = usePathname();
  return (
    <Link href="/cart">
      <ShoppingCart size={iconSize} color={activeNav(pathname, "/cart")} />
    </Link>
  );
}
