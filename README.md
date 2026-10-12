# Maha Fragrances

Storefront for Maha Fragrances. React, TypeScript, Vite and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Where things live

- `src/config/brand.ts`: brand name, WhatsApp number, email, social links, studio locations
- `src/data/products.ts`: catalogue, prices and delivery estimates
- `src/data/journal.ts`: journal articles (English and Urdu)
- `src/data/notes.ts`: notes library

## Images

- `public/images/maha-*.jpg`: the bottle photos used in the hero, the philosophy section and the four perfume cards. Set a product's photo with the `image` field in `src/data/products.ts`.
- Products without a photo fall back to a drawn bottle from `src/components/ProductVisual.tsx`.
