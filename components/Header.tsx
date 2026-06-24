"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Trang chu" },
  { href: "/products", label: "San pham" },
  { href: "/about", label: "Gioi thieu" },
  { href: "/contact", label: "Lien he" }
];

export default function Header() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cocoa/10 bg-porcelain/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-semibold tracking-normal text-cocoa">
          City Memory Candles
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-cocoa/75 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} className="transition hover:text-cocoa" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="focus-ring relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/15 bg-white text-cocoa shadow-sm transition hover:border-clay"
            aria-label="Gio hang"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-cocoa px-1 text-xs font-semibold text-white">
                {totalItems}
              </span>
            ) : null}
          </Link>
          <button
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/15 bg-white text-cocoa md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Mo menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-cocoa/10 bg-porcelain px-4 py-3 md:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-3 text-sm font-medium text-cocoa">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
