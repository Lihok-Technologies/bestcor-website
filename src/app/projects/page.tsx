import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ImagesIcon, MapPinIcon } from "lucide-react";
import { gallery } from "@/lib/images";
import {
  caseStudies,
  featuredProjectSlugs,
  ongoingWorks,
  projectCategory,
  type CaseStudy,
} from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { ImageReveal, Reveal } from "@/components/reveal";
import { ProjectRegister } from "@/components/projects-register";

export const metadata: Metadata = buildMetadata({
  title: "Our Work",
  description:
    "Bestcor Phils., Inc. completed works — verified civil, pole-line, water-infrastructure and service-entrance projects, plus real field photography from the company's own profile and operations.",
  path: "/projects",
});

/**
 * Capability labels Bestcor applies to its own work. The imagery on this
 * page is shown under these capability labels only; per-photo job claims
 * are never made because the source does not associate them.
 */
const capabilityLabels = [
  "Electrical maintenance",
  "Testing & diagnostics",
  "Distribution equipment",
  "Field installation",
  "Utility & pole-line works",
  "Tree trimming / line clearance",
  "Mechanical services",
] as const;

const featured = featuredProjectSlugs
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c): c is CaseStudy => Boolean(c));

/** Photographs referenced by export index (0-based into `gallery`). */
const selected = [0, 9, 10, 12, 15, 17, 20, 21, 24, 27, 28, 29, 30, 31];
const shown = selected.map((i) => gallery[i]);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Our work"
        title={
          <>
            Real work. <span className="text-brand-bright">Real experience.</span>
          </>
        }
        lead="Completed works and field photographs from Bestcor's own company profile and operations. Every project entry states exactly what the profile states — nothing more."
      />

      {/* =================== FEATURED / SELECTED PROJECTS =================== */}
      <section aria-labelledby="featured-projects" className="border-b border-border bg-background">
        <div className="wrap py-16 md:py-20">
          <Reveal className="mb-8 max-w-3xl">
            <p className="eyebrow">Selected experience</p>
            <h2 id="featured-projects" className="display mt-4 text-[1.9rem] text-foreground sm:text-[2.4rem]">
              Representative completed works
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
              A cross-section of the verified register — utility foundations,
              water infrastructure, pump-station work, demolition and service
              entrances.
            </p>
          </Reveal>
          <ul className="grid gap-px border border-border bg-border/60 md:grid-cols-2">
            {featured.map((c, i) => (
              <li key={c.slug} className="group bg-card p-6 transition-colors duration-300 hover:bg-canvas-raised md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-signal-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.625rem] font-bold tracking-[0.16em] text-brand-bright uppercase">
                    {projectCategory(c)}
                  </span>
                </div>
                <h3 className="display mt-4 text-[1.25rem] leading-tight text-foreground lg:text-[1.4rem]">
                  {c.title}
                </h3>
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.875rem] text-muted-foreground">
                  {c.client ? <span>{c.client}</span> : null}
                  {c.location ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPinIcon className="size-3.5" aria-hidden="true" /> {c.location}
                    </span>
                  ) : null}
                  {c.year ? <span>{c.year}</span> : null}
                </p>
                <p className="mt-3 border-l-2 border-brand pl-4 text-[0.875rem] leading-relaxed text-foreground/75">
                  {c.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================== COMPLETE VERIFIED REGISTER ================== */}
      <section aria-labelledby="register-heading" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-12">
            <div>
              <p className="eyebrow">Completed projects register</p>
              <h2 id="register-heading" className="display mt-4 text-[1.9rem] text-foreground sm:text-[2.4rem]">
                The full civil-works register
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Client, location and year details are reproduced from
                Bestcor&apos;s own company profile presentation, and scope
                lines stay as published there. Filter by category or scan the
                register.
              </p>
              <Link href="/contact" className="btn btn--ghost mt-7">
                Discuss a project with Bestcor <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <ProjectRegister rows={caseStudies} />
          </div>

          <Reveal className="mt-10 grid gap-6 border border-border bg-card p-6 md:grid-cols-[0.7fr_1.3fr] md:gap-10 md:p-8">
            <p className="display text-[1.1rem] leading-snug text-foreground">
              Ongoing electrical civil works since 2009
            </p>
            <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {ongoingWorks.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-muted-foreground">
                  <span className="mt-[0.55em] block size-1.5 shrink-0 bg-brand-bright" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===================== CAPABILITY INDEX ===================== */}
      <section aria-label="Capability index" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-10 md:py-12">
          <Reveal>
            <p className="text-[0.6875rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
              Capability index — the kinds of work Bestcor performs
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {capabilityLabels.map((label, i) => (
                <li key={label} className="inline-flex items-center gap-2.5 border border-border bg-card px-4 py-2.5">
                  <span className="font-mono text-[0.6875rem] text-signal-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.8125rem] font-semibold text-foreground/90">{label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-[0.875rem] leading-relaxed text-muted-foreground">
              Photographs are shown without per-job titles, client names or
              locations — the source does not associate individual photographs
              with individual projects.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ====================== FIELD PHOTOGRAPHY ====================== */}
      <section aria-label="Field photographs" className="border-b border-border bg-background">
        <div className="wrap py-16 md:py-20">
          {shown.length > 0 ? (
            <ImageReveal>
              <figure className="photo-tile group">
                <Image
                  src={shown[0].src}
                  alt={shown[0].alt}
                  width={shown[0].width}
                  height={shown[0].height}
                  sizes="100vw"
                  className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
                  priority
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent px-5 pt-14 pb-4">
                  <span className="text-[0.75rem] font-bold tracking-[0.18em] text-white uppercase">
                    {shown[0].chip}
                  </span>
                  <span className="font-mono text-[0.6875rem] text-white/60">
                    {shown[0].source.replace("fb_", "#")}
                  </span>
                </figcaption>
              </figure>
            </ImageReveal>
          ) : null}

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-4 lg:grid-cols-4 lg:gap-4">
            {shown.slice(1).map((asset, i) => (
              <ImageReveal key={`${asset.source}-${i}`} delay={(i % 4) * 0.05}>
                <figure className="photo-tile group aspect-square">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="size-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent px-4 pt-10 pb-3">
                    <span className="text-[0.625rem] font-bold tracking-[0.16em] text-white/90 uppercase">
                      {asset.chip}
                    </span>
                    <span className="font-mono text-[0.625rem] text-white/60">
                      {asset.source.replace("fb_", "#")}
                    </span>
                  </figcaption>
                </figure>
              </ImageReveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="max-w-md text-[0.875rem] leading-relaxed text-muted-foreground">
              Want to see more? The gallery holds the full set of real Bestcor
              photographs used across this site.
            </p>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border border-border px-6 py-3.5 text-[0.8125rem] font-bold tracking-[0.1em] text-foreground uppercase transition hover:border-brand/60 hover:text-brand-bright"
            >
              <ImagesIcon className="size-4" aria-hidden="true" /> Open the gallery
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Have work that needs doing?"
        lead="Send the scope and schedule — Bestcor will come back with a clear path forward."
      />
    </>
  );
}
