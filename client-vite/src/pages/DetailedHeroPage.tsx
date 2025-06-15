import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { Superhero } from "../types/superhero";
import { DetailedHero } from "../components/DetailedHero";

export function DetailedHeroPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: hero,
    isLoading,
    error,
  } = useQuery<Superhero, Error>({
    queryKey: ["superhero", id],
    queryFn: async () => {
      const { data } = await api.get<Superhero>(`/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading hero details...</p>;
  if (error) return <p>Error loading hero: {error.message}</p>;
  if (!hero) return <p>Hero not found</p>;

  // Використовуємо компонент DetailedHero
  return <DetailedHero hero={hero} />;
}
