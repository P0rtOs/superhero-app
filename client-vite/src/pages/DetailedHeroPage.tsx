import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import type { Superhero } from '../types/superhero';

export function DetailedHeroPage() {
  const { id } = useParams<{ id: string }>();

  const { data: hero, isLoading, error } = useQuery<Superhero, Error>({
    queryKey: ['superhero', id],
    queryFn: async () => {
      const { data } = await api.get<Superhero>(`/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading hero details...</p>;
  if (error) return <p>Error loading hero: {error.message}</p>;
  if (!hero) return <p>Hero not found</p>;

  return (
    <div>
      <h1>{hero.nickname}</h1>
      <p><b>Real name:</b> {hero.real_name}</p>
      <p><b>Description:</b> {hero.origin_description}</p>
      <p><b>Superpowers:</b> {hero.superpowers.join(', ')}</p>
      <p><b>Catch phrase:</b> {hero.catch_phrase}</p>
      <div>
        {hero.images.map((img, i) => (
          <img key={i} src={img} alt={`${hero.nickname} image ${i + 1}`} width={150} style={{ marginRight: 8 }} />
        ))}
      </div>
    </div>
  );
}
