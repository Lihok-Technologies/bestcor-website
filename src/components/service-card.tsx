import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import type { Service } from "@/lib/services";
import type { ImageAsset } from "@/lib/images";
import { Reveal } from "@/components/reveal";

export function ServiceCard({
  service,
  asset,
  index,
}: {
  service: Service;
  asset: ImageAsset;
  index: number;
}) {
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col border border-border bg-card transition-colors duration-300 hover:border-brand/50"
      >
        <div className="photo-tile aspect-square border-0 border-b border-border/70">
          <Image
            src={asset.src}
            alt={asset.alt}
            width={asset.width}
            height={asset.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="size-full object-cover"
            loading="lazy"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"
          />
          <span className="absolute top-3 left-3 border border-white/15 bg-black/45 px-2 py-1 font-mono text-[0.625rem] tracking-[0.2em] text-white/85 uppercase backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 lg:p-6">
          <h3 className="display text-[1.15rem] leading-tight text-foreground transition-colors group-hover:text-brand-bright lg:text-[1.25rem]">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 text-[0.85rem] leading-relaxed text-muted-foreground">
            {service.summary}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-bold tracking-[0.1em] text-signal-bright uppercase">
            View service
            <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
