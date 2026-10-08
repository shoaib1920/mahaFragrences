import { Product, ScentQuizAnswers, ScentQuizResult } from '../types';
import { PRODUCTS } from '../data/products';

export function calculateScentMatches(answers: ScentQuizAnswers): ScentQuizResult[] {
  const scoredProducts: { product: Product; score: number; reasons: string[] }[] = PRODUCTS
    .filter(p => p.concentration.includes('Eau de Parfum'))
    .map(product => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Recipient / Gender alignment
      if (answers.recipient === 'unisex') {
        if (product.isUnisex) {
          score += 25;
          reasons.push('Unisex, so it works for either of you');
        } else {
          score += 8;
        }
      } else if (answers.recipient === 'me' || answers.recipient === 'gift') {
        score += 15;
      }

      // 2. Mood alignment
      if (answers.mood === 'mysterious' && product.id === 'mystic-fall-edp') {
        score += 30;
        reasons.push('Deep woods and violet for the smoky mood you picked');
      } else if (answers.mood === 'radiant' && product.id === 'heavenly-divine-edp') {
        score += 30;
        reasons.push('Peach and rose keep it bright and warm');
      } else if (answers.mood === 'romantic' && product.id === 'forever-crush-edp') {
        score += 30;
        reasons.push('Jasmine and black plum make it the romantic one of the range');
      } else if (answers.mood === 'fresh' && product.id === 'dusk-bleu-edp') {
        score += 30;
        reasons.push('Mint and citron make it the freshest of the range');
      } else if (answers.mood === 'confidence') {
        if (product.id === 'mystic-fall-edp' || product.id === 'heavenly-divine-edp') {
          score += 25;
          reasons.push('Polished without being loud');
        }
      }

      // 3. Scent World
      if (answers.scentWorld === 'woods' && product.family === 'Woody') {
        score += 25;
        reasons.push('Built around cedarwood and agarwood');
      } else if (answers.scentWorld === 'ocean' && product.family === 'Fresh & Aquatic') {
        score += 25;
        reasons.push('Citron, mint and fig');
      } else if (answers.scentWorld === 'gardens' && (product.family === 'Floral' || product.family === 'Fruity-Floral')) {
        score += 25;
        reasons.push('Floral heart of rose, jasmine or iris');
      } else if (answers.scentWorld === 'fruit' && product.family === 'Fruity-Floral') {
        score += 25;
        reasons.push('Opens with peach and other fruit notes');
      } else if (answers.scentWorld === 'amber') {
        score += 20;
        reasons.push('Warm amber and sandalwood in the base');
      }

      // 4. Climate / Season
      if (answers.climate === 'hot' && product.id === 'dusk-bleu-edp') {
        score += 20;
        reasons.push('Made to hold up in heat and humidity');
      } else if (answers.climate === 'cool' && product.id === 'mystic-fall-edp') {
        score += 20;
        reasons.push('Woody scents wear best in cool weather');
      } else {
        score += 10;
      }

      // 5. Intensity
      if (answers.intensity === 'statement' && product.moodMeters.projection >= 4) {
        score += 15;
        reasons.push('One of the stronger scents in the range');
      } else if (answers.intensity === 'whisper') {
        score += 10;
        reasons.push('One or two sprays keep it close to the skin');
      } else {
        score += 12;
      }

      return { product, score, reasons };
    });

  scoredProducts.sort((a, b) => b.score - a.score);

  const maxPossibleScore = 115;

  return scoredProducts.slice(0, 3).map((item, index) => {
    const normalizedPercent = Math.min(98, Math.max(82, Math.round((item.score / maxPossibleScore) * 100) - (index * 4)));

    // Matching solid perfume, if there is one
    const waxAlternative = PRODUCTS.find(p =>
      p.concentration.includes('Solid Perfume Wax') &&
      p.name.toLowerCase().includes(item.product.name.toLowerCase().split(' ')[0])
    );

    return {
      product: item.product,
      score: item.score,
      matchPercentage: normalizedPercent,
      reason: item.reasons.length > 0 ? item.reasons.join(' · ') : 'A good all-round fit for your answers.',
      entryAlternative: waxAlternative
    };
  });
}
