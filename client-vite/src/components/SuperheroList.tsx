import React from "react";
import { useNavigate } from "react-router-dom";
import { useSuperheroes } from "../hooks/useSuperheroes";
import type { SuperheroListItem } from "../types/superhero";
import { getHeroImageSources } from "../utils/getSuperheroImage";

export function SimpleSuperheroList() {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useSuperheroes();

  const handleClick = (id: number, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(`/hero/${id}`, "_blank");
    } else {
      navigate(`/hero/${id}`);
    }
  };

  function HeroCard({ hero }: { hero: SuperheroListItem }) {
    // Тепер використовуємо hero.image
    const sources = getHeroImageSources(hero.nickname, hero.image);
    const [srcIndex, setSrcIndex] = React.useState(0);

    const handleError = () => {
      if (srcIndex < sources.length - 1) {
        setSrcIndex((i) => i + 1);
      }
    };

    return (
      <div
        key={hero.id}
        onClick={(e) => handleClick(hero.id, e)}
        style={{
          border: "1px solid #ccc",
          margin: 8,
          padding: 8,
          cursor: "pointer",
        }}
      >
        <img
          src={sources[srcIndex]}
          alt={hero.nickname}
          width={100}
          onError={handleError}
        />
        <p>{hero.nickname}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Superheroes</h2>

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p style={{ color: "red" }}>Error: {(error as Error).message}</p>
      )}

      {data?.pages.map((page) =>
        page.map((hero) => <HeroCard key={hero.id} hero={hero} />)
      )}

      {isFetchingNextPage && <p>Loading more...</p>}

      {!isFetchingNextPage && hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}

      {!hasNextPage && !isLoading && <p>No more superheroes to load.</p>}
    </div>
  );
}
