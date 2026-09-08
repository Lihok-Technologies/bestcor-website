/**
 * BESTCOR — curated image manifest.
 *
 * Every web asset traces back to a real photograph exported from Bestcor's
 * own Facebook page (source-assets/facebook-export/...). Processed,
 * optimized derivatives live in /public/images. Alt text stays at
 * capability level and never names clients, projects, locations beyond the
 * verified municipality, or numeric claims.
 *
 * NOTE on resolution: the exported Facebook set is 414×414 thumbnails
 * (plus one 1200×628 feature image). Derivatives are modestly upscaled for
 * retina displays; precise per-photo descriptions await Bestcor review.
 */

export type ImageAsset = {
  /** Public path under /images */
  src: string;
  /** Processed intrinsic size — prevents layout shift */
  width: number;
  height: number;
  /** Accessible description */
  alt: string;
  /** Loose content family used to label gallery/work tiles conservatively */
  family:
    | "electrical"
    | "mechanical"
    | "civil"
    | "crew"
    | "equipment"
    | "worksite"
    | "utility";
  /** Source photograph in the preserved Facebook export */
  source: string;
  /** Shown under tiles in Our Work / Gallery */
  chip: string;
};

const R = (id: string, fb: string, family: ImageAsset["family"], chip: string, alt: string, w: number, h: number) =>
  ({ src: `/images/${id}.webp`, width: w, height: h, alt, family, chip, source: fb }) as ImageAsset;

/** Curated hero / feature / service assets used across pages */
export const curated: Record<string, ImageAsset> = {
  "hero-home": R(
    "hero-home", "fb_00001", "worksite", "Featured work",
    "Bestcor work-site photograph — the image Bestcor features on its own page.",
    1440, 754,
  ),
  "service-maintenance": R(
    "service-maintenance", "fb_00018", "electrical", "Electrical Maintenance",
    "Bestcor preventive maintenance work on electrical equipment.", 680, 680,
  ),
  "service-repairs": R(
    "service-repairs", "fb_00016", "worksite", "Field Repair",
    "Bestcor on-site repair work.", 680, 680,
  ),
  "service-construction": R(
    "service-construction", "fb_00013", "electrical", "Installation & Construction",
    "Bestcor installation work on electrical distribution facilities.", 680, 680,
  ),
  "service-testing": R(
    "service-testing", "fb_00028", "equipment", "Testing & Diagnostics",
    "Bestcor testing and diagnostic work.", 680, 680,
  ),
  "service-distribution": R(
    "service-distribution", "fb_00011", "electrical", "Distribution Equipment",
    "Bestcor work on electrical distribution equipment.", 680, 680,
  ),
  "service-poleline": R(
    "service-poleline", "fb_00029", "utility", "Pole-Line Works",
    "Bestcor transmission and pole-line construction work.", 680, 680,
  ),
  "about-crew": R(
    "about-crew", "fb_00022", "crew", "Field Crew",
    "Bestcor personnel at a work site.", 828, 828,
  ),
  "about-secondary": R(
    "about-secondary", "fb_00010", "crew", "Field Service",
    "Bestcor field service team.", 680, 680,
  ),
  "work-grid-1": R(
    "work-grid-1", "fb_00016", "worksite", "Field Repair",
    "Bestcor field work photograph.", 560, 560,
  ),
  "work-grid-2": R(
    "work-grid-2", "fb_00028", "equipment", "Testing & Diagnostics",
    "Bestcor testing and diagnostic work.", 560, 560,
  ),
  "work-grid-3": R(
    "work-grid-3", "fb_00011", "electrical", "Distribution Equipment",
    "Bestcor work on electrical distribution equipment.", 560, 560,
  ),
  "work-grid-4": R(
    "work-grid-4", "fb_00025", "worksite", "Electrical Works",
    "Bestcor electrical work photograph.", 560, 560,
  ),
  "service-mechanical": R(
    "service-mechanical", "presentation-s06", "mechanical", "Mechanical Services",
    "Bestcor mechanical services — pumps, motors and generator sets.", 680, 680,
  ),
  "safety-personnel": R(
    "safety-personnel", "fb_00021", "crew", "Field Personnel",
    "Bestcor field personnel at work.", 828, 828,
  ),
  "safety-discipline": R(
    "safety-discipline", "fb_00010", "crew", "Field Service",
    "Bestcor field service team.", 680, 680,
  ),
};

/** All 33 exported photographs, ordered as exported, for the Gallery page */
export const gallery: ImageAsset[] = [
  ["g-01", "fb_00001", "worksite", "Featured work", "Bestcor work-site photograph — the image Bestcor features on its own page.", 1440, 754],
  ["g-02", "fb_00002", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-03", "fb_00003", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-04", "fb_00004", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-05", "fb_00005", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-06", "fb_00006", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-07", "fb_00007", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-08", "fb_00008", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-09", "fb_00009", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-10", "fb_00010", "crew", "Field Service", "Bestcor field service team.", 640, 640],
  ["g-11", "fb_00011", "electrical", "Electrical Works", "Bestcor electrical work photograph.", 640, 640],
  ["g-12", "fb_00012", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-13", "fb_00013", "electrical", "Electrical Works", "Bestcor electrical work photograph.", 640, 640],
  ["g-14", "fb_00014", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-15", "fb_00015", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-16", "fb_00016", "worksite", "On-Site Work", "Bestcor on-site work photograph.", 640, 640],
  ["g-17", "fb_00017", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-18", "fb_00018", "electrical", "Electrical Maintenance", "Bestcor preventive maintenance work.", 640, 640],
  ["g-19", "fb_00019", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-20", "fb_00020", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-21", "fb_00021", "crew", "Field Personnel", "Bestcor field personnel at work.", 640, 640],
  ["g-22", "fb_00022", "crew", "Field Crew", "Bestcor personnel at a work site.", 640, 640],
  ["g-23", "fb_00023", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-24", "fb_00024", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-25", "fb_00025", "worksite", "Electrical Works", "Bestcor electrical work photograph.", 640, 640],
  ["g-26", "fb_00026", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-27", "fb_00027", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-28", "fb_00028", "equipment", "Testing & Diagnostics", "Bestcor testing and diagnostic work.", 640, 640],
  ["g-29", "fb_00029", "utility", "Pole-Line Works", "Bestcor transmission and pole-line construction work.", 640, 640],
  ["g-30", "fb_00030", "equipment", "Equipment", "Bestcor equipment photograph.", 640, 640],
  ["g-31", "fb_00031", "equipment", "Equipment", "Bestcor equipment photograph.", 640, 640],
  ["g-32", "fb_00032", "worksite", "Field Work", "Bestcor field work photograph.", 640, 640],
  ["g-33", "fb_00033", "worksite", "Field Work", "Bestcor work photograph.", 640, 640],
].map(
  ([id, fb, family, chip, alt, w, h]) =>
    ({
      // g-01 shares the optimized hero file (same source fb_00001)
      src: id === "g-01" ? "/images/hero-home.webp" : `/images/${id}.webp`,
      width: w as number,
      height: h as number,
      alt,
      family,
      chip,
      source: fb,
    }) as ImageAsset,
);
