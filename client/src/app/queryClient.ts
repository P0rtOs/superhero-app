import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 хвилин вважаємо дані свіжими
      gcTime: 10 * 60 * 1000,   // 10 хвилин кешуємо сторінку без запитів
      retry: 1,                    // лише одна спроба при помилці
      refetchOnWindowFocus: false, // не рефетчити при поверненні вкладки
    },
  },
});
