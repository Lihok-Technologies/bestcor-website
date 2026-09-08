import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon, MapPinIcon, ArrowRightIcon, InfoIcon } from "lucide-react";
import { FacebookGlyph } from "@/components/icons";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { QuotationForm } from "@/components/quotation-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Request a Quotation",
  description:
    "Request a quotation from Bestcor Phils., Inc. for electrical, mechanical, electromechanical or civil works — maintenance, repairs, testing, construction and installation scope.",
  path: "/contact",
});

const steps = [
  ["01", "Send the details", "Describe the equipment, location and scope in the form."],
  ["02", "Bestcor reviews", "Your request goes straight to the Bestcor team for review."],
  ["03", "Follow-up & scope", "We reply by email to clarify and confirm the path forward."],
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact & quotations"
        title={
          <>
            Request a <span className="text-signal-bright">quotation</span>
          </>
        }
        lead="Tell us about the work you need — project inquiries, quotation requests, maintenance requirements, construction or installation scope, or field-service needs. The more detail you include — equipment, location, schedule — the better prepared Bestcor's response will be."
      >
        <ul className="flex flex-wrap gap-2.5" aria-label="Types of inquiries Bestcor handles">
          {[
            "Project inquiries",
            "Quotation requests",
            "Maintenance requirements",
            "Construction & installation scope",
            "Field-service needs",
          ].map((item) => (
            <li key={item} className="border border-border bg-card px-4 py-2 text-[0.8125rem] font-semibold text-foreground/85">
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="border-b border-border bg-background">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-16 md:py-20">
          <Reveal>
            <QuotationForm />
          </Reveal>

          <aside className="flex flex-col gap-6">
            <div className="border border-border bg-card">
              <h2 className="border-b border-border px-6 py-4 text-[0.8125rem] font-bold tracking-[0.16em] text-foreground uppercase">
                Contact details
              </h2>
              <ul className="space-y-5 px-6 py-6 text-[0.9375rem]">
                <li>
                  <p className="flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                    <MailIcon className="size-4 text-brand-bright" aria-hidden="true" /> Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1.5 inline-block break-all text-foreground underline-offset-4 transition hover:text-brand-bright hover:underline"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <p className="flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                    <MapPinIcon className="size-4 text-brand-bright" aria-hidden="true" /> Office address
                  </p>
                  <p className="mt-1.5 leading-relaxed text-foreground/90">{site.officeAddress}</p>
                </li>
                <li>
                  <p className="flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                    <FacebookGlyph className="size-4 text-brand-bright" /> Facebook
                  </p>
                  <a
                    href={site.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block text-foreground underline-offset-4 transition hover:text-brand-bright hover:underline"
                  >
                    {site.facebookHandle}
                  </a>
                </li>
              </ul>
            </div>

            <div className="border border-border bg-canvas-deep p-6">
              <h2 className="display text-[1.15rem] text-foreground">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {steps.map(([n, title, body]) => (
                  <li key={n} className="flex gap-4">
                    <span className="font-mono text-[0.8125rem] font-bold text-signal-bright">{n}</span>
                    <div>
                      <p className="text-[0.875rem] font-bold text-foreground">{title}</p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-start gap-3 border-l-2 border-brand bg-canvas-raised p-5">
              <InfoIcon className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" />
              <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                The office address above comes from Bestcor&apos;s own company
                profile. Telephone numbers listed in that profile are withheld
                until Bestcor confirms they are current.
              </p>
            </div>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.1em] text-muted-foreground uppercase transition hover:text-foreground"
            >
              Unsure which service fits? Review the services
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
