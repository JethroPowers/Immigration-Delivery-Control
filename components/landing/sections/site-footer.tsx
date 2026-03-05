"use client";

import { navItems } from "@/lib/demoData";

export function SiteFooter() {
  return (
    <footer className="container border-t border-border/70 py-8 text-sm text-muted-foreground">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p>Immigration Delivery Control</p>
        <div className="flex items-center gap-5">
          {navItems.map((item) => (
            <a key={item.href} className="hover:text-foreground" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export const Footer = SiteFooter;
