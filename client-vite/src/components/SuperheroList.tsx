import React from 'react';
import { useNavigate } from 'react-router';
import { useSuperheroes } from '../hooks/useSuperheroes';
import { getHeroImage } from '../utils/getSuperheroImage';
import type { SuperheroListItem } from '../types/superhero';

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
      window.open(`/hero/${id}`, '_blank'); // Відкриває в новій вкладці
    } else {
      navigate(`/hero/${id}`); // Перехід в поточній вкладці
    }
  };

  // 🔻 Винесений компонент HeroCard
  function HeroCard({ hero }: { hero: SuperheroListItem }) {
    const [src, setSrc] = React.useState(getHeroImage(hero.nickname));

    return (
      <div
        key={hero.id}
        onClick={(e) => handleClick(hero.id, e)}
        style={{
          border: '1px solid #ccc',
          margin: 8,
          padding: 8,
          cursor: 'pointer',
        }}
      >
        <img
          src={src}
          alt={hero.nickname}
          width={100}
          onError={() => setSrc('/images/default.png')}
        />
        <p>{hero.nickname}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Superheroes</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>}

      {data?.pages.map((page, pageIndex) =>
        page.map(hero => <HeroCard key={hero.id} hero={hero} />)
      )}

      {isFetchingNextPage && <p>Loading more...</p>}

      {!isFetchingNextPage && hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}

      {!hasNextPage && !isLoading && <p>No more superheroes to load.</p>}
    </div>
  );
}
