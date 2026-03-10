export default function activeNav(
  pathname: string,
  href: string,
  isTitle: boolean = false,
) {
  if (isTitle) return pathname === href ? "text-active" : "text-primary";
  return pathname === href ? "var(--color-active)" : "var(--color-primary)";
}
