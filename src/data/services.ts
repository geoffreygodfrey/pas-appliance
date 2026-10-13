/**
 * Appliance service catalogue.
 *
 * Each service page is rendered from its entry in this file via the shared
 * ServiceLayout. Editing marketing copy, symptoms, FAQs or images here keeps
 * every page consistent and easy to maintain.
 *
 * Copy describes what the business does without inventing prices,
 * credentials, guarantees or operational practices.
 */

import type { ImageAsset } from './images';

export type ApplianceId =
  | 'refrigerator'
  | 'washer'
  | 'dryer'
  | 'stove'
  | 'dishwasher'
  | 'other';

export interface SymptomGroup {
  /** Optional group heading, e.g. "Washer problems" on the combined page. */
  heading?: string;
  icon?: string;
  /** Closely related symptoms the visitor may recognize in their own words. */
  items: string[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  /** Route slug, e.g. "fridge-repair" -> "/fridge-repair". */
  slug: string;
  /** Machine-readable id used by the booking form. */
  id: ApplianceId;
  /** Label used in navigation. */
  navLabel: string;
  /** Card title on the homepage grid. */
  cardTitle: string;
  /** Short card description on the homepage grid. */
  cardCopy: string;
  /** Optional image shown at the top of the homepage card (path served from /public). */
  cardImage?: string;
  /** Booking-form display label for the appliance type option. */
  formLabel: string;
  /** Short label used in breadcrumbs. */
  crumbLabel: string;

  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    image: ImageAsset;
  };

  seo: {
    title: string;
    description: string;
  };

  /** "Common problems we can help with" section. */
  symptomsTitle: string;
  symptomsIntro: string;
  symptomGroups: SymptomGroup[];

  /** Supported appliance types / configurations. */
  supportedTitle: string;
  supportedTypes: string[];
  supportedNote: string;

  /** Optional feature row following the symptoms section. */
  feature?: {
    title: string;
    items: string[];
    note?: string;
  };

  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: 'fridge-repair',
    id: 'refrigerator',
    navLabel: 'Fridge Repair',
    cardTitle: 'Fridge repair',
    cardImage: '/images/services/fridge.webp',
    cardCopy:
      'Not cooling, leaking, noisy or building up frost? Help us understand what your refrigerator is doing and request a repair.',
    formLabel: 'Refrigerator',
    crumbLabel: 'Fridge Repair',
    hero: {
      kicker: 'Fridge Repair',
      title: 'Refrigerator Repair in Brampton & the GTA',
      subtitle:
        "Having trouble with a refrigerator that isn't cooling, is leaking, or has stopped working properly? Tell us what's happening and request service in your area.",
      image: { id: 32391499, alt: 'Repair technicians working on a large refrigerator unit with its panel opened', ratio: 'landscape' },
    },
    seo: {
      title: 'Refrigerator Repair in Brampton & the GTA | PAS Appliance Repair',
      description:
        'Refrigerator not cooling, leaking or making noise? Request refrigerator repair service for your Brampton or GTA home and describe the problem in your own words.',
    },
    symptomsTitle: 'Common refrigerator problems',
    symptomsIntro:
      'One symptom can have several different causes, so we do not guess at the failed part before inspection. Share what your fridge is doing and we can discuss the next step.',
    symptomGroups: [
      { icon: 'snowflake', items: ['Refrigerator not cooling', 'Freezer too warm or too cold', 'Temperature swings between settings'] },
      { icon: 'droplet', items: ['Water pooling inside or under the fridge', 'Drips or damp spots on shelves', 'Water leaking from behind the unit'] },
      { icon: 'volume-2', items: ['Loud or unusual noises while running', 'Humming, rattling or clicking sounds', 'Sudden new sounds that were not there before'] },
      { icon: 'snowflake', items: ['Excessive frost or ice buildup', 'Ice forming where it should not', 'Door seals that look worn or let cold air escape'] },
    ],
    supportedTitle: 'Refrigerator types & brands',
    supportedTypes: [
      'Top-freezer and bottom-freezer refrigerators',
      'French-door refrigerators',
      'Side-by-side refrigerators',
      'Built-in refrigerator/freezer units',
    ],
    supportedNote:
      'Brand and model coverage is confirmed when you contact us. If your unit is a compact, specialty or commercial-grade model, check suitability before booking. Integrated water and ice features are assessed during the appointment.',
    faqs: [
      {
        question: 'My fridge is running but not cooling. Can that be repaired?',
        answer:
          'Often, yes. A running fridge that fails to cool can point to a range of causes that need diagnosis, from airflow and thermostat problems to more involved component issues. We confirm what is going on before recommending any repair.',
      },
      {
        question: 'Do you repair ice makers and water dispensers?',
        answer:
          'Integrated water and ice features are assessed as part of the appointment. Contact us to confirm whether your model and the specific feature are supported before booking.',
      },
      {
        question: 'What information helps you when I request a fridge repair?',
        answer:
          'A short description of the problem, the brand and approximate age of the unit if you happen to know them, and your location. You do not need a technical diagnosis — describing what the fridge is doing is enough.',
      },
    ],
  },
  {
    slug: 'washer-dryer-repair',
    id: 'washer',
    navLabel: 'Washer & Dryer Repair',
    cardTitle: 'Washer & dryer repair',
    cardImage: '/images/services/washer.webp',
    cardCopy:
      "From a washer that won't drain to a dryer that won't heat — describe what your laundry appliances are doing and request service.",
    formLabel: 'Washer or dryer',
    crumbLabel: 'Washer & Dryer Repair',
    hero: {
      kicker: 'Washer & Dryer Repair',
      title: 'Washer & Dryer Repair in Brampton and the GTA',
      subtitle:
        "From a washer that won't drain to a dryer that won't heat, tell us what's happening and request service in your area.",
      image: { id: 34397245, alt: 'Close-up view into the stainless steel drum of a modern washing machine', ratio: 'landscape' },
    },
    seo: {
      title: 'Washer & Dryer Repair in Brampton & the GTA | PAS Appliance Repair',
      description:
        'Washer not draining or dryer not heating? Request washer and dryer repair service for your Brampton or GTA home and describe the problem in your own words.',
    },
    symptomsTitle: 'Common washer & dryer problems',
    symptomsIntro:
      'Select the washer or dryer in the request form so we know which appliance needs attention. Symptoms can have several causes, and the right diagnosis comes from inspecting the unit.',
    symptomGroups: [
      { heading: 'Washer problems', icon: 'washing-machine', items: ['Not draining', 'Water leaking', 'Not spinning', 'Excessive vibration or shaking', 'Not starting'] },
      { heading: 'Dryer problems', icon: 'wind', items: ['Not heating', 'Drum not turning', 'Unusual noise', 'Not starting'] },
    ],
    supportedTitle: 'Supported washer & dryer types',
    supportedTypes: [
      'Front-load and top-load washers',
      'Electric dryers',
      'Gas dryers — confirm gas capability before booking',
    ],
    supportedNote:
      'Front-load/top-load washer and electric/gas dryer references are compatibility examples only and must be verified. Gas-dryer service is provided only where the company is equipped and qualified to work with gas.',
    feature: {
      title: 'One appliance, two machines',
      items: [
        'Choose washer or dryer directly in the request form',
        'Stacked pairs are fine — tell us which machine is affected',
        'Describe the symptom in your own words',
      ],
    },
    faqs: [
      {
        question: 'My washer spins but does not drain. What should I do?',
        answer:
          'A washer that fails to drain can have several causes that need to be checked in order — from a blocked pump filter or drain hose to pump or control issues. We inspect before recommending a repair.',
      },
      {
        question: 'Do you service gas dryers?',
        answer:
          'Gas dryer service is provided only where the company is equipped and qualified to work on gas appliances. Please confirm this before booking a gas dryer appointment.',
      },
      {
        question: 'Should I include the model number when requesting washer repair?',
        answer:
          'It can help, but it is not required. Describing the brand and the problem in your own words is enough to request service and discuss next steps.',
      },
    ],
  },
  {
    slug: 'stove-repair',
    id: 'stove',
    navLabel: 'Stove Repair',
    cardTitle: 'Stove & cooktop repair',
    cardImage: '/images/services/stove.webp',
    cardCopy:
      'Burner not heating, controls not responding or ignition trouble? Contact us to confirm your appliance type and request repair assistance.',
    formLabel: 'Stove / cooktop',
    crumbLabel: 'Stove Repair',
    hero: {
      kicker: 'Stove Repair',
      title: 'Stove & Cooktop Repair in Brampton & the GTA',
      subtitle:
        "Having trouble with a burner, heating element, or stove control? Contact us to confirm the appliance type we service and request repair assistance.",
      image: { id: 31944361, alt: 'A stainless steel gas stove with its grates and burners visible in a kitchen', ratio: 'landscape' },
    },
    seo: {
      title: 'Stove & Cooktop Repair in Brampton & the GTA | PAS Appliance Repair',
      description:
        'Burner not heating or stove controls not responding? Contact us to confirm your stove or cooktop type and request repair service in Brampton and the GTA.',
    },
    symptomsTitle: 'Common stove & cooktop problems',
    symptomsIntro:
      'Stove and cooktop issues vary by type (electric, induction or gas). Confirm the appliance type when you contact us so we can discuss what applies to your unit.',
    symptomGroups: [
      { icon: 'flame', items: ['Burner not heating', 'Heating element not warming up', 'Uneven heating across the cooking surface'] },
      { icon: 'zap', items: ['Ignition not working on gas burners', 'Controls not responding', 'Stove not starting or powering on'] },
      { icon: 'timer', items: ['Oven temperature problems', 'Oven not heating to the set temperature', 'Broiler or bake element behaving inconsistently'] },
    ],
    supportedTitle: 'Supported stove & cooktop types',
    supportedTypes: [
      'Electric stoves and cooktops',
      'Induction cooktops',
      'Gas stoves and cooktops — service capability must be confirmed',
    ],
    supportedNote:
      'Gas appliance service is only performed where the business has the required qualifications and capabilities. Confirm your appliance type (electric, induction or gas) before booking.',
    feature: {
      title: 'Safety first, asked plainly',
      items: [
        'We discuss gas versus electric before anything is booked',
        'If you smell gas or suspect a leak, follow the official gas-safety guidance and contact the gas utility emergency line before requesting a routine repair',
        'We never ask you to attempt dangerous work yourself',
      ],
      note: 'If you smell gas or suspect a leak, do not use the stove. Follow the appropriate emergency gas-safety guidance (for example, leaving the area and contacting your gas utility) before considering a routine repair appointment.',
    },
    faqs: [
      {
        question: 'Do you repair gas stoves?',
        answer:
          'Gas appliance service is performed only where the company has the required qualifications and capabilities. Please confirm the appliance type before booking a gas stove or cooktop appointment.',
      },
      {
        question: 'I smell gas near my stove. Can I book a repair?',
        answer:
          'Do not submit a routine repair request in this situation. Smelling gas is a safety matter: follow the appropriate emergency gas-safety guidance and contact your gas utility emergency line directly.',
      },
      {
        question: 'What cause makes a burner heat unevenly?',
        answer:
          'Uneven heating can come from several sources depending on the appliance type. It is diagnosed during an appointment rather than assumed from a description.',
      },
    ],
  },
  {
    slug: 'dishwasher-repair',
    id: 'dishwasher',
    navLabel: 'Dishwasher Repair',
    cardTitle: 'Dishwasher repair',
    cardImage: '/images/services/dishwasher.webp',
    cardCopy:
      "Not draining, leaking or leaving dishes dirty? Tell us what your dishwasher is doing and request service in your area.",
    formLabel: 'Dishwasher',
    crumbLabel: 'Dishwasher Repair',
    hero: {
      kicker: 'Dishwasher Repair',
      title: 'Dishwasher Repair in Brampton & the GTA',
      subtitle:
        "If your dishwasher isn't draining, is leaking, or isn't cleaning dishes properly, tell us what's happening and request service in your area.",
      image: { id: 21620201, alt: 'An open dishwasher rack loaded with dishes inside a modern kitchen', ratio: 'landscape' },
    },
    seo: {
      title: 'Dishwasher Repair in Brampton & the GTA | PAS Appliance Repair',
      description:
        'Dishwasher not draining, leaking or leaving dishes dirty? Request dishwasher repair service for your Brampton or GTA home and describe the problem in your own words.',
    },
    symptomsTitle: 'Common dishwasher problems',
    symptomsIntro:
      'Dishwasher symptoms are diagnosed during the appointment. Please describe what the machine is doing rather than guessing at the failed part.',
    symptomGroups: [
      { icon: 'droplets', items: ['Not draining', 'Standing water at the bottom of the tub'] },
      { icon: 'droplet', items: ['Leaking water', 'Dampness around the door or under the unit'] },
      { icon: 'sparkles', items: ['Dishes not cleaning properly', 'Residue left after a full cycle'] },
      { icon: 'power', items: ['Not starting', 'No response to the start control'] },
      { icon: 'volume-2', items: ['Unusual noises during cycles', 'New grinding, thumping or squealing sounds'] },
    ],
    supportedTitle: 'Supported dishwasher types & brands',
    supportedTypes: [
      'Built-in dishwashers',
      'Front-control and top-control models',
      'Portable dishwashers where actually supported — confirm at booking',
    ],
    supportedNote:
      'Brand and model coverage is confirmed when you contact us. If you are unsure whether your unit is supported, ask before booking.',
    faqs: [
      {
        question: 'My dishwasher leaves water in the bottom. Is that normal?',
        answer:
          'Some residual water is normal and harmless. When water does not drain after a cycle at all, it can point to several causes that need diagnosis. Describing the pattern helps us plan the appointment.',
      },
      {
        question: 'Dishes are coming out cloudy. Does that need a repair?',
        answer:
          'Not always. Cloudy dishes can relate to detergent, water hardness or loading. If the cleaning quality drops consistently despite normal use, we can discuss what an inspection might reveal.',
      },
      {
        question: 'My dishwasher is loud. Should I request a repair?',
        answer:
          'New or unusual noises can be worth an inspection. Describe when the noise happens (filling, washing, draining) and we can discuss the diagnostic process.',
      },
    ],
  },
];

export const primaryServices: Service[] = services;

/** Options for the appliance-type field in the request form. */
export const applianceOptions: Array<{ value: string; label: string }> = [
  { value: '', label: 'Choose a type…' },
  { value: 'refrigerator', label: 'Refrigerator' },
  { value: 'washer', label: 'Washer' },
  { value: 'dryer', label: 'Dryer' },
  { value: 'stove', label: 'Stove / Cooktop' },
  { value: 'dishwasher', label: 'Dishwasher' },
  { value: 'other', label: 'Other / Not sure' },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceById(id: ApplianceId): Service | undefined {
  return services.find((s) => s.id === id);
}