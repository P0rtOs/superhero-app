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
    <div className="flex min-h-screen w-full">
      {/* Ліва частина: інформація про героя */}
      <div className="w-1/2 max-w-[50vw] p-8 flex flex-col items-center bg-gray-50 overflow-auto">
        <h2 className="text-4xl font-bold mb-6">{hero.nickname}</h2>

        <img
          src={sources[srcIndex]}
          alt={hero.nickname}
          className="w-full max-w-md rounded-lg object-cover mb-6"
          onError={handleError}
        />

        <p className="mb-2 text-lg"><strong>Real name:</strong> {hero.real_name}</p>
        <p className="mb-2 text-lg"><strong>Origin description:</strong> {hero.origin_description}</p>
        <p className="mb-2 text-lg"><strong>Superpowers:</strong> {hero.superpowers.join(', ')}</p>
        <p className="mb-2 text-lg"><strong>Catch phrase:</strong> "{hero.catch_phrase}"</p>
      </div>

      {/* Права частина: зміна/видалення героя */}
      <div className="w-1/2 max-w-[50vw] p-8 bg-gray-100 overflow-auto">
      </div>
    </div>
  );
};
