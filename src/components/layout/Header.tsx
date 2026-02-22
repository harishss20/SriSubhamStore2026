"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_CONFIG, ROUTES } from "@/lib/constants";
import type { AuthState } from "@/store/auth-store";
import type { CartState } from "@/store/cart-store";
import { useCartStore, useAuthStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.products, label: "Products" },
  { href: ROUTES.cart, label: "Cart" },
];

export function Header() {
  const pathname = usePathname();
  const totalItems = useCartStore((state: CartState) => state.getTotalItems());
  const { isLoggedIn } = useAuth();
  const logout = useAuthStore((state: AuthState) => state.logout);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link
          href={ROUTES.home}
          className="group flex items-center gap-2"
        >
          <span className="bg-gradient-to-r from-[#3D9AC3] to-[#2d7a9a] bg-clip-text text-xl font-bold tracking-tight text-transparent transition-all duration-300 group-hover:from-[#2d7a9a] group-hover:to-[#3D9AC3]">
            {APP_CONFIG.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                pathname === href
                  ? "text-[#3D9AC3] bg-[#3D9AC3]/10"
                  : "text-zinc-600 hover:text-[#3D9AC3] hover:bg-zinc-100"
              }`}
            >
              {label}
              {label === "Cart" && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#3D9AC3] to-[#2d7a9a] px-1.5 text-[10px] font-semibold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => logout()}
              className="ml-2 px-4 py-2 text-sm font-medium text-zinc-600 rounded-full transition-all duration-200 hover:text-[#3D9AC3] hover:bg-zinc-100"
            >
              Logout
            </button>
          ) : (
            <Link
              href={ROUTES.cart}
              className="ml-2 px-4 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-[#3D9AC3] to-[#2d7a9a] shadow-sm transition-all duration-200 hover:shadow-md hover:from-[#3489ad] hover:to-[#2d7a9a]"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
