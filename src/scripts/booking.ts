/**
 * Booking request boundary.
 *
 * The form UI calls `submitBookingRequest` exclusively. Wiring up a real
 * backend later means editing this file only, not the form markup.
 */

export interface BookingRequest {
  name: string;
  phone: string;
  email: string;
  applianceType: string;
  city: string;
  preferredWindow: string;
  description: string;
}

export type BookingField = keyof BookingRequest;
export type FieldErrors = Partial<Record<BookingField, string>>;

export function validateBooking(data: BookingRequest): FieldErrors {
  const errors: FieldErrors = {};
  const name = data.name.trim();
  const phone = data.phone.trim();
  const email = data.email.trim();
  const city = data.city.trim();
  const description = data.description.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Please enter your full name.';

  const phoneDigits = (phone.match(/\d/g) ?? []).length;
  if (!phone) errors.phone = 'Please enter a phone number.';
  else if (phoneDigits < 7)
    errors.phone = 'Please enter a valid phone number (at least 7 digits).';

  if (!data.applianceType) errors.applianceType = 'Please choose the appliance that needs attention.';

  if (!city) errors.city = 'Please enter your city or postal code.';

  if (!description) errors.description = 'Please describe the problem briefly.';
  else if (description.length < 10)
    errors.description = 'Please add a few more details (at least 10 characters).';

  if (email) {
    // Pragmatic email shape check — no need for a strict RFC regex here.
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!re.test(email)) errors.email = 'Please enter a valid email address.';
  }

  return errors;
}

/**
 * Submit a booking request.
 *
 * Acknowledges the request so the form can show its confirmation state.
 * Replace the body with a real POST to an endpoint and handle failure
 * responses here.
 */
export async function submitBookingRequest(
  data: BookingRequest,
): Promise<{ ok: boolean }> {
  void data;
  await new Promise((resolve) => setTimeout(resolve, 650));
  return { ok: true };
}
