import { SimpleSuperheroList } from "../components/SuperheroList";
import { Header } from "../components/Header";

export function HomePage() {
  return (
    <>
      <Header />
      <div>
        <h2 className="text-3xl font-semibold text-center uppercase mb-6">Superheroes Cards</h2>
        <SimpleSuperheroList />
      </div>
    </>
  );
}
