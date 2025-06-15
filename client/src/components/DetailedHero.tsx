import React from 'react';
import type { Superhero } from '../types/superhero';

interface DetailedHeroProps {
  hero: Superhero;
}

export const DetailedHero: React.FC<DetailedHeroProps> = ({ hero }) => {
  return (
    <div>
      <h2>{hero.nickname}</h2>

      {hero.images.length > 0 && (
        <img src={hero.images[0]} alt={hero.nickname} width={200} />
      )}

      <p><strong>Real name:</strong> {hero.real_name}</p>
      <p><strong>Origin description:</strong> {hero.origin_description}</p>
      <p><strong>Superpowers:</strong> {hero.superpowers.join(', ')}</p>
      <p><strong>Catch phrase:</strong> "{hero.catch_phrase}"</p>
    </div>
  );
};
