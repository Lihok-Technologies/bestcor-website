import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ImagesIcon } from "lucide-react";
import { gallery } from "@/lib/images";
import { caseStudies, ongoingWorks } from "@/lib/projects";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { ImageReveal, Reveal } from "@/components/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Our Work",
  description:
    "Real photographs from Bestcor Phils., Inc. field operations — maintenance, testing and diagnostics, distribution equipment, field installation and pole-line works.",
  path: "/projects",
});

/**
 * Capability labels Bestcor applies to its own work. Photographs are shown
 * under these only where the imagery is consistent with the label; per-job
 * claims (client, location, value, dates) await Bestcor confirmation.
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

/**
 * Selected photographs, referenced by export index (0-based into `gallery`).
 * Swapping an entry only changes the tile shown — no component change needed.
 * Future verified case studies plug into /src/lib/projects.ts (see README).
 */
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
        lead="A photography-led look at Bestcor's field activity — real crews, real equipment, real discipline, straight from the company's own page."
      />

      <section aria-label="Capability labels" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-10 md:py-12">
          <Reveal>
            <p className="text-[0.6875rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">
              Capability index — where the imagery supports it
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {capabilityLabels.map((label, i) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2.5 border border-border bg-card px-4 py-2.5"
                >
                  <span className="font-mono text-[0.6875rem] text-signal-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.8125rem] font-semibold text-foreground/90">{label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-[0.875rem] leading-relaxed text-muted-foreground">
              These are the kinds of work Bestcor performs. Photographs on this
              page are shown without job titles, client names or locations
              until Bestcor confirms what may be published — the work is real,
              and the details will follow with authorization.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Photographs" className="border-b border-border bg-background">
        <div className="wrap py-16 md:py-20">
          {/* Featured wide photograph anchors the wall */}
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

      {/* Completed projects — from Bestcor's OWNER-supplied company profile */}
      <section aria-labelledby="case-studies" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-16 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:gap-12">
            <div>
              <p className="eyebrow">Completed projects</p>
              <h2 id="case-studies" className="display mt-4 text-[1.9rem] text-foreground sm:text-[2.4rem]">
                A record of real work
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Client, location and year details below are reproduced from
                Bestcor&apos;s own company profile presentation. Scope lines
                stay as published there — no project is embellished.
              </p>
              <Link href="/contact" className="btn btn--ghost mt-7">
                Discuss a project with Bestcor <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="overflow-x-auto border border-border bg-canvas-raised">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <caption className="sr-only">Completed projects listed in Bestcor&apos;s company profile</caption>
                <thead>
                  <tr className="border-b border-border text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <th scope="col" className="px-5 py-4 font-bold">Project</th>
                    <th scope="col" className="px-5 py-4 font-bold">Client</th>
                    <th scope="col" className="px-5 py-4 font-bold">Location</th>
                    <th scope="col" className="px-5 py-4 font-bold">Year</th>
                    <th scope="col" className="px-5 py-4 font-bold">Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudies.map((cs) => (
                    <tr key={cs.slug} className="border-b border-border/70 align-top last:border-0 hover:bg-white/[0.03]">
                      <td className="px-5 py-4 text-[0.875rem] font-semibold text-foreground">{cs.title}</td>
                      <td className="px-5 py-4 text-[0.875rem] text-foreground/90">{cs.client ?? "—"}</td>
                      <td className="px-5 py-4 text-[0.875rem] text-muted-foreground">{cs.location ?? "—"}</td>
                      <td className="px-5 py-4 text-[0.875rem] whitespace-nowrap text-muted-foreground">{cs.year ?? "—"}</td>
                      <td className="px-5 py-4 text-[0.8125rem] leading-relaxed text-muted-foreground">{cs.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

      <CtaBand
        title="Have work that needs doing?"
        lead="Send the scope and schedule — Bestcor will come back with a clear path forward."
      />
    </>
  );
}
