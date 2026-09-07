/**
 * Case-study architecture (deliberately empty).
 *
 * Our Work is presented capability-first until Bestcor confirms which
 * projects, clients and locations may be published. When confirmed, fill
 * this array with owner-verified entries only — every field below must be
 * approved by Bestcor before it ships. The /projects page will render them.
 */

export type CaseStudy = {
  slug: string;
  /** Short customer-facing title */
  title: string;
  /** Client/owner name — publish only with authorization */
  client?: string;
  /** Site location — publish only with authorization */
  location?: string;
  /** Capability this job exercised (matches capability index on /projects) */
  capability: string;
  /** Year(s) of execution — publish only when verified */
  year?: string;
  /** 2–4 sentence factual summary, owner-reviewed */
  summary: string;
  /** Image key from src/lib/images.ts */
  image: string;
};

export const caseStudies: CaseStudy[] = [
  // Example shape only — do NOT ship fabricated entries:
  // {
  //   slug: "example",
  //   title: "Replace with a real, confirmed project",
  //   client: "Approved client name",
  //   location: "Approved site",
  //   capability: "Testing & diagnostics",
  //   year: "2025",
  //   summary: "Owner-confirmed description.",
  //   image: "service-testing",
  // },
];
