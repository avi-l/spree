"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const navItems = [
    "Dashboard",
    "Billboards",
    "Categories",
    "Sizes",
    "Colors",
    "Products",
    "Orders",
    "Settings",
  ];

  const routes = navItems.map((item) => ({
    href:
      item === "Dashboard"
        ? `/dashboard}`
        : `/${params.storeId}/${item.toLowerCase()}`,
    label: item,
    active: pathname === `/${params.storeId}/${item.toLowerCase()}`,
  }));

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
