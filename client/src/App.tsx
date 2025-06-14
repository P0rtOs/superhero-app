import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
