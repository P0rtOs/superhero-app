import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { SuperheroListItem } from "../types/superhero";
import { getHeroImageSources } from "../utils/getSuperheroImage";

export function SimpleSuperheroList() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);

  const { data: heroes, isLoading, isError, error } = useQuery<
    SuperheroListItem[],
    Error
  >({
    queryKey: ["superheroes", page],
    queryFn: () => api.get(`/paginated/quick/${page}`).then(r => r.data),
  });

  const { data: totalPages } = useQuery<number, Error>({
    queryKey: ["superheroes", "pagesAmount"],
    queryFn: async () => (await api.get("/pages/total")).data.total,
  });

  if (isLoading)
    return <p className="text-center text-lg py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">
        Error: {error!.message}
      </p>
    );

  function HeroCard({ hero }: { hero: SuperheroListItem }) {
    const sources = getHeroImageSources(hero.nickname, hero.image);
    const [srcIndex, setSrcIndex] = React.useState(0);
    const handleError = () => {
      if (srcIndex < sources.length - 1) setSrcIndex(i => i + 1);
    };

    return (
      <div
        className="w-80 bg-gray-200 rounded-lg shadow m-4 cursor-pointer transform hover:scale-105 transition-transform duration-150 overflow-hidden"
        onClick={e => {
          if (e.ctrlKey || e.metaKey)
            window.open(`/hero/${hero.id}`, "_blank");
          else navigate(`/hero/${hero.id}`);
        }}
      >
        <div className="w-full h-96 bg-gray-300 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={sources[srcIndex]}
            onError={handleError}
            alt={hero.nickname}
          />
        </div>
        <div className="bg-gray-200 px-4 py-3">
          <p className="text-center text-xl font-semibold">
            {hero.nickname}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">

      <div className="flex flex-wrap justify-center">
        {heroes!.map(h => (
          <HeroCard key={h.id} hero={h} />
        ))}
      </div>

      <div className="mt-8 flex justify-center space-x-3">
        {Array.from({ length: totalPages! }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            disabled={p === page}
            className={`
              px-4 py-2 border rounded-lg text-lg
              ${p === page
                ? "bg-blue-500 text-white cursor-default border-blue-500"
                : "bg-white text-blue-500 hover:bg-blue-100 cursor-pointer"
              }
            `}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
