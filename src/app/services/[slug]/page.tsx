import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ClipboardListIcon,
} from "lucide-react";
import { services, getService } from "@/lib/services";
import { curated } from "@/lib/images";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: `${service.summary} Bestcor Phils., Inc. — ${siteDescriptor()}.`,
    path: `/services/${service.slug}`,
  });
}

function siteDescriptor() {
  return "civil–electromechanical contractor, San Jose del Monte, Bulacan";
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const asset = curated[service.image];
  const index = services.findIndex((s) => s.slug === service.slug);

  return (
    <>
      <PageHero
        kicker={`Service ${String(index + 1).padStart(2, "0")} / 06`}
        title={service.title}
        lead={service.intro}
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.1em] text-muted-foreground uppercase transition hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" /> All services
        </Link>
      </PageHero>

      <section className="border-b border-border bg-background">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 md:py-24">
          <div>
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="aspect-[4/3] w-full border border-border object-cover"
              priority
            />
            <p className="mt-3 text-[0.6875rem] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {asset.chip}
            </p>
            <h2 className="display mt-10 text-[1.8rem] text-foreground sm:text-[2.2rem]">
              How Bestcor approaches {service.title.toLowerCase()}
            </h2>
            <div className="mt-6 space-y-5 text-[0.975rem] leading-relaxed text-muted-foreground">
              <p>
                <span className="text-foreground">{service.detailLead}</span>{" "}
                {service.detailBody}
              </p>
              <p>
                Work is scoped clearly before it starts: what will be done,
                what the site conditions require, and what the deliverable
                will be. On the ground, crews follow safe work practices and
                quality checks as part of the job itself — not as an
                afterthought.
              </p>
              <p>
                Because every site is different, the right first step is a
                conversation about your equipment and schedule. Send a
                quotation request and Bestcor will come back with the
                questions that matter and a clear path forward.
              </p>
            </div>
          </div>

          <aside aria-label="Service scope" className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-card">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5">
                <ClipboardListIcon className="size-5 text-brand-bright" aria-hidden="true" />
                <h2 className="text-[0.8125rem] font-bold tracking-[0.16em] text-foreground uppercase">
                  What this service covers
                </h2>
              </div>
              <ul className="space-y-4 px-6 py-6">
                {service.scope.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-foreground/90">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-bright" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="border-t border-border p-6">
                <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                  Descriptions stay deliberately factual — exact site scope is
                  confirmed per project.
                </p>
                <Link href="/contact" className="btn btn--red mt-5 w-full">
                  Request a quotation for this service
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="mt-8 border-l-2 border-signal bg-canvas-raised p-6">
              <p className="text-[0.8125rem] font-bold tracking-[0.12em] text-foreground uppercase">
                Other services
              </p>
              <ul className="mt-3 space-y-2.5">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .slice(0, 4)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group inline-flex items-center gap-1.5 text-[0.875rem] text-muted-foreground transition hover:text-foreground"
                      >
                        {s.title}
                        <ArrowRightIcon className="size-3 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-1.5 text-[0.75rem] font-bold tracking-[0.1em] text-brand-bright uppercase transition hover:text-brand"
              >
                View all services
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, #0a1f15, #071410 60%, #040a08)" }}
        />
        <Reveal className="wrap relative py-16 text-center md:py-20">
          <h2 className="display mx-auto max-w-3xl text-[1.9rem] text-white sm:text-[2.5rem]">
            Need {service.title.toLowerCase()} at your facility?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/70">
            Send the scope — equipment, site and schedule — and Bestcor will
            respond with the next steps.
          </p>
          <Link
            href="/contact"
            className="btn btn--green mt-8"
          >
            Request a Quotation <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
