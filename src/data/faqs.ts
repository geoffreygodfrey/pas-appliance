/**
 * Frequently asked questions — homepage and other general contexts.
 * Per-service FAQs live alongside each service in src/data/services.ts.
 */

export interface Faq {
  question: string;
  answer: string;
}

export const generalFaqs: Faq[] = [
  {
    question: 'Which appliances can I request service for?',
    answer:
      'We cover refrigerator, washer, dryer, stove/cooktop and dishwasher repair. If your appliance type is not listed, choose “Other / Not sure” in the request form and describe it — availability is confirmed when you contact us.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We’re based in Brampton and serve Brampton plus selected surrounding GTA communities — including Mississauga, Caledon, Vaughan, Milton, Oakville, North York, Etobicoke, Halton Hills, Orangeville, Markham and Richmond Hill. Coverage is provisional and confirmed for your specific address when you request service.',
  },
  {
    question: 'How do I request an appointment?',
    answer:
      'Submit the Book a Repair form with your name, a phone number, your appliance type, your city or postal code and a short description of the problem. The business will contact you to discuss availability and next steps. You can also call during opening hours.',
  },
  {
    question: 'How are diagnostic fees and repair estimates handled?',
    answer:
      'The applicable diagnostic process, related fees and any repair estimate are explained and confirmed with you before repair work proceeds. Please contact the business to discuss the current diagnostic fee and how it applies.',
  },
  {
    question: 'Which appliance brands do you service?',
    answer:
      'Brand and model coverage is confirmed when you contact us. Add the brand to your request if you know it — including the model can speed things up, but it is never required.',
  },
  {
    question: 'What information should I provide when requesting a repair?',
    answer:
      'A name, a phone number, the appliance type, your city or postal code and a plain description of the problem. No technical diagnosis is required — describing what the appliance is doing is enough.',
  },
];

export const bookingFaqs: Faq[] = [
  {
    question: 'Does submitting this form book an appointment?',
    answer:
      'Submitting the form sends us a repair request. It does not automatically lock in an appointment — we follow up by phone to confirm the details and arrange a visit that works for you.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:
      'We review your request and contact you to confirm coverage, discuss the diagnostic process and arrange a time to come out.',
  },
  {
    question: 'Is the preferred appointment window a confirmed time?',
    answer:
      'No — the preferred window is a preference you share to help plan. The actual appointment time is confirmed with you before any visit.',
  },
];