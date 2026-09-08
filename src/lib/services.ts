/**
 * BESTCOR service definitions — the source of truth for the Services pages.
 *
 * Evidence basis:
 *  - the project brief (§11) capabilities; and
 *  - the OWNER-supplied Bestcor company profile presentation
 *    ("Powerpoint Presentation - Bestcor WITH COMPLETED PROJ.pptx"), which
 *    expands the mechanical-services and utility line-clearance scope shown
 *    below. No capability beyond those sources is claimed.
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
      "Scheduled care for high-, medium- and low-voltage electrical and mechanical equipment, including on-site repairs and installations.",
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
      "Our crews carry out disciplined, schedule-based preventive maintenance on low-, medium- and high-voltage electrical equipment and on mechanical equipment — including on-site repairs and installations. The goal is straightforward: catch developing issues before they become failures, and keep your equipment ready to run.",
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
      "Supply of materials and construction of electrical distribution line facilities and associated electrical works.",
    intro:
      "From component supply to installed and commissioned results, Bestcor handles electrical distribution facilities and the electrical works that go with them.",
    scope: [
      "Electrical distribution line facilities",
      "Associated electrical works",
      "Supply of materials",
    ],
    image: "service-construction",
    detailLead:
      "Bestcor delivers electrical distribution scope end to end — materials, installation and construction.",
    detailBody:
      "We support the supply of materials and the construction of electrical distribution line facilities and associated electrical works, coordinating delivery, installation and the construction activities required to bring distribution scope into service.",
  },
  {
    slug: "testing-diagnostics",
    title: "Electrical Testing & Diagnostics",
    summary:
      "Testing, troubleshooting and maintenance of critical power equipment — transformers, switchgear, power cables and instrument transformers.",
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
      "Bestcor specializes in the testing, troubleshooting and maintenance of critical power equipment — including electrical testing of transformers, switchgear, power cables and instrument transformers to confirm performance and safety. Where testing identifies a defective component, replacement is carried out where applicable to restore the installation to service.",
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
      "Switchgear",
      "Metering",
    ],
    image: "service-distribution",
    detailLead:
      "Distribution systems are built from components that must work together — Bestcor knows them.",
    detailBody:
      "We work across the equipment that carries and protects distribution supply: load break switches, power fuse assemblies, transformers, relay protection, switchgear and metering. That covers the switching, transformation and protection hardware at the heart of an electrical distribution facility.",
  },
  {
    slug: "pole-line-transmission-works",
    title: "Transmission & Pole-Line Works",
    summary:
      "Steel-pole foundations, ground rehabilitation, pole-line services, lightning-system installation and line-clearance tree trimming.",
    intro:
      "Bestcor carries out line-side construction scope: steel-pole foundations for transmission lines, ground rehabilitation, pole-line services, lightning-system installation and line-clearance works.",
    scope: [
      "Steel-pole foundations for transmission lines",
      "Ground rehabilitation",
      "Installation of pole-line services",
      "Lightning-system installation",
      "Tree trimming / line clearance",
    ],
    image: "service-poleline",
    detailLead:
      "From the ground up — foundations, pole-line services, lightning protection and line clearance.",
    detailBody:
      "Bestcor performs transmission and pole-line construction works, including steel-pole foundations for transmission lines, ground rehabilitation, installation of pole-line services, lightning-system installation and line-clearance tree trimming. These ground-level disciplines determine long-term line reliability and safety.",
  },
  {
    slug: "mechanical-services",
    title: "Mechanical Services",
    summary:
      "Trading, supply, delivery, repair or rewinding and installation of pumps and motors, generator sets, pipelines — plus deep-well drilling.",
    intro:
      "Bestcor's mechanical line covers rotating equipment, generators, piping and water-well works, with preventive maintenance to keep equipment efficient.",
    scope: [
      "Pumps and motors (1 HP to 800+ HP) — repair or rewinding and installation",
      "Generator sets (1 kVA to 1000+ kVA)",
      "Pipelines — trading, supply, delivery and installation",
      "Deep-well drilling services",
      "Preventive maintenance of mechanical equipment",
    ],
    image: "service-mechanical",
    detailLead:
      "Rotating equipment, generators and piping — supplied, repaired and installed by one mechanical team.",
    detailBody:
      "Bestcor provides the trading, supply, delivery, repair or rewinding and installation of pumps and motors (1 HP to 800+ HP) and generator sets (1 kVA to 1000+ kVA), plus pipelines and deep-well drilling services. Preventive maintenance keeps the equipment running at maximum efficiency and longevity.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
