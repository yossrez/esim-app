import { NavLinkProps } from "@/types/prop-types";
import BottomDockPortal from "../portal/bottom-dock-portal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import activeNav from "@/lib/active-nav";

interface MobileNavProps {
  menu: NavLinkProps[];
}

export default function MobileNav({ menu }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <BottomDockPortal>
      <div className="bg-background py-3 outline shadow-md md:hidden flex justify-around gap-3">
        {menu.map((v) => {
          const Icon = v.icon;
          return (
            <Link key={v.title} href={v.href}>
              <div className="grid justify-items-center">
                <Icon size={v.iconSize} color={activeNav(pathname, v.href)} />
                <span
                  className={`text-sm ${activeNav(pathname, v.href, true)}`}
                >
                  {v.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </BottomDockPortal>
  );
}
