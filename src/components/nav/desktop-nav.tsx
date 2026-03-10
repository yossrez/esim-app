import activeNav from "@/lib/active-nav";
import { NavLinkProps } from "@/types/prop-types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DesktopNavProps {
  menu: NavLinkProps[];
}

export default function DesktopNav({ menu }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <div className="basis-full max-md:hidden flex justify-center gap-10">
      {menu.map((v) => {
        const Icon = v.icon;
        return (
          <Link key={v.title} href={v.href}>
            <div className="flex items-center gap-3">
              <Icon size={v.iconSize} color={activeNav(pathname, v.href)} />
              <span className={activeNav(pathname, v.href, true)}>
                {v.title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
