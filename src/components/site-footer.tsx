import Link from "next/link";
import { MailIcon, MapPinIcon, ArrowUpRightIcon } from "lucide-react";
import { FacebookGlyph } from "@/components/icons";
import { site, mainNav, footerValues } from "@/lib/site";
import { services } from "@/lib/services";
import { LogoMark } from "@/components/logo";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-canvas-deep">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr] lg:gap-8">
        {/* Brand */}
        <div>
          <LogoMark size={64} className="rounded-[2px]" />
          <p className="display mt-5 text-[1.4rem] text-foreground">
            Bestcor <span className="text-brand-bright">Phils., Inc.</span>
          </p>
          <p className="mt-1 text-[0.625rem] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Civil · Electromechanical Contractor
          </p>
          <p className="mt-5 max-w-sm text-[0.875rem] leading-relaxed text-muted-foreground">
            {site.tagline}. {site.supportingPosition}
          </p>
        </div>

        {/* Company */}
        <nav aria-label="Footer — company">
          <h2 className="eyebrow !text-[0.625rem] text-muted-foreground">Company</h2>
          <ul className="mt-5 space-y-3">
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.875rem] font-medium text-muted-foreground transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Footer — services">
          <h2 className="eyebrow !text-[0.625rem] text-muted-foreground">Services</h2>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group inline-flex items-start gap-1 text-[0.875rem] font-medium text-muted-foreground transition hover:text-foreground"
                >
                  <span>{s.title}</span>
                  <ArrowUpRightIcon className="mt-0.5 size-3 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-[0.8125rem] font-bold tracking-[0.05em] text-brand-bright uppercase"
              >
                All services <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="eyebrow !text-[0.625rem] text-muted-foreground">Contact</h2>
          <ul className="mt-5 space-y-4 text-[0.875rem]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-start gap-2.5 text-muted-foreground transition hover:text-foreground"
              >
                <MailIcon className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" />
                <span className="break-all">{site.email}</span>
              </a>
            </li>
            <li className="inline-flex items-start gap-2.5 text-muted-foreground">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" />
              <span>{site.location}</span>
            </li>
            <li>
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-muted-foreground transition hover:text-foreground"
              >
                <FacebookGlyph className="size-4 shrink-0 text-brand-bright" />
                <span>{site.facebookHandle}</span>
              </a>
            </li>
          </ul>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-l border-border/80 pl-4 text-[0.625rem] font-semibold tracking-[0.22em] text-muted-foreground/80 uppercase">
            {footerValues.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </p>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="wrap flex flex-col items-start justify-between gap-3 py-6 text-[0.75rem] text-muted-foreground/80 sm:flex-row sm:items-center">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="text-[0.6875rem] tracking-[0.08em] uppercase">
            {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
