/**
 * BESTCOR service definitions — the source of truth for the Services pages.
 * Scope lines are limited strictly to the capabilities Bestcor published
 * (see project brief §11). Nothing extra is fabricated.
 */

export type Service = {
  slug: string;
  /** Customer-facing category name */
  title: string;
  /** One-line positioning used on cards */
  summary: string;
  /** Longer introduction for overview + detail pages */
  intro: string;
  /** Specific, published scope items */
  scope: string[];
  /** Image key into src/lib/images.ts manifest */
  image: string;
  /** What Bestcor covers — plain-language opening line */
  detailLead: string;
  detailBody: string;
};

export const services: Service[] = [
  {
    slug: "preventive-maintenance",
    title: "Preventive Maintenance",
    summary:
      "Scheduled care for high-, medium- and low-voltage electrical and electromechanical equipment.",
    intro:
      "Structured preventive maintenance keeps electrical and mechanical equipment in dependable operating condition and helps avoid unplanned downtime.",
    scope: [
      "High-voltage equipment",
      "Medium-voltage equipment",
      "Low-voltage equipment",
      "Electrical equipment",
      "Mechanical / electromechanical equipment",
    ],
    image: "service-maintenance",
    detailLead:
      "Bestcor performs preventive maintenance across electrical and mechanical equipment classes.",
    detailBody:
      "Our crews carry out disciplined, schedule-based maintenance on high-, medium- and low-voltage electrical equipment, as well as mechanical and electromechanical equipment. The goal is straightforward: catch developing issues before they become failures, and keep your equipment ready to run.",
  },
  {
    slug: "on-site-repairs",
    title: "On-Site Repairs",
    summary:
      "Field technical support, troubleshooting and repair work at your location.",
    intro:
      "When equipment faults interrupt operations, Bestcor provides field technical support, troubleshooting and repair activities on site.",
    scope: [
      "Field technical support",
      "Troubleshooting",
      "Repair activities",
    ],
    image: "service-repairs",
    detailLead:
      "Bestcor brings technical support and repair capability directly to your facility.",
    detailBody:
      "Our teams respond to equipment faults with structured troubleshooting and on-site repair work. Where a repair calls for specialist attention beyond the immediate fix, we work with the equipment owner to define the right path forward.",
  },
  {
    slug: "supply-installation-construction",
    title: "Supply, Installation & Construction",
    summary:
      "Electrical distribution facilities and associated electrical works, supplied and installed.",
    intro:
      "From component supply to installed and commissioned results, Bestcor handles electrical distribution facilities and the electrical works that go with them.",
    scope: [
      "Electrical distribution facilities",
      "Associated electrical works",
    ],
    image: "service-construction",
    detailLead:
      "Bestcor delivers electrical distribution facilities end to end — supply, installation and construction.",
    detailBody:
      "We support the supply, installation and construction of electrical distribution facilities and associated electrical works. The team coordinates material supply, installation and the construction activities required to bring distribution scope into service.",
  },
  {
    slug: "testing-diagnostics",
    title: "Electrical Testing & Diagnostics",
    summary:
      "Testing and diagnostics on transformers, switchgear, power cables and instrument transformers.",
    intro:
      "Bestcor tests and diagnoses electrical assets — transformers, switchgear, power cables and instrument transformers — with troubleshooting and replacement where applicable.",
    scope: [
      "Transformers",
      "Switchgear",
      "Power cables",
      "Instrument transformers",
      "Troubleshooting and diagnostics",
      "Replacement where applicable",
    ],
    image: "service-testing",
    detailLead:
      "Testing and diagnostics verify the condition of your critical electrical assets.",
    detailBody:
      "Bestcor performs electrical testing and diagnostic work on transformers, switchgear, power cables and instrument transformers. Where testing identifies a defective component, replacement is carried out where applicable to restore the installation to service.",
  },
  {
    slug: "distribution-components-works",
    title: "Distribution Components & Works",
    summary:
      "Load break switches, power fuse assemblies, transformers, relay protection and metering.",
    intro:
      "Bestcor supplies and works on the components that make distribution systems safe to operate — switching, protection, transformation and metering.",
    scope: [
      "Load break switches",
      "Power fuse assemblies",
      "Transformers",
      "Relay protection",
      "Metering",
    ],
    image: "service-distribution",
    detailLead:
      "Distribution systems are built from components that must work together — Bestcor knows them.",
    detailBody:
      "We work across the equipment that carries and protects distribution supply: load break switches, power fuse assemblies, transformers, relay protection and metering. That covers the switching, transformation and protection hardware at the heart of an electrical distribution facility.",
  },
  {
    slug: "pole-line-transmission-works",
    title: "Transmission & Pole-Line Works",
    summary:
      "Steel-pole foundations, ground rehabilitation, pole-line services and lightning-system installation.",
    intro:
      "Bestcor carries out line-side construction scope: steel-pole foundations for transmission lines, ground rehabilitation, pole-line services and lightning-system installation.",
    scope: [
      "Steel-pole foundations for transmission lines",
      "Ground rehabilitation",
      "Installation of pole-line services",
      "Lightning-system installation",
    ],
    image: "service-poleline",
    detailLead:
      "From the ground up — foundations, pole-line services and lightning protection.",
    detailBody:
      "Bestcor performs transmission and pole-line construction works, including steel-pole foundations for transmission lines, ground rehabilitation, installation of pole-line services and lightning-system installation. These are ground-level disciplines where foundation quality determines long-term line reliability.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
