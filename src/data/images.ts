/**
 * Image assets.
 *
 * Remote photography is served from Pexels' CDN and resized on the fly via
 * URL parameters (web-appropriate widths, optional centre-crop). Each entry
 * is verified to resolve. Licensing: Pexels free-to-use photos — see
 * https://www.pexels.com/license/ for terms.
 *
 * To replace an image, swap the Pexels photo ID (or the whole URL via
 * `customUrl`) for the asset. Keeping them in one map makes that easy.
 */

export interface ImageAsset {
  /** Pexels photo ID used to build a resizeable CDN URL. */
  id?: number;
  /** Optional direct URL override (e.g. a locally hosted image after launch). */
  customUrl?: string;
  /** Descriptive alt text (informative, not keyword-stuffed). */
  alt: string;
  /** Preferred display ratio when the image is used with explicit sizing. */
  ratio: 'landscape' | 'portrait' | 'square';
}

const pexelsBase = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

/**
 * Build a Pexels CDN URL at a given width, optionally crop-fitted to a
 * height. Keeping this in one place makes wholesale image replacement easy.
 */
export function pexelsUrl(
  asset: ImageAsset,
  w: number,
  h?: number,
): string {
  if (asset.customUrl) return asset.customUrl;
  const p = new URLSearchParams({
    auto: 'compress',
    cs: 'tinysrgb',
    w: String(w),
  });
  if (h) {
    p.set('h', String(Math.round(h)));
    p.set('fit', 'crop');
  }
  return `${pexelsBase(asset.id!)}?${p.toString()}`;
}

/**
 * Generate a srcset string for responsive loading. `ratio` is the
 * height ÷ width of the target crop, so every entry keeps the same aspect
 * ratio regardless of the chosen width.
 */
export function pexelsSrcset(
  asset: ImageAsset,
  widths: number[],
  ratio = 2 / 3,
): string {
  return widths.map((w) => `${pexelsUrl(asset, w, Math.round(w * ratio))} ${w}w`).join(', ');
}

/** Parse a CSS aspect ratio like "3 / 2" into height ÷ width. */
export function aspectToRatio(aspect: string): number {
  const [x, y] = aspect.split('/').map((s) => parseFloat(s.trim()));
  if (!x || !y) return 1;
  return y / x;
}

export const IMAGES = {
  /** Hero: a technician working on a household appliance. */
  heroTechnician: {
    id: 38190070,
    alt: 'A repair technician in a work apron opening a household appliance to inspect it',
    ratio: 'landscape',
  } satisfies ImageAsset,

  /** Fridge repair page hero. */
  fridge: {
    id: 32391499,
    alt: 'Repair technicians working on a large refrigerator unit with its panel opened',
    ratio: 'landscape',
  } satisfies ImageAsset,

  /** Washer repair hero. */
  washer: {
    id: 19846385,
    alt: 'A white front-load washing machine next to folded beige towels in a laundry room',
    ratio: 'landscape',
  } satisfies ImageAsset,

  /** Dryer repair imagery. */
  dryer: {
    id: 36863051,
    alt: 'Laundry machines in a tidy laundromat, showing stacked washers and dryers',
    ratio: 'landscape',
  } satisfies ImageAsset,

  /** Stove / cooktop repair hero. */
  stove: {
    id: 31944361,
    alt: 'A stainless steel gas stove with its grates and burners visible in a kitchen',
    ratio: 'landscape',
  } satisfies ImageAsset,

  /** Dishwasher repair hero. */
  dishwasher: {
    id: 21620201,
    alt: 'An open dishwasher rack loaded with dishes inside a modern kitchen',
    ratio: 'landscape',
  } satisfies ImageAsset,

  /** About page — technician portrait-style image. */
  aboutTechnician: {
    id: 38709543,
    alt: 'A technician repairing a small household appliance on a workbench',
    ratio: 'portrait',
  } satisfies ImageAsset,

  /** About page — secondary workshop image. */
  aboutWorkshop: {
    id: 32588545,
    alt: 'A technician repairing an appliance component in a well-lit workshop',
    ratio: 'landscape',
  } satisfies ImageAsset,

  /** Book/contact context image. */
  kitchen: {
    id: 19980206,
    alt: 'A modern kitchen interior with fitted white cabinets and appliances',
    ratio: 'landscape',
  } satisfies ImageAsset,
};

export type ImageKey = keyof typeof IMAGES;