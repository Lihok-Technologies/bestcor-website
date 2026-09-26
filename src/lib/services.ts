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
  /**
   * Governed technical narrative (Mission 9 optional fields).
   *
   * These render on the public service page only when present, so an unauthored
   * section never becomes an empty or speculative public claim. Each array is a
   * set of customer-facing statements that must trace to accepted Bestcor source
   * material: the OWNER-supplied company profile presentation (slides 2–6 for
   * company/services, 12–16 for preventive-maintenance works, 29–46 for test
   * equipment) and the project brief. Nothing beyond those sources is claimed.
   *
   * Deliberately NOT included anywhere in these fields: test standards or
   * standards compliance, calibration regimes, acceptance criteria or pass/fail
   * verdicts, test report deliverables, maintenance intervals, response times,
   * warranties, statistics, or outcome guarantees.
   */
  problems?: string[];
  approach?: string[];
  outcomes?: string[];
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
    /**
     * Evidence — preventive-maintenance slides 12–16 (deck): "PREVENTIVE
     *  MAINTENANCE OF ELECTRICAL (LOW, MEDIUM AND HIGH VOLTAGE) AND MECHANICAL
     *  EQUIPMENT, INCLUDING ON-SITE REPAIRS AND INSTALLATIONS"; slide 3 services
     *  list ("Preventive Maintenance of Equipment"); slide 6 (mechanical line
     *  "focuses on preventive maintenance"); the scope items above; and slide 39
     *  test inventory (thermal scanner) plus the slide 12/15 works photographs,
     *  which show thermal-imaging camera use on LV/MV panels and outdoor control
     *  cabinets. Slides 40/45/46 (shaft alignment, vibration tester, laser
     *  alignment) support the mechanical condition checks.
     */
    problems: [
      "Maintenance requirements do not announce themselves. Equipment that is running normally can still be due for attention.",
      "Low-, medium- and high-voltage equipment each carry their own maintenance requirements, and treating them as a single category leaves gaps.",
      "Mechanical and electromechanical equipment has to be maintained on the same footing as the electrical equipment it supports — pumps, motors and generator sets included.",
      "Work that requires equipment to be taken out of service has to be planned around operations rather than fitted in afterwards.",
    ],
    approach: [
      "Maintenance is planned by equipment class and voltage level, so the schedule reflects what is actually installed on the site.",
      "Maintenance visits include on-site repairs and installations, so work identified during a visit is handled within the same scope rather than as a separate engagement.",
      "Electrical condition is checked by measurement rather than by appearance. Thermal scanning of panels and control cabinets is part of the maintenance work, using the same test instruments used for electrical testing.",
      "Mechanical condition is supported by vibration testing, and by shaft and laser alignment tooling for rotating equipment.",
    ],
    outcomes: [
      "Maintenance carried out on a schedule identifies requirements on a defined basis, so the work is known about in advance rather than raised at the point of need.",
      "Maintenance that is planned in advance can be scheduled around operations instead of being forced by an unplanned stoppage.",
      "Scheduled maintenance, on-site repair and installation work are carried out by the same team, so a finding raised during maintenance can move into repair without a second engagement.",
    ],
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
    /**
     * Evidence — deck slide 3 ("On-Site Repairs" in the services list, and
     *  "Trouble shooting and repair/replacement of Load Break Switch, Power Fuse
     *  Assembly, Transformer, Relay Protection, Switchgear, Metering"); the
     *  slides 12–16 preventive-maintenance header, which states its scope
     *  "INCLUDING ON-SITE REPAIRS AND INSTALLATIONS"; the mechanical-services
     *  scope above ("repair or rewinding" of pumps and motors, generator sets);
     *  and the approved service-image alt text "Bestcor technician working on
     *  electrical and pump equipment".
     *
     *  No response time, call-out commitment, spare-parts availability, repair
     *  turnaround or service-area coverage is claimed: none is evidenced.
     */
    problems: [
      "Equipment faults do not wait for a convenient moment, and the work they need is at the installation rather than at a desk.",
      "A fault has to be traced to the item actually causing it before a repair can be scoped.",
      "Some repairs go beyond the first fix and need the equipment owner involved in deciding what happens next.",
      "Electrical and mechanical equipment stand in the same plant and fail in the same plant, so field repair has to cover both.",
    ],
    approach: [
      "Field technical support, troubleshooting and repair activities happen at the customer's location.",
      "Troubleshooting establishes which item is causing the fault before any repair or replacement is proposed.",
      "Mechanical repair covers pumps and motors, including rewinding, and generator sets.",
      "Electrical repair work covers the distribution components that switch, protect and measure the supply.",
    ],
    outcomes: [
      "A fault is worked through to either a repair or a defined next step, so a visit ends with a decision.",
      "Where the equipment owner decides the next step, that decision is made with the findings from the visit in hand.",
    ],
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
    /**
     * Evidence — deck slide 3 ("supply of materials and construction of
     *  Electrical Distribution Line Facilities"); deck slides 19–21, the civil
     *  works section: "CIVIL WORKS (SUPPLY AND INSTALLATION OF SERVICE ENTRANCE,
     *  ERECTION OF FIRST PRIVATE POLE, CONSTRUCTION OF STEEL POLE FOUNDATION,
     *  ETC.)"; the project register scope "Supply and installation of first
     *  private pole"; and the approved service-image alt text "Bestcor crew
     *  carrying out underground/installation works".
     *
     *  Deliberately NOT claimed: building or structural construction beyond the
     *  listed scope, project values, commissioning standards, or the specific
     *  voltage levels that appear in the OCR'd project register (4.16 kV /
     *  34.5 kV / 69 kV) — those are register entries with OCR uncertainty and
     *  would be less conservative than the approved scope wording, which names
     *  voltage classes rather than figures.
     */
    problems: [
      "Distribution work is not only equipment. Materials, delivery, installation and the construction around them have to line up before the scope can be brought into service.",
      "When material supply and installation sit with different parties, the interface between them belongs to nobody.",
      "Distribution facilities depend on civil work — service entrances, poles and foundations — that has to be sequenced with the electrical scope.",
    ],
    approach: [
      "Bestcor supplies materials and constructs electrical distribution line facilities and the associated electrical works.",
      "The civil scope in the same works includes supply and installation of service entrances, erection of the first private pole, and construction of steel-pole foundations.",
      "Delivery, installation and construction activities are coordinated so the distribution scope is brought into service as one scope.",
    ],
    outcomes: [
      "Distribution scope runs from material supply through installation and construction, so the interfaces between them stay with one contractor.",
    ],
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
    /**
     * Evidence — deck slide 3 ("Electrical Testing of Transformer, Switchgear,
     *  Power Cable, Instrument Transformer" and "Trouble shooting and
     *  repair/replacement of Load Break Switch, Power Fuse Assembly,
     *  Transformer, Relay Protection, Switchgear, Metering"); slide 5
     *  (Electrical Services); the scope items above; and the slide 31–46 test
     *  equipment inventory, which is the basis for the measurement list:
     *  insulation resistance (IRM-10), insulation power factor (CDF-10A), DC
     *  hi-pot (DHP-200), winding resistance (TRM-10, TRM-5), turns ratio
     *  (TTR-3000, single-phase Vanguard), contact resistance (CRT-200), breaker
     *  timing (CBT-6P), three-phase relay tester (PWQ-460), CT & PT analyzer
     *  (PCT-100i), primary current injectors, SF6 gas analyzer (SFA-300), oil
     *  DBV (DBV-60) and high-vacuum oil purifier (TRP-2000), surge comparison
     *  tester, grounding resistance (Kyoritsu 4105A / SEW), phase sequence,
     *  voltage detector, ultrasonic, thermal scanner, power quality analyzer
     *  (Fluke 1777), gas detector and partial discharge (Fluke ii915).
     *
     *  Instrument MODEL names are deliberately not published: they are supplier
     *  hardware, they date, and the capability — not the badge — is the claim.
     *  The slide 13–15 works photographs corroborate the work (winding and
     *  tap-changer test connections, switchgear/breaker-compartment testing,
     *  HV bushing test leads, transformer connections under test).
     */
    problems: [
      "Equipment condition is not always evident from how a plant is running. Electrical testing measures the assets directly, so maintenance and replacement decisions can rest on results rather than on assumption.",
      "Transformers, switchgear, power cables and instrument transformers that have not been tested leave an open question about their present condition.",
      "Troubleshooting an electrical fault requires the affected item to be identified before a repair path can be chosen.",
      "Where a component is found to be defective, the practical question is whether it can be repaired or has to be replaced.",
    ],
    approach: [
      "The test inventory covers the measurements these asset classes call for, as separate instruments rather than one general-purpose set.",
      "It includes insulation resistance, insulation power factor and DC high-potential testing; winding resistance and turns ratio on transformers; contact resistance and breaker timing on switchgear; relay testing; and current-transformer and potential-transformer analysis.",
      "Transformer oil is handled as part of the same work — dielectric breakdown testing and high-vacuum oil purification are both in the test inventory.",
      "Switchgear condition is checked beyond electrical measurement, including SF6 gas analysis and partial-discharge detection.",
      "Site measurement also covers grounding resistance, phase sequence, primary current injection, power quality, ultrasonic and thermal scanning, and gas detection.",
    ],
    outcomes: [
      "Testing gives a measured basis for maintenance and replacement planning: an asset whose condition has been tested can be scheduled, repaired or replaced on evidence.",
      "Because testing, troubleshooting and repair or replacement sit with the same provider, a test finding does not have to be handed to another party before it can be acted on.",
      "Relay protection, metering and instrument transformers sit in the same protection chain as the switchgear they work with, so assessing them alongside the primary equipment keeps that chain assessed as a whole.",
    ],
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
    /**
     * Evidence — deck slide 3 ("repair/replacement of Load Break Switch, Power
     *  Fuse Assembly, Transformer, Relay Protection, Switchgear, Metering"); the
     *  scope items above; the project-register scope "Electrical functional test
     *  of various relay protection low, medium, high voltage equipment" and
     *  "Electrical functional test of current metering"; and the slide 31–46
     *  test inventory, which covers exactly these measurements: three-phase
     *  relay tester, CT & PT analyzer, contact resistance meter, breaker timing
     *  tester, SF6 gas analyzer and surge comparison tester.
     *
     *  Relay protection, metering and instrument transformers are cross-linked
     *  from Electrical Testing & Diagnostics as well, because the same
     *  protection chain is both tested and replaced. That overlap is real, not
     *  duplication: testing assesses them, this service line supplies and
     *  replaces them.
     *
     *  Deliberately NOT claimed: compliance with any protection standard,
     *  protection settings studies, coordination studies, or manufacturer
     *  authorisation. No equipment brand is named (the works photographs show
     *  branded switchgear; a photograph may not be turned into a brand claim).
     */
    problems: [
      "Switching, protection, transformation and metering are separate components that have to work together; a weak point in one shows up in the installation as a whole.",
      "Protection that has not been functionally tested has not been shown to operate.",
      "These components are worked on inside an installation that is already built, so a replacement has to suit what is there.",
    ],
    approach: [
      "Bestcor supplies and works on load break switches, power fuse assemblies, transformers, relay protection, switchgear and metering.",
      "Functional testing of relay protection covers low-, medium- and high-voltage equipment.",
      "The measurement set for these components includes relay testing, current and potential transformer analysis, contact resistance, breaker timing, SF6 gas analysis and surge comparison.",
    ],
    outcomes: [
      "Protection and metering are assessed alongside the switchgear they work with, so the switching, protection and measurement functions are treated as one installation.",
      "Functional testing of relay protection gives a basis for deciding whether protection equipment needs attention.",
    ],
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
    /**
     * Evidence — deck slide 3 ("Construction of Steel-pole Foundation for
     *  transmission lines, Tree Trimming"); deck slides 17–18 (TREE TRIMMING);
     *  deck slides 19–21 ("ERECTION OF FIRST PRIVATE POLE, CONSTRUCTION OF STEEL
     *  POLE FOUNDATION"); deck slides 23–24 ("ANTI-ELECTRIC MANLIFT TRUCK") and
     *  the approved hero alt text "Bestcor-branded aerial bucket truck in the
     *  field" plus the pole-line service alt "Bestcor lineman working from an
     *  aerial lift on a distribution pole", which between them make the aerial
     *  lift a plainly-visible, already-published fact.
     *
     *  The aerial manlift is mentioned because it materially supports this
     *  service — access at height is part of line work — not because the deck's
     *  heavy-equipment inventory exists. The rest of that inventory (cranes,
     *  backhoe, tractor head, service vehicles) is deliberately not published:
     *  it does not add to what a customer needs to know about this scope.
     *
     *  Deliberately NOT claimed: line voltages, transmission-vs-distribution
     *  classification, right-of-way or permitting work, or outage/energisation
     *  procedures. Photographs show linemen on poles and in a bucket lift; they
     *  do not establish live-line work, and no such claim is made.
     */
    problems: [
      "Line-side work happens outdoors and at height, so how the crew reaches the work is part of the scope rather than an afterthought.",
      "A steel pole is only as good as the foundation under it — ground-level civil work that has to come first.",
      "Vegetation has to be kept clear of the line.",
      "Construction along a line disturbs the ground it crosses, and that ground has to be put back.",
    ],
    approach: [
      "Bestcor constructs steel-pole foundations for transmission lines, installs pole-line services, carries out ground rehabilitation and lightning-system installation, and performs tree trimming for line clearance.",
      "Work at height is carried out from Bestcor's own insulated aerial manlift, part of its field equipment.",
      "Ground rehabilitation, lightning-system installation and line clearance are carried out as line-side scope, alongside the foundation and pole works.",
    ],
    outcomes: [
      "The ground-level work a line depends on — foundations, ground rehabilitation, lightning protection and line clearance — sits with the contractor that erects the pole line and installs its services.",
    ],
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
    /**
     * Evidence — deck slide 6 (the mechanical-services section: trading, supply,
     *  delivery, repair or rewinding and installation of pumps and motors from
     *  1 HP to 800+ HP, generator sets from 1 kVA to 1000+ kVA, pipelines, and
     *  deep-well drilling); the scope items above; deck slide 40/45/46 tooling
     *  (vibration tester, SKF shaft alignment, laser alignment) plus the sound
     *  level meter; deck slide 6's statement that preventive maintenance keeps
     *  equipment efficient; and the approved service-image alt text "Bestcor
     *  technicians servicing a pump and motor set in a plant room".
     *
     *  The HP and kVA ranges ARE published here (unlike the voltage figures
     *  elsewhere) because they are the owner's own scope figures, taken from
     *  clean slide text rather than OCR, and they are already the governed
     *  scope wording of this service line.
     *
     *  Deliberately NOT claimed: "maximum efficiency and longevity" (slide 6) as
     *  a guaranteed outcome — it is an unsupported superlative and is left in the
     *  approved body copy only as the existing owner wording, never restated as a
     *  result; also not claimed: manufacturer authorisation for rewinding, pump
     *  performance curves, or generator-set standby/emergency duty (the deck does
     *  not say what the sets are installed for).
     */
    problems: [
      "Pumps, motors and generator sets wear as mechanical plant, and keeping them serviceable is a different discipline from the electrical work that supplies them.",
      "The choice between repairing, rewinding and replacing rotating equipment depends on the equipment itself.",
      "Mechanical scope is not confined to the plant room: pipelines and deep wells carry their own requirements.",
    ],
    approach: [
      "Bestcor trades, supplies, delivers, repairs or rewinds and installs pumps and motors across the 1 HP to 800+ HP range, and generator sets across 1 kVA to 1000+ kVA.",
      "Pipelines are traded, supplied, delivered and installed, and deep-well drilling is carried out as a field scope in its own right.",
      "Mechanical condition is assessed with vibration testing and shaft and laser alignment, which Bestcor's test inventory covers.",
      "Preventive maintenance of mechanical equipment is carried out on the same schedule-based basis as the electrical maintenance.",
    ],
    outcomes: [
      "Pumps, motors and generator sets are handled as plant — supplied, repaired or rewound, installed and maintained within one mechanical line.",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
