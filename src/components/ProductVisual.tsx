import React, { useId } from 'react';
import { Product } from '../types';

const CREAM = '#F3E9D8';
const INK = '#251e1a';

interface ArtProps {
  liquid: string;
  uid: string;
}

const Defs: React.FC<ArtProps> = ({ liquid, uid }) => (
  <defs>
    <linearGradient id={`${uid}-cap`} x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stopColor="#7A5B2C" />
      <stop offset="0.28" stopColor="#F4DFB2" />
      <stop offset="0.5" stopColor="#C9A15C" />
      <stop offset="0.78" stopColor="#E7CB93" />
      <stop offset="1" stopColor="#6E5126" />
    </linearGradient>
    <linearGradient id={`${uid}-liq`} x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stopColor={liquid} stopOpacity="0.98" />
      <stop offset="0.55" stopColor={liquid} stopOpacity="0.82" />
      <stop offset="1" stopColor={liquid} stopOpacity="0.62" />
    </linearGradient>
    <linearGradient id={`${uid}-shine`} x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stopColor="#fff" stopOpacity="0.4" />
      <stop offset="1" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
    <linearGradient id={`${uid}-glass`} x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
      <stop offset="1" stopColor="#fff" stopOpacity="0.08" />
    </linearGradient>
  </defs>
);

const Label: React.FC<{ x: number; y: number; w: number; h: number; sub?: string }> = ({ x, y, w, h, sub }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={CREAM} />
    <rect x={x + 2.5} y={y + 2.5} width={w - 5} height={h - 5} fill="none" stroke="#B8935A" strokeWidth="0.6" />
    <text x={x + w / 2} y={y + h / 2 - 1} textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize={w * 0.24} fill={INK} letterSpacing="1.5">
      MAHA
    </text>
    <text x={x + w / 2} y={y + h / 2 + w * 0.11} textAnchor="middle" fontFamily="Jost, sans-serif" fontSize={w * 0.065} fill={INK} letterSpacing="1.2">
      FRAGRANCES
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h - 7} textAnchor="middle" fontFamily="Jost, sans-serif" fontSize={w * 0.05} fill="#6B5637" letterSpacing="0.8">
        {sub}
      </text>
    )}
  </g>
);

const BottleArt: React.FC<ArtProps & { slim?: boolean; sub?: string }> = ({ liquid, uid, slim, sub = 'EAU DE PARFUM' }) => {
  const bw = slim ? 78 : 128;
  const bx = 100 - bw / 2;
  const by = slim ? 62 : 76;
  const bh = slim ? 178 : 162;
  const capW = slim ? 30 : 48;
  const capH = slim ? 38 : 46;
  const capY = by - capH - 14;
  const wall = 7;
  return (
    <>
      <Defs liquid={liquid} uid={uid} />
      <ellipse cx="100" cy={by + bh + 5} rx={bw * 0.6} ry="6" fill="#000" opacity="0.4" />

      {/* cap */}
      <rect x={100 - capW / 2} y={capY} width={capW} height={capH} rx="3.5" fill={`url(#${uid}-cap)`} />
      {Array.from({ length: slim ? 4 : 7 }).map((_, i) => (
        <line
          key={i}
          x1={100 - capW / 2 + ((i + 1) * capW) / ((slim ? 4 : 7) + 1)}
          x2={100 - capW / 2 + ((i + 1) * capW) / ((slim ? 4 : 7) + 1)}
          y1={capY + 3}
          y2={capY + capH - 3}
          stroke="#5E4520"
          strokeOpacity="0.35"
          strokeWidth="0.7"
        />
      ))}
      <rect x={100 - capW / 2} y={capY} width={capW} height="3" rx="1.5" fill="#fff" opacity="0.35" />
      <rect x={100 - capW / 2 + 6} y={by - 14} width={capW - 12} height="9" fill="#8C6B34" />
      <rect x={100 - capW / 2 + 2} y={by - 6} width={capW - 4} height="6" rx="1.5" fill={`url(#${uid}-cap)`} />

      {/* glass and liquid */}
      <rect x={bx} y={by} width={bw} height={bh} rx="12" fill={`url(#${uid}-glass)`} stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2" />
      <rect x={bx + wall} y={by + wall + 3} width={bw - wall * 2} height={bh - wall * 2 - 3} rx="6" fill={`url(#${uid}-liq)`} />
      <rect x={bx + wall} y={by + wall + 3} width={bw - wall * 2} height="2.5" rx="1" fill="#fff" opacity="0.3" />
      <rect x={bx + wall + 4} y={by + wall + 10} width={bw * 0.09} height={bh - wall * 2 - 24} rx="4" fill={`url(#${uid}-shine)`} />
      <rect x={bx + bw - wall - 6} y={by + wall + 14} width="1.6" height={bh - wall * 2 - 34} rx="0.8" fill="#fff" opacity="0.22" />

      <Label x={100 - bw * 0.26} y={by + bh * 0.27} w={bw * 0.52} h={bh * 0.46} sub={sub} />
    </>
  );
};

const TinArt: React.FC<ArtProps> = ({ liquid, uid }) => (
  <>
    <Defs liquid={liquid} uid={uid} />
    <ellipse cx="100" cy="218" rx="74" ry="8" fill="#000" opacity="0.35" />
    <circle cx="100" cy="134" r="78" fill={`url(#${uid}-cap)`} />
    <circle cx="100" cy="134" r="68" fill={liquid} opacity="0.55" />
    <circle cx="100" cy="134" r="68" fill="none" stroke="#fff" strokeOpacity="0.3" />
    <circle cx="100" cy="134" r="44" fill={CREAM} />
    <circle cx="100" cy="134" r="40" fill="none" stroke="#B8935A" strokeWidth="0.6" />
    <text x="100" y="136" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="19" fill={INK} letterSpacing="1.5">MAHA</text>
    <text x="100" y="147" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="4.6" fill={INK} letterSpacing="1.1">SOLID PERFUME</text>
  </>
);

const CandleArt: React.FC<ArtProps> = ({ liquid, uid }) => (
  <>
    <Defs liquid={liquid} uid={uid} />
    <ellipse cx="100" cy="240" rx="72" ry="7" fill="#000" opacity="0.35" />
    <path d="M100 38 C108 52 112 60 100 74 C88 60 92 52 100 38Z" fill="#F6C56A" />
    <path d="M100 52 C104 60 105 64 100 72 C95 64 96 60 100 52Z" fill="#FFF3D0" />
    <rect x="99" y="72" width="2" height="16" fill="#3A2A1A" />
    <rect x="42" y="88" width="116" height="148" rx="8" fill="#5A3A1C" opacity="0.9" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
    <rect x="42" y="88" width="116" height="20" rx="8" fill={liquid} opacity="0.55" />
    <rect x="50" y="96" width="12" height="132" rx="4" fill={`url(#${uid}-shine)`} />
    <Label x={66} y={128} w={68} h={74} sub="SCENTED CANDLE" />
  </>
);

const BoxArt: React.FC<ArtProps> = ({ liquid }) => (
  <>
    <ellipse cx="100" cy="236" rx="82" ry="7" fill="#000" opacity="0.35" />
    <rect x="28" y="92" width="144" height="140" rx="4" fill={INK} stroke="#B8935A" strokeWidth="1" />
    <rect x="22" y="70" width="156" height="34" rx="4" fill="#241A12" stroke="#B8935A" strokeWidth="1" />
    <rect x="92" y="70" width="16" height="162" fill={liquid} opacity="0.85" />
    <path d="M100 70 C80 40 56 50 74 68 Z M100 70 C120 40 144 50 126 68 Z" fill={liquid} opacity="0.85" />
    <text x="64" y="172" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="15" fill="#e5c497" letterSpacing="1.5">MAHA</text>
  </>
);

const TrioArt: React.FC<{ uid: string }> = ({ uid }) => (
  <>
    {['#4B2E5E', '#F0C9B8', '#E8B4C0'].map((c, i) => (
      <g key={c} transform={`translate(${i * 56 - 56} 0) scale(0.62) translate(61 150)`}>
        <BottleArt liquid={c} uid={`${uid}-${i}`} slim sub="15ML" />
      </g>
    ))}
  </>
);

interface ProductVisualProps {
  product: Product;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ product, className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const liquid = product.accentTheme.primary;
  const type = product.concentration;

  if (product.image) {
    return (
      <div className={`relative overflow-hidden bg-[#211a16] ${className}`}>
        <img src={product.image} alt={product.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    );
  }

  let art: React.ReactNode;
  if (type === 'Solid Perfume Wax') art = <TinArt liquid={liquid} uid={uid} />;
  else if (type === 'Home Fragrance') art = <CandleArt liquid={liquid} uid={uid} />;
  else if (type === 'Hair Mist') art = <BottleArt liquid={liquid} uid={uid} slim sub="HAIR MIST" />;
  else if (type === 'Gift Set') art = <BoxArt liquid={liquid} uid={uid} />;
  else if (type === 'Eau de Parfum Gift Set') art = <TrioArt uid={uid} />;
  else art = <BottleArt liquid={liquid} uid={uid} />;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 62%, ${product.accentTheme.secondary}66 0%, ${product.accentTheme.primary}26 48%, #251e1a 100%)`
      }}
    >
      <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full px-[5%] pt-[15%] pb-[5%]" role="img" aria-label={product.name}>
        {art}
      </svg>
    </div>
  );
};

/* Large bottle used in the hero */
export const HeroBottle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
      <BottleArt liquid="#B8691F" uid={uid} />
    </svg>
  );
};
