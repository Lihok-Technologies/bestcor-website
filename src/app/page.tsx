import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ZapIcon,
  CogIcon,
  HardHatIcon,
  WrenchIcon,
  ActivityIcon,
  PlugZapIcon,
  ArrowRightIcon,
  MapPinIcon,
  CalendarCheckIcon,
} from "lucide-react";
import { site, companyHistory, capabilityStrip } from "@/lib/site";
import { services } from "@/lib/services";
import { curated } from "@/lib/images";
import { caseStudies, featuredProjectSlugs, projectCategory, type CaseStudy } from "@/lib/projects";
import { ServiceCard } from "@/components/service-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Reveal, ImageReveal } from "@/components/reveal";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Icons for the six capability families (order matches site.capabilityStrip). */
const capabilityIcons = [
  ZapIcon, // Electrical Services
  CogIcon, // Electromechanical Works
  WrenchIcon, // Mechanical Services
  HardHatIcon, // Civil Works
  ActivityIcon, // Testing & Maintenance
  PlugZapIcon, // Pole-Line & Distribution Works
] as const;

const workTiles = [
  curated["work-grid-1"],
  curated["work-grid-2"],
  curated["work-grid-3"],
  curated["work-grid-4"],
];

const homepageHero = curated["hero-home"];

const selectedWorks = featuredProjectSlugs
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c): c is CaseStudy => Boolean(c));

function OrganizationSchema() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: SITE_URL,
    email: site.email,
    slogan: site.tagline,
    description:
      "Civil–electromechanical contractor operating since November 2005 — electrical, mechanical, electromechanical and civil services for utility, industrial and infrastructure applications.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8985 Emerald St., Pecsonville Subdivision, Brgy. Tungkong Mangga",
      addressLocality: "City of San Jose del Monte",
      addressRegion: "Bulacan",
      postalCode: "3023",
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
  return (
    <>
      <OrganizationSchema />

      {/* ============================= HERO ============================= */}
      <section aria-label="Introduction" className="relative overflow-hidden">
        <Image
          src={homepageHero.src}
          alt=""
          width={homepageHero.width}
          height={homepageHero.height}
          priority
          sizes="100vw"
          className="absolute inset-0 size-full object-cover"
        />
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
            <p className="eyebrow !text-brand-bright/90">
              Bestcor Phils., Inc. · San Jose del Monte, Bulacan · Operating since November 2005
            </p>
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
              A civil–electromechanical contractor: electrical, mechanical,
              electromechanical and civil services for utility, industrial and
              infrastructure applications — preventive maintenance, field
              repairs, testing and diagnostics, and distribution and pole-line
              construction.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn btn--red text-[0.9375rem]">
                Discuss Your Project
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/projects"
                className="btn btn--ghost !border-white/45 text-[0.9375rem] text-white"
              >
                See Completed Works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CAPABILITY FAMILIES ===================== */}
      <section aria-label="Capabilities" className="border-b border-border bg-canvas-raised">
        <ul className="grid grid-cols-2 gap-px overflow-hidden border-x border-border bg-border/70 sm:grid-cols-3 lg:grid-cols-6">
          {capabilityStrip.map((c, i) => {
            const Icon = capabilityIcons[i] ?? ZapIcon;
            return (
              <li
                key={c.title}
                className="flex min-h-28 flex-col justify-center gap-2.5 bg-canvas-raised px-5 py-6 lg:min-h-32"
              >
                <Icon className="size-6 text-brand" strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <span className="display block text-[0.875rem] leading-tight text-foreground lg:text-[0.9375rem]">
                    {c.title}
                  </span>
                  <span className="mt-1.5 block text-[0.6875rem] leading-snug text-muted-foreground">
                    {c.note}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ==================== EXPERIENCE / HISTORY SIGNAL ==================== */}
      <section aria-label="Company history at a glance" className="border-b border-border bg-background">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[0.85fr_1.15fr] md:py-20 lg:gap-16">
          <div>
            <p className="eyebrow">Established experience</p>
            <h2 className="display mt-4 text-[2rem] text-foreground sm:text-[2.5rem]">
              An electrical lineage since 1987 — one contracting standard
            </h2>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              Bestcor&apos;s company profile traces its roots to 1987 — from
              RCTC&apos;s electrical-contracting start, through the formation
              of BESTCOR in 2002, to Bestcor Phils., Inc. today.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 border border-border px-6 py-3.5 text-[0.8125rem] font-bold tracking-[0.1em] text-foreground uppercase transition hover:border-brand/60 hover:text-brand-bright"
            >
              Read the history <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ol className="grid gap-px border border-border bg-border/60 sm:grid-cols-3">
            {companyHistory.map((m) => (
              <li key={m.year} className="bg-card p-6 lg:p-7">
                <p className="display text-[1.9rem] leading-none text-brand-bright">{m.year}</p>
                <h3 className="mt-4 text-[0.9375rem] font-bold leading-snug text-foreground">
                  {m.title}
                </h3>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ==================== SELECTED COMPLETED WORKS ==================== */}
      <section aria-labelledby="selected-works-heading" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-20 md:py-24">
          <SectionHeading
            id="selected-works-heading"
            kicker="Selected completed works"
            title="Documented experience — not decoration"
            intro="A representative slice of the completed works in Bestcor's own company profile. Each entry states only what the profile states."
          />
          <ul className="grid gap-px border border-border bg-border/60 lg:grid-cols-2">
            {selectedWorks.map((c, i) => (
              <li
                key={c.slug}
                className="group bg-card p-6 transition-colors duration-300 hover:bg-canvas-raised md:p-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-signal-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.625rem] font-bold tracking-[0.16em] text-brand-bright uppercase">
                    {projectCategory(c)}
                  </span>
                </div>
                <h3 className="display mt-4 text-[1.2rem] leading-tight text-foreground lg:text-[1.3rem]">
                  {c.title}
                </h3>
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.8125rem] text-muted-foreground">
                  {c.client ? <span>{c.client}</span> : null}
                  {c.location ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon className="size-3.5" aria-hidden="true" /> {c.location}
                    </span>
                  ) : null}
                  {c.year ? <span>{c.year}</span> : null}
                </p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-foreground/75">{c.summary}</p>
              </li>
            ))}
          </ul>
          <Reveal className="mt-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="max-w-lg text-[0.875rem] leading-relaxed text-muted-foreground">
              The full completed civil-works register and the field photography
              live on the Our Work page.
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

      {/* ============================ SERVICES =========================== */}
      <section aria-labelledby="services-heading" className="border-b border-border bg-background">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            id="services-heading"
            kicker="Our services"
            title="Civil, electrical, electromechanical & mechanical services"
            intro="Seven service lines, delivered with the same field discipline — from scheduled preventive maintenance to distribution and pole-line construction."
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

      {/* ========================= FIELD PHOTOGRAPHY ========================= */}
      <section aria-label="Field photography" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-14 md:py-16">
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
                Bestcor Phils., Inc. delivers electrical, electromechanical,
                mechanical and civil work for facilities that depend on
                reliable power — from preventive maintenance and on-site
                repairs to testing, diagnostics and distribution construction.
              </p>
              <p>
                The company has operated from San Jose del Monte, Bulacan
                since November 2005, tracing its electrical-contracting roots
                to RCTC in 1987. Work is executed with the same standard on
                every engagement: planned properly, performed safely, and
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
            <div className="absolute -bottom-5 -left-5 hidden border border-border bg-card px-6 py-5 shadow-2xl sm:block lg:-left-8">
              <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                <CalendarCheckIcon className="size-4 text-brand-bright" aria-hidden="true" />
                Operating since November 2005
              </p>
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
          style={{ background: "linear-gradient(120deg, #0a1f15 0%, #071410 45%, #040a08 100%)" }}
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
            <Link href="/safety-quality" className="btn btn--green justify-self-start lg:justify-self-end">
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
      <CtaBand
        title="Let's discuss your next project."
        lead="Maintenance, repairs, testing, or construction and installation scope — send the details and Bestcor will follow up with a clear path forward."
      />
    </>
  );
}
