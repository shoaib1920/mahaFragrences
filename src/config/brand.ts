// Contact details left empty are hidden across the site.
export const BRAND = {
  name: 'Maha Fragrances',
  shortName: 'Maha',
  // Digits only, with country code, e.g. '923001234567'
  whatsapp: '',
  email: '',
  instagram: '',
  facebook: '',
  youtube: '',
  // e.g. ['Karachi Studio, Clifton']
  studios: [] as string[],
};

export const whatsappUrl = BRAND.whatsapp ? `https://wa.me/${BRAND.whatsapp}` : '';

export const whatsappDisplay = BRAND.whatsapp
  ? `+${BRAND.whatsapp.slice(0, 2)} ${BRAND.whatsapp.slice(2, 5)} ${BRAND.whatsapp.slice(5)}`
  : '';
