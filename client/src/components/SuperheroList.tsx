import React from 'react';
import { useNavigate } from 'react-router';
import { useSuperheroes } from '../hooks/useSuperheroes';

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

  return (
    <div>
      <h2>Superheroes</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>}

      {data?.pages.map((page, pageIndex) =>
        page.map(hero => (
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
            <img src={hero.image} alt={hero.nickname} width={100} />
            <p>{hero.nickname}</p>
          </div>
        ))
      )}

      {isFetchingNextPage && <p>Loading more...</p>}

      {!isFetchingNextPage && hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}

      {!hasNextPage && !isLoading && <p>No more superheroes to load.</p>}
    </div>
  );
}
