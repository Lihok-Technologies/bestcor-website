/**
 * Case-study / completed-project data.
 *
 * Evidence: the OWNER-supplied Bestcor company profile presentation
 * ("Powerpoint Presentation - Bestcor WITH COMPLETED PROJ.pptx").
 * Every record below mirrors a row of the deck's completed civil-works
 * register (slide 11) — client, location, year and scope are reproduced
 * as published there. The long electrical maintenance tables on slides
 * 8–10 are withheld until their records can be confirmed cleanly. No
 * project metrics beyond the deck were invented.
 *
 * Fields left optional are omitted when the deck does not state them.
 */

export type CaseStudy = {
  slug: string;
  /** Short customer-facing title */
  title: string;
  /** Client/owner as named in the deck */
  client?: string;
  /** Site location exactly as listed in the deck */
  location?: string;
  /** Capability family (matches /projects capability index) */
  capability: string;
  /** Year(s) of execution as listed in the deck */
  year?: string;
  /** One-line factual summary (scope as published) */
  summary: string;
  /** Image key from src/lib/images.ts (optional; not yet assigned) */
  image?: string;
};

export const caseStudies: CaseStudy[] = [
  { slug: "steelpole-batangas-2010", title: "Steel-Pole Foundation Works", client: "Manila Electric Company", location: "Batangas", capability: "Utility & pole-line works", year: "2010", summary: "Steel-pole foundation works." },
  { slug: "steelpole-cabuyao-2011", title: "Steel-Pole Foundation Works", client: "Manila Electric Company", location: "Cabuyao", capability: "Utility & pole-line works", year: "2011", summary: "Steel-pole foundation works." },
  { slug: "steelpole-dasmarias-2012", title: "Steel-Pole Foundation Works", client: "Manila Electric Company", location: "Dasmariñas", capability: "Utility & pole-line works", year: "2012", summary: "Steel-pole foundation works." },
  { slug: "diversion-canal-malolos-2012", title: "Diversion Canal", client: "Manila Electric Company", location: "Malolos, Bulacan", capability: "Civil works", year: "2012", summary: "Diversion canal works." },
  { slug: "steelpole-antipolo-2012", title: "Steel-Pole Foundation Works", client: "Manila Electric Company", location: "Antipolo", capability: "Utility & pole-line works", year: "2012", summary: "Steel-pole foundation works." },
  { slug: "steelpole-san-juan-2012", title: "Steel-Pole Foundation Works", client: "Manila Electric Company", location: "San Juan", capability: "Utility & pole-line works", year: "2012", summary: "Steel-pole foundation works." },
  { slug: "steelpole-erodriguez-2013", title: "Steel-Pole Foundation Works", client: "Manila Electric Company", location: "E. Rodriguez", capability: "Utility & pole-line works", year: "2012–2013", summary: "Steel-pole foundation works." },
  { slug: "concrete-manhole-lamesa-2014", title: "Concrete Manhole", client: "Manila Water Company Inc.", location: "La Mesa", capability: "Civil works", year: "2013–2014", summary: "Concrete manhole works." },
  { slug: "elm-intake-interconnect-2019", title: "Interconnecting Line — ELM Intake at ELMTP", client: "Manila Water Company Inc.", location: "Quezon City", capability: "Utility & pole-line works", year: "2019", summary: "Interconnecting line works." },
  { slug: "civil-works-north-qc-2019", title: "Civil Works", client: "Manila Water Company Inc.", location: "North QC System", capability: "Civil works", year: "2019", summary: "Civil works for the North QC system." },
  { slug: "steelpole-sjdm-2020", title: "Steel-Pole Foundation Works", client: "Meralco Energy Inc.", location: "San Jose del Monte, Bulacan", capability: "Utility & pole-line works", year: "2018–2020", summary: "Steel-pole foundation works." },
  { slug: "delos-santos-ps-upgrade-2021", title: "Delos Santos Pumping Station Upgrade to 23 MLD", client: "F.E.D. Construction Company Inc.", location: "Delos Santos Pumping Station", capability: "Mechanical services", year: "2021", summary: "Upgrade of the pumping station to 23 MLD capacity." },
  { slug: "overhead-tank-demolition-2023", title: "Demolition of Overhead Tank", client: "Manila Water Company Inc.", location: "Vista Real & Tivoli Green Subdivision", capability: "Civil works", year: "2023", summary: "Demolition of an overhead tank." },
  { slug: "linebooster-service-entrances", title: "Service Entrances", client: "Manila Water Company Inc.", location: "Various line-booster locations", capability: "Electrical maintenance", year: "2021–2023", summary: "Service entrance works across line-booster locations." },
];

/**
 * Recurring electrical civil works that Bestcor lists as ongoing since
 * 2009 (pad-mount / cabinet-type transformer, MV switchgear and generator
 * set foundations; underground distribution feeder lines and manholes;
 * genset house, bund walls and generator day-tank fabrication; steel
 * frames for structures). Presented capability-first, without client
 * attribution because the deck lists no single client for this series.
 */
export const ongoingWorks = [
  "Concrete foundations for pad-mount and cabinet-type transformers, MV switchgear and generator sets",
  "Underground distribution feeder lines and manholes",
  "Generator house, bund walls and generator day-tank fabrication",
  "Steel frames for structures",
];
