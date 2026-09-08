import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Canonical Bestcor logo — the exact OWNER-supplied SVG
 * (public/brand/bestcor-logo.svg, 576×432 viewBox).
 * Artwork is never recolored, cropped or distorted; aspect is preserved
 * and `size` controls the rendered HEIGHT (width follows the ratio).
 * Served as a plain <img> so the SVG passes through unmodified.
 */
const LOGO_SRC = "/brand/bestcor-logo.svg";
const LOGO_W = 576;
const LOGO_H = 432;

export function LogoMark({
  size = 52,
  className,
  decorative = false,
}: {
  /** Rendered height in px; width follows the SVG aspect ratio. */
  size?: number;
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
      className={cn("shrink-0", className)}
      style={{ height: size, width: "auto" }}
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
      <LogoMark size={compact ? 46 : 50} />
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

export function BrandLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 rounded-sm", className)}
    >
      <LogoMark size={48} decorative />
      <WordmarkOnly className="hidden min-[420px]:flex" />
    </Link>
  );
}
