import type { Metadata } from "next";
import Image from "next/image";
import {
  HardHatIcon,
  ShieldCheckIcon,
  SearchCheckIcon,
  RulerIcon,
  WrenchIcon,
  ClipboardCheckIcon,
  FileCheck2Icon,
} from "lucide-react";
import { curated } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, ImageReveal } from "@/components/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Safety & Quality",
  description:
    "How Bestcor Phils., Inc. works — safe work practices, quality workmanship, technical discipline and reliable execution, without overstated claims.",
  path: "/safety-quality",
});

const safetyPractices = [
  {
    icon: ClipboardCheckIcon,
    title: "Planning before power",
    body: "Jobs are assessed before they start — scope, site conditions, hazards and the controls needed to work safely around energized equipment.",
  },
  {
    icon: HardHatIcon,
    title: "Protection as standard",
    body: "Crews work with the protective equipment and tools each task calls for. Working around electricity is never improvised.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Discipline over shortcuts",
    body: "Procedures are followed because they are the safe way, not the fast way. Shortcuts have no place on a Bestcor site.",
  },
  {
    icon: SearchCheckIcon,
    title: "Stop-work authority",
    body: "Any team member can stop work when a condition is unsafe. That is not a privilege — it is the rule.",
  },
];

const qualityPractices = [
  {
    icon: RulerIcon,
    title: "Careful workmanship",
    body: "Terminations, connections, foundations and finishes are done carefully the first time — quality is visible in the details.",
  },
  {
    icon: WrenchIcon,
    title: "Testing that matters",
    body: "Where the scope calls for it, work is verified through electrical testing and diagnostics before being handed back into service.",
  },
  {
    icon: FileCheck2Icon,
    title: "Specification compliance",
    body: "Materials and methods follow the agreed specification and the equipment manufacturer's guidance.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Accountable handover",
    body: "Completed work is reviewed before handover so the client knows exactly what was done and what condition the equipment is in.",
  },
];

export default function SafetyQualityPage() {
  return (
    <>
      <PageHero
        kicker="Safety & quality"
        title={
          <>
            Work done <span className="text-brand-bright">safely</span>, done{" "}
            <span className="text-signal-bright">right</span>
          </>
        }
        lead="Bestcor's reputation rests on how work is carried out. Two commitments shape every engagement: nobody gets hurt, and the work is done to a quality standard we will stand behind."
      />

      {/* Approach statement + real imagery */}
      <section className="border-b border-border bg-background">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 md:py-24">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 className="display mt-4 text-[2rem] text-foreground sm:text-[2.6rem]">
              Safety and quality are one system, not two checklists
            </h2>
            <div className="mt-6 space-y-5 text-[0.975rem] leading-relaxed text-muted-foreground">
              <p>
                On electrical and construction scope, a job done unsafely is a
                job done badly — and a job done badly is usually a job done
                unsafely. Bestcor treats them as one system: the same planning,
                discipline and attention to detail that protect people are what
                protect the quality of the work.
              </p>
              <p>
                This page describes how Bestcor works. It deliberately makes no
                claim to certifications, statistics or safety records that
                Bestcor has not published — those will be added only once the
                company confirms them.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <ImageReveal className="col-span-2">
              <figure className="photo-tile">
                <Image
                  src={curated["safety-personnel"].src}
                  alt={curated["safety-personnel"].alt}
                  width={curated["safety-personnel"].width}
                  height={curated["safety-personnel"].height}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pt-10 pb-3">
                  <span className="text-[0.6875rem] font-bold tracking-[0.18em] text-white/90 uppercase">
                    {curated["safety-personnel"].chip}
                  </span>
                </figcaption>
              </figure>
            </ImageReveal>
            <ImageReveal delay={0.1} className="hidden sm:block">
              <figure className="photo-tile">
                <Image
                  src={curated["safety-discipline"].src}
                  alt={curated["safety-discipline"].alt}
                  width={curated["safety-discipline"].width}
                  height={curated["safety-discipline"].height}
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </ImageReveal>
            <div className="flex flex-col items-start justify-center border border-border bg-card p-6">
              <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-brand-bright">Bestcor field standard</p>
              <p className="display mt-3 text-[1.25rem] leading-tight text-foreground">
                Planned. Protected. Checked. Handed over.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety practices */}
      <section aria-labelledby="safety-practices" className="border-b border-border bg-canvas-deep">
        <div className="wrap py-20 md:py-24">
          <SectionHeading
            kicker="Safe work practices"
            title="The safety side of every job"
            intro="Four habits that travel with Bestcor crews wherever the work takes them."
          />
          <ul className="grid gap-px border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {safetyPractices.map((p, i) => (
              <li key={p.title} className="bg-canvas-raised p-7 transition-colors duration-300 hover:bg-card">
                <p.icon className="size-6 text-brand-bright" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] text-signal-bright">
                  SAFE 0{i + 1}
                </p>
                <h3 className="display mt-2 text-[1.05rem] text-foreground">{p.title}</h3>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quality practices */}
      <section aria-labelledby="quality-practices" className="border-b border-border bg-background">
        <div className="wrap py-20 md:py-24">
          <SectionHeading
            kicker="Quality workmanship"
            title="The quality side of every job"
            intro="Quality is not inspected in at the end — it is built in as the work happens."
          />
          <ul className="grid gap-px border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {qualityPractices.map((p, i) => (
              <li key={p.title} className="bg-card p-7 transition-colors duration-300 hover:bg-canvas-raised">
                <p.icon className="size-6 text-signal-bright" strokeWidth={1.5} aria-hidden="true" />
                <p className="mt-4 font-mono text-[0.625rem] tracking-[0.2em] text-brand-bright">
                  QUAL 0{i + 1}
                </p>
                <h3 className="display mt-2 text-[1.05rem] text-foreground">{p.title}</h3>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reliability statement */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(115deg, #0a1f15, #071410 55%, #040a08)" }}
        />
        <Reveal className="wrap relative py-16 md:py-20">
          <p className="eyebrow !text-brand-bright">What this means for you</p>
          <p className="mt-5 max-w-4xl text-[1.3rem] leading-snug text-white sm:text-[1.7rem] lg:text-[2rem]">
            When Bestcor leaves a site, the work has been planned, protected,
            checked and handed over — so you can return to running your
            facility with confidence in the equipment we touched.
          </p>
        </Reveal>
      </section>

      <CtaBand
        title="Put disciplined execution to work for you."
        lead="Request a quotation and see how Bestcor plans the work — safely and to a quality standard."
      />
    </>
  );
}
