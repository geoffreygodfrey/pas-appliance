/**
 * Service-area communities.
 *
 * The business is based in Brampton and covers selected surrounding GTA
 * communities. Treat this list as provisional coverage to be confirmed with
 * the business — it is shared by the homepage and the /service-areas/ page.
 */

export interface ServiceArea {
  name: string;
}

export const serviceAreas: ServiceArea[] = [
  { name: 'Brampton' },
  { name: 'Mississauga' },
  { name: 'Caledon' },
  { name: 'Vaughan' },
  { name: 'Halton Hills' },
  { name: 'North York' },
  { name: 'Etobicoke' },
  { name: 'Milton' },
  { name: 'Oakville' },
  { name: 'Orangeville' },
  { name: 'Markham' },
  { name: 'Richmond Hill' },
];
