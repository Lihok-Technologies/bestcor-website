/**
 * BESTCOR — single source of truth for company facts, navigation and metadata.
 * Update company details here; pages read from this module.
 *
 * Factual discipline: every value is verified against owner-provided
 * materials. Nothing is invented (no address beyond municipality, no phone,
 * no licenses/certifications). Items that still need Bestcor confirmation
 * are listed in the README under "Outstanding factual confirmations".
 */

export const site = {
  /** Short brand used in headings when space is tight */
  name: "Bestcor",
  /** Registered style of the company name */
  legalName: "Bestcor Phils., Inc.",
  /** Owner-approved positioning line */
  tagline: "Built on integrity. Driven by quality.",
  /** Headline split for hero colour accents */
  taglineLine1: "Built on integrity.",
  taglineLine2: "Driven by quality.",
  descriptor: "Civil–Electromechanical Contractor",
  /** Verified: operations began November 2005 */
  established: "November 2005",
  establishedShort: "Since 2005",
  /** Verified municipality only — no street address published */
  location: "San Jose del Monte, Bulacan, Philippines",
  /** Verified published email */
  email: "bestcorofficial2005@gmail.com",
  /** Verified Facebook page */
  facebookUrl: "https://www.facebook.com/profile.php?id=61562975085361",
  facebookHandle: "Bestcor Phils., Inc. on Facebook",
  /** Supporting positioning (owner-approved) */
  supportingPosition:
    "Your trusted partner in electrical, electromechanical and civil works.",
  /** Brand pillars — Integrity, Quality, Reliability, Expertise + Safety focus */
  values: [
    {
      id: "integrity",
      title: "Integrity",
      blurb:
        "Straightforward, dependable dealings on every engagement — we do what we say and stand behind our work.",
    },
    {
      id: "quality",
      title: "Quality",
      blurb:
        "Careful workmanship and attention to detail, delivered to a consistent standard on every task.",
    },
    {
      id: "reliability",
      title: "Reliability",
      blurb:
        "Dependable execution and clear communication from start to finish, so schedules and expectations hold.",
    },
    {
      id: "expertise",
      title: "Expertise",
      blurb:
        "Technical capability across electrical, electromechanical and civil work, applied with discipline on site.",
    },
  ] as const,

  mission:
    "To provide customers with high-quality work and services — delivered safely and efficiently — while consistently meeting customer needs.",
  vision:
    "To be a recognized and reliable electromechanical contractor, known for integrity, quality, reliability and expertise.",
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Our Work" },
  { href: "/safety-quality", label: "Safety & Quality" },
  { href: "/contact", label: "Contact" },
];

export const headerCta = { href: "/contact", label: "Request a Quotation" };

/** Capability strip labels (owner-approved) */
export const capabilityStrip = [
  { title: "Electrical Systems", note: "Preventive maintenance, testing & diagnostics" },
  { title: "Electromechanical Services", note: "Mechanical & electromechanical equipment" },
  { title: "Civil Works", note: "Construction & associated civil scope" },
  { title: "Safety Focused", note: "Safe, disciplined field execution" },
  { title: "Established 2005", note: "Operating since November 2005" },
] as const;

export const footerValues = [
  "Integrity",
  "Quality",
  "Reliability",
  "Expertise",
] as const;
