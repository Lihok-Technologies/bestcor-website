import type { Metadata } from "next";

/**
 * Central metadata helper. SITE_URL (set on Render) overrides the default;
 * pages pass unique title/description and an optional path.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://bestcor-website.onrender.com";

const DEFAULT_DESCRIPTION =
  "Bestcor Phils., Inc. — civil–electromechanical contractor in San Jose del Monte, Bulacan. Preventive maintenance, on-site repairs, testing & diagnostics, electrical installation and pole-line works since November 2005.";

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = "/images/og-home.jpg",
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  // Root layout owns the "… | Bestcor Phils., Inc." suffix via title.template,
  // so page-level title must be BARE; social metadata keeps the full string.
  const bareTitle = title ?? "Built on Integrity. Driven by Quality.";
  const socialTitle = `${bareTitle} | Bestcor Phils., Inc.`;
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  const image = `${SITE_URL}${ogImage}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: bareTitle,
    description: resolvedDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_PH",
      url: canonical,
      siteName: "Bestcor Phils., Inc.",
      title: socialTitle,
      description: resolvedDescription,
      images: [{ url: image, width: 1200, height: 630, alt: "Bestcor Phils., Inc." }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: resolvedDescription,
      images: [image],
    },
  };
}
