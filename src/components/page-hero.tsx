import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero band shared by About / Services / Our Work /
 * Safety & Quality / Contact / Gallery.
 */
export function PageHero({
  kicker,
  title,
  lead,
  children,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-canvas-deep",
        className,
      )}
    >
      {/* restrained engineering backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52rem 22rem at 78% -6rem, rgba(79,175,67,0.13), transparent 60%), radial-gradient(40rem 20rem at -10% 110%, rgba(208,33,26,0.07), transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(213,245,224,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(213,245,224,0.045) 1px, transparent 1px)",
          backgroundSize: "4.5rem 4.5rem",
          maskImage: "linear-gradient(to bottom, black, transparent 78%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 78%)",
        }}
      />
      <div className="wrap relative py-16 md:py-24 lg:py-28">
        {kicker ? (
          <p className="eyebrow mb-6 text-[0.6875rem]">{kicker}</p>
        ) : null}
        <h1 className="display max-w-4xl text-[2.6rem] text-foreground sm:text-[3.6rem] lg:text-[4.4rem]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground lg:text-[1.125rem]">
            {lead}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
