import React from 'react';
import type { Superhero } from '../types/superhero';
import { getHeroImageSources } from "../utils/getSuperheroImage";

interface DetailedHeroProps {
  hero: Superhero;
}

export const DetailedHero: React.FC<DetailedHeroProps> = ({ hero }) => {
  const sources = getHeroImageSources(hero.nickname, hero.images?.[0]);
  const [srcIndex, setSrcIndex] = React.useState(0);

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(srcIndex + 1);
    }
  };

  return (
    <div>
      <h2>{hero.nickname}</h2>

      <img
        src={sources[srcIndex]}
        alt={hero.nickname}
        width={100}
        onError={handleError}
      />

      <p><strong>Real name:</strong> {hero.real_name}</p>
      <p><strong>Origin description:</strong> {hero.origin_description}</p>
      <p><strong>Superpowers:</strong> {hero.superpowers.join(', ')}</p>
      <p><strong>Catch phrase:</strong> "{hero.catch_phrase}"</p>
    </div>
  );
};
