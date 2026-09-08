import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Canonical Bestcor logo — the exact OWNER-supplied SVG
 * (public/brand/bestcor-logo.svg, 576×432 viewBox).
 * Artwork is never recolored, cropped or distorted; aspect is preserved.
 * Height is controlled with responsive Tailwind height classes so the logo
 * can scale per breakpoint; width always follows the aspect ratio.
 */
const LOGO_SRC = "/brand/bestcor-logo.svg";
const LOGO_W = 576;
const LOGO_H = 432;

export function LogoMark({
  heightClass = "h-14",
  className,
  decorative = false,
}: {
  /** Responsive height utility, e.g. "h-16 lg:h-20" (width auto). */
  heightClass?: string;
  className?: string;
  /** Mark the image decorative when adjacent visible text already names the link. */
  decorative?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt={decorative ? "" : "Bestcor Phils., Inc. logo"}
      aria-hidden={decorative || undefined}
      width={LOGO_W}
      height={LOGO_H}
      className={cn(heightClass, "w-auto shrink-0", className)}
      style={{ width: "auto" }}
    />
  );
}

export function LogoLockup({
  className,
  compact = false,
}: {
  className?: string;
  /** Hide the wordmark on very small screens */
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark heightClass={compact ? "h-11" : "h-12"} />
      <span
        className={cn(
          "hidden min-w-0 flex-col leading-none sm:flex",
          compact && "sm:hidden lg:flex",
        )}
      >
        <span className="display text-[1.05rem] font-semibold tracking-[0.04em] text-foreground sm:text-[1.125rem]">
          Bestcor <span className="text-brand-bright">Phils., Inc.</span>
        </span>
        <span className="mt-1.5 text-[0.5625rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
          Civil · Electromechanical Contractor
        </span>
      </span>
    </span>
  );
}

export function WordmarkOnly({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="text-[0.8125rem] font-bold tracking-[0.14em] text-foreground uppercase">
        {site.legalName}
      </span>
      <span className="mt-1 text-[0.5625rem] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
        Civil · Electromechanical Contractor
      </span>
    </span>
  );
}

/**
 * Header brand lockup: logo scales responsively —
 * mobile ≈ 60px visual height, desktop ≈ 72px (bigger and more prominent).
 */
export function BrandLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 rounded-sm", className)}
    >
      <LogoMark heightClass="h-[60px] lg:h-[72px]" decorative />
      <WordmarkOnly className="hidden min-[420px]:flex" />
    </Link>
  );
}
