import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  TargetIcon,
  EyeIcon,
  CalendarCheckIcon,
  MapPinIcon,
  MailIcon,
} from "lucide-react";
import { site, companyHistory } from "@/lib/site";
import { curated } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Reveal, ImageReveal } from "@/components/reveal";

export const metadata: Metadata = buildMetadata({
  title: "About Bestcor",
  description:
    "Bestcor Phils., Inc. is a civil–electromechanical contractor based in San Jose del Monte, Bulacan, operating since November 2005 — guided by integrity, quality, reliability and expertise.",
  path: "/about",
});

const pillars = [
  {
    id: "integrity",
    title: "Integrity",
    body: "We conduct ourselves honestly and deal with clients the way we would want to be dealt with — clear scope, clear commitments, and work we stand behind.",
  },
  {
    id: "quality",
    title: "Quality",
    body: "Every task is executed with careful workmanship. From routine maintenance to full installations, the standard does not change with the size of the job.",
  },
  {
    id: "reliability",
    title: "Reliability",
    body: "Clients should be able to count on us — dependable crews, realistic schedules, and follow-through from start to finish.",
  },
  {
    id: "expertise",
    title: "Expertise",
    body: "Our people work across electrical, electromechanical and civil scope, applying technical discipline to problems on the ground.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Bestcor"
        title={
          <>
            A contractor built on <span className="text-brand-bright">integrity</span> &{" "}
            <span className="text-signal-bright">quality</span>
          </>
        }
        lead={`${site.legalName} is a civil–electromechanical contractor. ${site.supportingPosition}`}
      />

      {/* Company intro */}
      <section className="border-b border-border bg-background">
        <div className="wrap grid gap-14 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <ImageReveal className="order-2 lg:order-1">
            <figure className="tick-panel">
              <Image
                src={curated["about-crew"].src}
                alt={curated["about-crew"].alt}
                width={curated["about-crew"].width}
                height={curated["about-crew"].height}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="aspect-square w-full border border-border object-cover"
              />
              <figcaption className="sr-only">{curated["about-crew"].alt}</figcaption>
            </figure>
          </ImageReveal>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">Who we are</p>
            <h2 className="display mt-4 text-[2rem] text-foreground sm:text-[2.6rem]">
              Electrical, electromechanical &amp; civil work — delivered with
              discipline
            </h2>
            <div className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              <p>
                Bestcor performs preventive maintenance, on-site repairs,
                electrical testing and diagnostics, and the supply,
                installation and construction of electrical distribution
                facilities. Our crews also carry out distribution component
                works and transmission and pole-line construction.
              </p>
              <p>
                The result is a single contractor a facility can rely on for
                the day-to-day care of its electrical assets — and for the
                construction work that extends them.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 border border-border bg-card px-5 py-4">
                <CalendarCheckIcon className="size-5 shrink-0 text-brand-bright" aria-hidden="true" />
                <div>
                  <p className="text-[0.8125rem] font-bold text-foreground">Operating since</p>
                  <p className="text-[0.75rem] text-muted-foreground">{site.established}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border border-border bg-card px-5 py-4">
                <MapPinIcon className="size-5 shrink-0 text-brand-bright" aria-hidden="true" />
                <div>
                  <p className="text-[0.8125rem] font-bold text-foreground">Based in</p>
                  <p className="text-[0.75rem] text-muted-foreground">{site.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company history (from OWNER-supplied company profile deck) */}
      <section aria-labelledby="history-heading" className="border-b border-border bg-canvas-raised">
        <div className="wrap py-20 md:py-24">
          <SectionHeading
            kicker="Company history"
            title="From 1987 to Bestcor Phils., Inc."
            intro="Milestones as published in Bestcor's own company profile presentation."
          />
          <ol className="mx-auto grid max-w-5xl gap-px border border-border bg-border/60 md:grid-cols-3">
            {companyHistory.map((m) => (
              <li key={m.year} className="bg-card p-8">
                <p className="display text-[2rem] leading-none text-brand-bright">{m.year}</p>
                <h3 className="display mt-5 text-[1.15rem] text-foreground">{m.title}</h3>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-muted-foreground">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mission / Vision */}
      <section aria-labelledby="mission-vision" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            kicker="Purpose & direction"
            title="Mission & vision"
            align="center"
          />
          <div className="mx-auto grid max-w-5xl gap-px border border-border bg-border/60 md:grid-cols-2">
            <article className="bg-canvas-raised p-8 md:p-10">
              <TargetIcon className="size-7 text-brand-bright" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="display mt-5 text-[1.3rem] text-foreground">Our mission</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {site.mission}
              </p>
            </article>
            <article className="bg-canvas-raised p-8 md:p-10">
              <EyeIcon className="size-7 text-brand-bright" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="display mt-5 text-[1.3rem] text-foreground">Our vision</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {site.vision}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="border-b border-border bg-background">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            kicker="What guides us"
            title="The values behind the work"
            intro="Four principles carry through every quotation, every mobilization and every job close-out."
          />
          <div className="grid gap-px border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <article key={p.id} className="group bg-card p-8 transition-colors duration-300 hover:bg-canvas-raised">
                <span className="font-mono text-[0.6875rem] tracking-[0.24em] text-signal-bright">
                  0{i + 1}
                </span>
                <h3 className="display mt-4 text-[1.35rem] text-foreground transition-colors group-hover:text-brand-bright">
                  {p.title}
                </h3>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Safety cross-link */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, #0a1f15, #071410 55%, #040a08)" }}
        />
        <div className="wrap relative grid items-center gap-8 py-16 md:grid-cols-[1.5fr_auto] md:py-20">
          <Reveal>
            <h2 className="display text-[1.7rem] text-white sm:text-[2.2rem]">
              How we keep work safe — and quality consistent
            </h2>
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-white/70">
              Safety-conscious practices, quality workmanship and technical
              discipline are not slogans here — they are how each job is
              planned and executed.
            </p>
          </Reveal>
          <Link
            href="/safety-quality"
            className="btn btn--green justify-self-start md:justify-self-end"
          >
            Read our approach <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Email/CTA strip */}
      <section className="border-b border-border bg-background">
        <div className="wrap flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center md:py-20">
          <div>
            <p className="eyebrow">Work with Bestcor</p>
            <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-muted-foreground">
              Have an electrical, electromechanical or civil scope in mind?
              Send the details — our team will review and come back with next
              steps.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <Link href="/contact" className="btn btn--red">
              Request a Quotation <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-muted-foreground transition hover:text-foreground"
            >
              <MailIcon className="size-4 text-brand-bright" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's talk about your scope."
        lead="Tell us about the work you need — Bestcor will follow up to discuss it with you."
      />
    </>
  );
}
