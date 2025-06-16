import { CreateHeroForm } from "../components/CreateHeroForm";
import { Header } from "../components/Header";

export function CreateHeroPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Own Hero</h1>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow">
            <CreateHeroForm />
          </div>
        </div>
      </div>
    </>
  );
}
