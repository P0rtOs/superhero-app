//Було створено для інфініт скрола, але я його прибрав бо він не гарний для нашого варіанту


import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import type { SuperheroListItem } from "../types/superhero";

const PAGE_SIZE = 5;

export function useSuperheroes() {
  return useInfiniteQuery<SuperheroListItem[], Error>({
    queryKey: ["superheroes"],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get<SuperheroListItem[]>(
        `/paginated/quick/${pageParam}`
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },
    placeholderData: (previousData) => previousData,
    retry: 1,
  });
}
