import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DetailedHeroPage } from './pages/DetailedHeroPage';
import { TestHeroPage } from "./pages/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hero/:id" element={<DetailedHeroPage />} />
      <Route path="/test-heroes" element={<TestHeroPage />} />
    </Routes>
  );
}

export default App;
