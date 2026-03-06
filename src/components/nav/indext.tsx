import localFont from "next/font/local";
import { NavLinkProps } from "@/types/prop-types";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import { House } from "lucide-react";
import { Store } from "lucide-react";
import { Receipt } from "lucide-react";
import CartNav from "./cart-nav";

const iconSize = 22;
const navLinks: NavLinkProps[] = [
  {
    title: "Home",
    icon: House,
    iconSize: iconSize,
    href: "/",
  },
  {
    title: "Store",
    icon: Store,
    iconSize: iconSize,
    href: "/store",
  },
  {
    title: "Orders",
    icon: Receipt,
    iconSize: iconSize,
    href: "/orders",
  },
];

const geistSans = localFont({
  src: "../../pages/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../pages/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Nav() {
  return (
    <nav
      className={`container mx-auto sticky top-0 bg-background ${geistSans.variable} ${geistMono.variable} font-(family-name:--font-geist-mono)`}
    >
      <div className="flex max-md:justify-end justify-between items-center p-5 mx-5">
        <DesktopNav menu={navLinks} />
        <CartNav />
      </div>
      <MobileNav menu={navLinks} />
    </nav>
  );
}
