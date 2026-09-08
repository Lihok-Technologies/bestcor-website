/**
 * BESTCOR — curated image manifest.
 *
 * Every web asset traces back to an ORIGINAL embedded photograph from the
 * OWNER-supplied company profile presentation
 * (source-assets/bestcor-presentation/playwright-less originals in
 * harvest/media; provenance recorded per asset below as `deck:<file>`).
 * Optimized web derivatives live in /public/images/deck-*.webp.
 *
 * Alt text stays neutral and never names clients, projects, locations or
 * people. No photograph is linked to a specific named project because the
 * source does not associate images with individual projects.
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
  /** Provenance: source presentation media file */
  source: string;
  /** Shown under tiles in Our Work / Gallery */
  chip: string;
};

const R = (
  id: string,
  source: string,
  family: ImageAsset["family"],
  chip: string,
  alt: string,
  w: number,
  h: number,
) =>
  ({ src: `/images/${id}.webp`, width: w, height: h, alt, family, chip, source }) as ImageAsset;

export const curated: Record<string, ImageAsset> = {
  'hero-home': R('deck-hero', 'deck:s23-img-1.jpg', 'worksite', 'Aerial Equipment', 'Bestcor-branded aerial bucket truck in the field.', 1920, 1080),
  'service-maintenance': R('deck-service-maintenance', 'deck:s14-img-3.jpg', 'electrical', 'Electrical Maintenance', 'Bestcor technicians servicing a motor-control / VFD cabinet.', 680, 680),
  'service-repairs': R('deck-service-repairs', 'deck:s12-img-2.jpg', 'worksite', 'Field Repair', 'Bestcor technician working on electrical and pump equipment.', 680, 680),
  'service-construction': R('deck-service-construction', 'deck:s20-img-1.jpg', 'worksite', 'Installation & Construction', 'Bestcor crew carrying out underground/installation works.', 680, 680),
  'service-testing': R('deck-service-testing', 'deck:s12-img-4.jpg', 'electrical', 'Testing & Diagnostics', 'Bestcor technician performing thermal inspection of an electrical panel.', 680, 680),
  'service-distribution': R('deck-service-distribution', 'deck:s14-img-1.jpg', 'electrical', 'Distribution Equipment', 'Bestcor crew testing switchgear in a plant room.', 680, 680),
  'service-poleline': R('deck-service-poleline', 'deck:s16-img-1.jpg', 'electrical', 'Pole-Line Works', 'Bestcor lineman working from an aerial lift on a distribution pole.', 680, 680),
  'service-mechanical': R('deck-service-mechanical', 'deck:s06-img-1.png', 'mechanical', 'Mechanical Services', 'Bestcor technicians servicing a pump and motor set in a plant room.', 680, 680),
  'about-crew': R('deck-about-crew', 'deck:s02-img-1.png', 'worksite', 'Field Crew', 'Bestcor field crew during a pre-work briefing.', 900, 900),
  'about-secondary': R('deck-about-secondary', 'deck:s28-img-1.jpg', 'worksite', 'Field Service', 'Bestcor service vehicle in the field.', 680, 680),
  'safety-personnel': R('deck-safety-personnel', 'deck:s13-img-1.jpg', 'worksite', 'Field Personnel', 'Bestcor technician performing field testing with test equipment.', 900, 900),
  'safety-discipline': R('deck-safety-discipline', 'deck:s23-img-1.jpg', 'worksite', 'Aerial Equipment', 'Bestcor-branded aerial bucket truck.', 680, 680),
  'work-grid-1': R('deck-field-1', 'deck:s12-img-1.jpg', 'electrical', 'Pole-Line Work', 'Bestcor linemen working from an aerial lift.', 640, 640),
  'work-grid-2': R('deck-field-2', 'deck:s15-img-2.jpg', 'electrical', 'Field Testing', 'Bestcor crew testing outdoor substation equipment.', 640, 640),
  'work-grid-3': R('deck-field-3', 'deck:s16-img-3.jpg', 'electrical', 'Distribution Equipment', 'Bestcor technician checking a transfer-switch panel.', 640, 640),
  'work-grid-4': R('deck-field-4', 'deck:s17-img-2.jpg', 'electrical', 'Line Clearance', 'Bestcor line-clearance crew working near the lines.', 640, 640),
};

/** Curated gallery — the strongest authentic presentation photography. */
/** Short tile provenance label (empty for presentation-deck assets). */
export function sourceLabel(a: ImageAsset): string {
  return a.source.startsWith("deck:") ? "" : a.source.replace("fb_", "#");
}

export const gallery: ImageAsset[] = [
  R('deck-g-01', 'deck:s13-img-3.jpg', 'electrical', 'Electrical Works', 'Bestcor technician adjusting outdoor electrical equipment.', 720, 720),
  R('deck-g-02', 'deck:s16-img-2.jpg', 'electrical', 'Electrical Works', 'Bestcor technician servicing a variable-frequency drive panel.', 720, 720),
  R('deck-g-03', 'deck:s15-img-3.jpg', 'electrical', 'Electrical Works', 'Bestcor technician performing thermal inspection outdoors.', 720, 720),
  R('deck-g-04', 'deck:s12-img-3.jpg', 'electrical', 'Electrical Works', 'Bestcor technicians working on drive cabinets.', 720, 720),
  R('deck-g-05', 'deck:s15-img-1.jpg', 'mechanical', 'Mechanical Works', 'Bestcor crew servicing pumps in a pump station.', 720, 720),
  R('deck-g-06', 'deck:s47-img-1.png', 'mechanical', 'Mechanical Works', 'Bestcor technicians working on large motor and pump installation.', 720, 720),
  R('deck-g-07', 'deck:s19-img-1.jpg', 'civil', 'Civil Works', 'Bestcor crew tying reinforcement for a concrete foundation.', 720, 720),
  R('deck-g-08', 'deck:s20-img-2.jpg', 'civil', 'Civil Works', 'Bestcor crew carrying out underground civil works.', 720, 720),
  R('deck-g-09', 'deck:s16-img-4.jpg', 'electrical', 'Distribution & Pole-Line', 'Aerial work at a distribution transformer.', 720, 720),
  R('deck-g-10', 'deck:s17-img-4.jpg', 'electrical', 'Distribution & Pole-Line', 'Bestcor aerial bucket trucks on line work.', 720, 720),
  R('deck-g-11', 'deck:s18-img-4.jpg', 'electrical', 'Distribution & Pole-Line', 'Bestcor bucket truck at a substation structure.', 720, 720),
  R('deck-g-12', 'deck:s17-img-1.jpg', 'electrical', 'Line Clearance', 'Bestcor tree-trimming equipment on line work.', 720, 720),
  R('deck-g-13', 'deck:s28-img-1.jpg', 'worksite', 'Field Operations', 'Bestcor service vehicle.', 720, 720),
  R('deck-g-14', 'deck:s27-img-1.png', 'worksite', 'Field Operations', 'Bestcor excavator on site.', 720, 720),
  R('deck-g-15', 'deck:s37-img-2.png', 'worksite', 'Field Operations', 'Bestcor test equipment in use.', 720, 720),
  R('deck-g-16', 'deck:s40-img-1.png', 'worksite', 'Field Operations', 'Shaft-alignment test kit used by Bestcor.', 720, 720),
  R('deck-g-17', 'deck:s43-img-2.png', 'worksite', 'Field Operations', 'Transformer test set used by Bestcor.', 720, 720),
  R('deck-g-18', 'deck:s39-img-3.png', 'worksite', 'Field Operations', 'Thermal imager used by Bestcor.', 720, 720),
];
