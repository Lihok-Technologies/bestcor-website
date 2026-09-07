import type { Metadata } from "next";
import Image from "next/image";
import { gallery } from "@/lib/images";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { ImageReveal } from "@/components/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "The full set of real Bestcor Phils., Inc. photographs — field operations captured on the company's own page.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        kicker="Gallery"
        title={
          <>
            Field photographs, <span className="text-brand-bright">as they happened</span>
          </>
        }
        lead={`All ${gallery.length} real photographs exported from ${site.legalName}'s own Facebook page, presented without invented captions.`}
      />

      <section aria-label="Photograph gallery" className="border-b border-border bg-background">
        <div className="wrap py-16 md:py-20">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-6">
            {gallery.map((asset, i) => (
              <ImageReveal key={`${asset.source}-${i}`} delay={(i % 6) * 0.04}>
                <figure className="photo-tile group aspect-square">
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="size-full object-cover"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent px-3 pt-8 pb-2">
                    <span className="text-[0.5625rem] font-bold tracking-[0.14em] text-white/85 uppercase">
                      {asset.chip}
                    </span>
                    <span className="font-mono text-[0.5625rem] text-white/55">
                      {asset.source.replace("fb_", "#")}
                    </span>
                  </figcaption>
                </figure>
              </ImageReveal>
            ))}
          </div>
          <p className="mt-8 text-[0.8125rem] leading-relaxed text-muted-foreground">
            Source: Bestcor&apos;s public Facebook page. Photography is used
            without claims about clients, project titles, locations or
            timelines — those await Bestcor confirmation.
          </p>
        </div>
      </section>

      <CtaBand
        title="See work like this on your site?"
        lead="If the kind of work in these photographs matches what you need, start with a quotation request."
      />
    </>
  );
}
