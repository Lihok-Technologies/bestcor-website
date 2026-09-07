import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { services, type Service } from "@/lib/services";
import { curated, type ImageAsset } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, ImageReveal } from "@/components/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Bestcor Phils., Inc. services — preventive maintenance, on-site repairs, supply/installation/construction, electrical testing & diagnostics, distribution components and transmission & pole-line works.",
  path: "/services",
});

function ServiceRow({
  service,
  asset,
  index,
  flip,
}: {
  service: Service;
  asset: ImageAsset;
  index: number;
  flip: boolean;
}) {
  return (
    <article className="grid items-center gap-10 border-b border-border py-16 first:border-t lg:grid-cols-2 lg:gap-16 md:py-20">
      <ImageReveal className={flip ? "lg:order-2" : ""}>
        <figure className="group tick-panel">
          <div className="photo-tile aspect-[4/3] border-0">
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between text-[0.6875rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            <span>{asset.chip}</span>
            <span className="font-mono text-signal-bright">{String(index + 1).padStart(2, "0")} / 06</span>
          </figcaption>
        </figure>
      </ImageReveal>

      <div className={flip ? "lg:order-1" : ""}>
        <p className="eyebrow">Service {String(index + 1).padStart(2, "0")}</p>
        <h2 className="display mt-4 text-[1.9rem] text-foreground sm:text-[2.4rem] lg:text-[2.8rem]">
          {service.title}
        </h2>
        <p className="mt-5 text-[0.975rem] leading-relaxed text-muted-foreground">
          {service.detailLead} {service.detailBody}
        </p>
        <p className="mt-6 text-[0.75rem] font-bold tracking-[0.18em] text-foreground uppercase">
          What this covers
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {service.scope.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 border border-border bg-card px-3 py-2 text-[0.8125rem] text-foreground/90"
            >
              <CheckIcon className="size-3.5 text-brand-bright" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link href={`/services/${service.slug}`} className="btn btn--ghost">
            Service details <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold tracking-[0.08em] text-signal-bright uppercase transition hover:text-signal"
          >
            Request a quotation
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Our services"
        title={
          <>
            Services built around <span className="text-brand-bright">reliability</span>
          </>
        }
        lead="Bestcor delivers preventive maintenance, on-site repairs, testing and diagnostics, and electrical construction scope for equipment and facilities that depend on dependable power."
      />

      <section aria-label="Service list" className="bg-background">
        <div className="wrap py-6 md:py-10">
          {services.map((service, i) => (
            <ServiceRow
              key={service.slug}
              service={service}
              asset={curated[service.image]}
              index={i}
              flip={i % 2 === 1}
            />
          ))}
          <Reveal className="py-16 text-center md:py-20">
            <p className="eyebrow eyebrow--center justify-center">Scope not listed?</p>
            <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-muted-foreground">
              If your requirement sits outside the six service lines above,
              describe it in a quotation request — Bestcor will confirm
              whether it is within our capability.
            </p>
            <Link href="/contact" className="btn btn--red mt-8">
              Request a Quotation <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
