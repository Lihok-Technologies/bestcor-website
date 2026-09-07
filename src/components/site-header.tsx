"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, mainNav, headerCta } from "@/lib/site";
import { BrandLink } from "@/components/logo";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled || open
          ? "border-border/80 bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="wrap flex min-h-[76px] items-center gap-6 lg:min-h-[86px]">
        <BrandLink />

        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center gap-7 lg:flex"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href, pathname) ? "true" : undefined}
              className={cn("navlink", isActive(item.href, pathname) && "is-active")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={headerCta.href}
          className="btn btn--red ml-auto hidden !min-h-12 !px-6 text-[0.8125rem] uppercase tracking-[0.06em] lg:inline-flex"
        >
          {headerCta.label}
        </Link>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className="ml-auto inline-flex size-11 items-center justify-center rounded-sm border border-border/70 text-foreground transition hover:bg-white/5 lg:hidden"
          >
            <MenuIcon className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm gap-0 border-l-border/70 bg-canvas-raised/98 p-0 backdrop-blur-md">
            <SheetHeader className="border-b border-border/70 p-5">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation for {site.legalName}
              </SheetDescription>
              <BrandLink />
            </SheetHeader>
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col overflow-y-auto p-4"
            >
              {mainNav.map((item, i) => (
                <SheetClose key={item.href} render={<Link href={item.href} />}>
                  <span
                    aria-current={isActive(item.href, pathname) ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-4 border-b border-border/50 px-2 py-4 text-[0.9375rem] font-semibold tracking-[0.08em] uppercase transition hover:text-brand-bright",
                      isActive(item.href, pathname) && "text-brand-bright",
                    )}
                  >
                    <span className="font-mono text-[0.6875rem] text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </span>
                </SheetClose>
              ))}
            </nav>
            <SheetFooter className="gap-3 border-t border-border/70 p-5">
              <SheetClose
                render={
                  <Link
                    href={headerCta.href}
                    className="btn btn--red w-full uppercase tracking-[0.06em]"
                  />
                }
              >
                {headerCta.label}
              </SheetClose>
              <p className="text-center text-[0.6875rem] leading-relaxed text-muted-foreground">
                {site.email}
              </p>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
