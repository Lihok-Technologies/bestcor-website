import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ZapIcon,
  CogIcon,
  HardHatIcon,
  ShieldCheckIcon,
  CalendarClockIcon,
  ArrowRightIcon,
  MapPinIcon,
} from "lucide-react";
import { site, capabilityStrip } from "@/lib/site";
import { services } from "@/lib/services";
import { curated } from "@/lib/images";
import { ServiceCard } from "@/components/service-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Reveal, ImageReveal } from "@/components/reveal";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const stripIcons = [
  ZapIcon,
  CogIcon,
  HardHatIcon,
  ShieldCheckIcon,
  CalendarClockIcon,
] as const;

const workTiles = [
  curated["work-grid-1"],
  curated["work-grid-2"],
  curated["work-grid-3"],
  curated["work-grid-4"],
];

const homepageHero = curated["hero-home"];

function OrganizationSchema() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: SITE_URL,
    email: site.email,
    slogan: site.tagline,
    description:
      "Civil–electromechanical contractor operating since November 2005.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Jose del Monte",
      addressRegion: "Bulacan",
      addressCountry: "PH",
    },
    sameAs: [site.facebookUrl],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function HomePage() {
  const hero = homepageHero;
  return (
    <>
      <OrganizationSchema />

      {/* ============================= HERO ============================= */}
      <section aria-label="Introduction" className="relative overflow-hidden">
        <Image
          src={hero.src}
          alt=""
          width={hero.width}
          height={hero.height}
          priority
          sizes="100vw"
          className="absolute inset-0 size-full object-cover"
        />
        {/* legibility + brand treatment overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(78deg, rgba(5,9,7,0.97) 6%, rgba(5,9,7,0.82) 38%, rgba(5,9,7,0.34) 68%, rgba(5,9,7,0.18) 100%), linear-gradient(to top, rgba(4,7,6,0.92), rgba(4,7,6,0.1) 45%)",
          }}
        />
        <div className="wrap relative flex min-h-[86svh] flex-col justify-end pb-16 pt-40 md:min-h-[82svh] md:pb-20 lg:min-h-[86vh]">
          <Reveal>
            <p className="eyebrow !text-brand-bright/90">San Jose del Monte, Bulacan · Operating since November 2005</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display mt-7 text-[2.9rem] text-white sm:text-[4.4rem] lg:text-[6.2rem] xl:text-[6.9rem]">
              <span className="block">
                Built on <span className="text-brand-bright">integrity.</span>
              </span>
              <span className="block">
                Driven by <span className="text-signal-bright">quality.</span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-white/85 lg:text-[1.2rem]">
              {site.supportingPosition} A civil–electromechanical contractor
              delivering preventive maintenance, repairs, testing and
              electrical construction work — safely and on schedule.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn btn--red text-[0.9375rem]">
                Request a Quotation
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="btn btn--ghost !border-white/45 text-[0.9375rem] text-white"
              >
                Explore Our Services
              </Link>
            </div>
          </Reveal>
        </div>
        <p className="sr-only">
          {site.legalName} — {site.descriptor}.
        </p>
      </section>

      {/* ======================== CAPABILITY STRIP ======================= */}
      <section
        aria-label="Capabilities"
        className="border-b border-border bg-canvas-raised"
      >
        <ul className="grid grid-cols-2 gap-px overflow-hidden border-x border-border bg-border/70 md:grid-cols-3 lg:grid-cols-5">
          {capabilityStrip.map((c, i) => {
            const Icon = stripIcons[i];
            return (
              <li
                key={c.title}
                className="flex min-h-24 items-center gap-3.5 bg-canvas-raised px-5 py-5 sm:min-h-28 lg:px-6"
              >
                <Icon
                  className="size-6 shrink-0 text-brand"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span>
                  <span className="display block text-[0.9375rem] leading-tight text-foreground">
                    {c.title}
                  </span>
                  <span className="mt-1 hidden max-w-40 text-[0.6875rem] leading-snug text-muted-foreground md:block">
                    {c.note}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ============================ SERVICES =========================== */}
      <section aria-labelledby="services-heading" className="border-b border-border bg-background">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            id="services-heading"
            kicker="Our services"
            title="A complete range of electrical, electromechanical & civil works"
            intro="From preventive maintenance and on-site repairs to testing, diagnostics, distribution and pole-line construction — Bestcor delivers disciplined field execution."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                asset={curated[service.image]}
                index={i}
              />
            ))}
          </div>
          <Reveal className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/services" className="btn btn--ghost">
              View all services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold tracking-[0.08em] text-brand-bright uppercase transition hover:text-brand"
            >
              Need a scope you don&apos;t see listed? <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================ OUR WORK =========================== */}
      <section aria-labelledby="work-heading" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            id="work-heading"
            kicker="Our work"
            title="Real work. Real experience."
            intro="Photographs from Bestcor's own field activity — real crews, real equipment, real discipline. Client and project details are published only once Bestcor confirms them."
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {workTiles.map((asset, i) => (
              <ImageReveal key={asset.src} delay={i * 0.06}>
                <figure className="photo-tile group aspect-square">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="size-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pt-10 pb-3">
                    <span className="text-[0.6875rem] font-bold tracking-[0.18em] text-white/90 uppercase">
                      {asset.chip}
                    </span>
                  </figcaption>
                </figure>
              </ImageReveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-md text-[0.875rem] leading-relaxed text-muted-foreground">
              Maintenance, testing, distribution equipment, field installation
              and utility line work — captured as it happens.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border border-border px-6 py-3.5 text-[0.8125rem] font-bold tracking-[0.1em] text-foreground uppercase transition hover:border-brand/60 hover:text-brand-bright"
            >
              Explore our work <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================= ABOUT ============================= */}
      <section aria-labelledby="about-heading" className="border-b border-border bg-background">
        <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="about-heading"
              kicker="About Bestcor"
              title="A civil–electromechanical contractor, operating since November 2005"
              className="mb-8"
            />
            <div className="space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              <p>
                Bestcor Phils., Inc. delivers electrical, electromechanical
                and civil work for facilities that depend on reliable power —
                from preventive maintenance and on-site repairs to testing,
                diagnostics and distribution construction.
              </p>
              <p>
                The company has operated from San Jose del Monte, Bulacan
                since November 2005. Work is executed with the same standard
                on every engagement: planned properly, performed safely, and
                finished to a quality we are prepared to stand behind.
              </p>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {site.values.map((v) => (
                <li key={v.id} className="border-l-2 border-brand pl-3.5">
                  <span className="display block text-[0.9375rem] text-foreground">{v.title}</span>
                  <span className="mt-1 block text-[0.6875rem] leading-snug text-muted-foreground">
                    {v.blurb}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-9 inline-flex items-center gap-2 border border-border px-6 py-3.5 text-[0.8125rem] font-bold tracking-[0.1em] text-foreground uppercase transition hover:border-brand/60 hover:text-brand-bright"
            >
              Learn more about Bestcor <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative lg:pl-4">
            <ImageReveal>
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
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 hidden border border-border bg-card px-6 py-5 shadow-2xl sm:block lg:-left-8"
            >
              <p className="display text-[1.6rem] leading-none text-brand-bright">2005</p>
              <p className="mt-2 flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                <MapPinIcon className="size-3.5" /> San Jose del Monte, Bulacan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= SAFETY & QUALITY ======================= */}
      <section aria-labelledby="safety-heading" className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, #0a1f15 0%, #071410 45%, #040a08 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full opacity-60 blur-3xl"
          style={{ background: "rgba(79,175,67,0.16)" }}
        />
        <div className="wrap relative py-20 md:py-24">
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow !text-brand-bright">Safety & quality</p>
              <h2
                id="safety-heading"
                className="display mt-5 text-[2.1rem] text-white sm:text-[2.8rem] lg:text-[3.3rem]"
              >
                Safety-conscious execution. Quality you can depend on.
              </h2>
              <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-white/75">
                Every Bestcor engagement is carried out with safe work
                practices, careful workmanship and technical discipline — the
                standard that keeps equipment reliable and people safe.
              </p>
            </div>
            <Link
              href="/safety-quality"
              className="btn btn--green justify-self-start lg:justify-self-end"
            >
              How we work <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Safe work practices", "Protection and procedures come first — on every task, at every site."],
              ["Quality workmanship", "Careful, consistent execution from routine maintenance to construction."],
              ["Technical discipline", "Structured methods, precise testing and attention to specification."],
              ["Reliable execution", "Dependable crews and clear communication from start to finish."],
            ].map(([title, blurb], i) => (
              <li key={title} className="bg-[#081310]/95 p-7">
                <span className="block font-mono text-[0.6875rem] tracking-[0.2em] text-brand-bright">
                  0{i + 1}
                </span>
                <h3 className="display mt-3 text-[1.05rem] text-white">{title}</h3>
                <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-white/65">{blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <CtaBand />
    </>
  );
}
