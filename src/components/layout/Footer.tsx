import { APP_CONFIG, ROUTES } from "@/lib/constants";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 to-zinc-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3D9AC3]/30 to-transparent" />
      <div className="relative container mx-auto px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Link
              href={ROUTES.home}
              className="inline-block bg-gradient-to-r from-[#3D9AC3] to-[#2d7a9a] bg-clip-text text-lg font-bold text-transparent"
            >
              {APP_CONFIG.name}
            </Link>
            <p className="max-w-xs text-sm text-zinc-500 leading-relaxed">
              {APP_CONFIG.description}
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link
              href={ROUTES.aboutUs}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#3D9AC3]"
            >
              About Us
            </Link>
            <Link
              href={ROUTES.contactUs}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#3D9AC3]"
            >
              Contact
            </Link>
            <Link
              href={ROUTES.terms}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#3D9AC3]"
            >
              Terms & Conditions
            </Link>
            <Link
              href={ROUTES.privacy}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#3D9AC3]"
            >
              Privacy
            </Link>
            <Link
              href={ROUTES.returns}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#3D9AC3]"
            >
              Returns
            </Link>
            <Link
              href={ROUTES.shipping}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-[#3D9AC3]"
            >
              Shipping
            </Link>
          </nav>
        </div>
        <div className="mt-10 pt-8 border-t border-zinc-200/80">
          <p className="text-center text-sm text-zinc-400">
            © {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
