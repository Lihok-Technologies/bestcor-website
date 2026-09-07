import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function CtaBand({
  title = "Let's build your next project.",
  lead = "Tell us about your electrical, electromechanical or civil scope. Bestcor will follow up to discuss how we can help — safely and on schedule.",
  ctaLabel = "Request a Quotation",
}: {
  title?: string;
  lead?: string;
  ctaLabel?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-border bg-canvas-deep">
      <div className="wrap relative py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(46rem 20rem at 85% 30%, rgba(208,33,26,0.12), transparent 60%), radial-gradient(36rem 16rem at 8% 100%, rgba(79,175,67,0.1), transparent 55%)",
          }}
        />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow--center justify-center">Start a conversation</p>
          <h2
            id="cta-heading"
            className="display mt-6 text-[2.4rem] text-foreground sm:text-[3.4rem] lg:text-[4rem]"
          >
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-relaxed text-muted-foreground">
            {lead}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn btn--red text-[0.9375rem]">
              {ctaLabel}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="text-[0.8125rem] font-bold tracking-[0.08em] text-muted-foreground uppercase transition hover:text-foreground"
            >
              View services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
