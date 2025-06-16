import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { SuperheroListItem } from "../types/superhero";
import { getHeroImageSources } from "../utils/getSuperheroImage";

const PAGE_SIZE = 5;

export function SimpleSuperheroList() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);

  // 1) Завантажуємо саме героїв сторінки
  const { data: heroes, isLoading, isError, error } = useQuery<
    SuperheroListItem[],
    Error
  >({
    queryKey: ["superheroes", page],
    queryFn: () => api.get(`/paginated/${page}`).then(r => r.data)
  });

  // 2) Завантажуємо кількість сторінок
  const { data: totalPages } = useQuery<number, Error>({
    queryKey: ["superheroes", "pagesAmount"],
    queryFn: async () => (await api.get("/pages/total")).data.pages,
  });


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p style={{color: 'red'}}>Error: {error!.message}</p>;

  // Рендер карток
  function HeroCard({ hero }: { hero: SuperheroListItem }) {
    const sources = getHeroImageSources(hero.nickname, hero.images);
    const [srcIndex, setSrcIndex] = React.useState(0);
    const handleError = () => {
      if (srcIndex < sources.length - 1) setSrcIndex(i => i + 1);
    };
    return (
      <div
        onClick={e => {
          if (e.ctrlKey||e.metaKey) window.open(`/hero/${hero.id}`,"_blank");
          else navigate(`/hero/${hero.id}`);
        }}
        style={{ display: 'inline-block', margin: 8, cursor: 'pointer' }}
      >
        <img src={sources[srcIndex]} onError={handleError} width={100} alt={hero.nickname}/>
        <p>{hero.nickname}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Superheroes (Page {page} of {totalPages})</h2>

      <div>
        {heroes!.map(h => <HeroCard key={h.id} hero={h} />)}
      </div>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        {Array.from({ length: totalPages! }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            disabled={p === page}
            style={{
              margin: '0 4px',
              backgroundColor: p === page ? '#ddd' : '#fff',
              cursor: p === page ? 'default' : 'pointer',
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
