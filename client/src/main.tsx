import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ якщо ти використовуєш createRoot
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/queryClient';
import { BrowserRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* ⬅️ Ось це головне */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
