import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { Superhero } from "../types/superhero";
import { DetailedHero } from "../components/DetailedHero";
import { UpdateHeroForm } from "../components/UpdateHero";
import { Header } from "../components/Header";

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

  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full">
        {/* Ліва частина - детальна інформація */}
        <div className="w-1/2 overflow-auto p-6 bg-white">
          <DetailedHero hero={hero} />
        </div>

        {/* Права частина - форма оновлення */}
        <div className="w-1/2 overflow-auto p-6 bg-gray-50 border-l border-gray-300">
          <UpdateHeroForm id={hero.id} />
        </div>
      </div>
    </>
  );
}
