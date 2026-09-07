import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Exact owner-supplied Bestcor logo (optimized 512px derivative of the
 * original source-assets/bestcor-logo.png) next to the legal name + line.
 */
export function LogoMark({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/bestcor-logo.png"
      alt="Bestcor Phils., Inc. logo"
      width={size * 2}
      height={size * 2}
      className={cn("h-auto w-auto shrink-0", className)}
      style={{ width: size, height: size }}
      priority
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
      <LogoMark size={compact ? 52 : 56} />
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
      aria-label={`${site.legalName} — home`}
      className={cn("flex items-center gap-3 rounded-sm", className)}
    >
      <LogoMark size={52} />
      <WordmarkOnly className="hidden min-[420px]:flex" />
    </Link>
  );
}
