import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="border-b border-border bg-canvas-deep">
      <div className="wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="font-mono text-[0.8125rem] tracking-[0.24em] text-signal-bright">404 / Not found</p>
        <h1 className="display mt-5 text-[2.8rem] text-foreground sm:text-[4rem]">
          This page does not exist.
        </h1>
        <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-muted-foreground">
          The address may be mistyped, or the page may have moved. Head back to
          the homepage or browse Bestcor&apos;s services.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/" className="btn btn--red">
            Back to home
          </Link>
          <Link href="/services" className="btn btn--ghost">
            Browse services <ArrowRightIcon className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
