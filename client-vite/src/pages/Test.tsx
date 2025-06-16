import { CreateHeroForm } from "../components/test/CreateHeroForm";
import { UpdateHeroForm } from "../components/test/UpdateHeroForm";
import { DeleteHeroForm } from "../components/test/DeleteHeroForm";
import { Header } from "../components/Header";

export function TestHeroPage() {
  return (
    <>
      <Header />
      <div style={{ padding: "2rem" }}>
        <h1>🧪 Test Superhero Operations</h1>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr 1fr" }}>
          <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <CreateHeroForm />
          </div>
          <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <UpdateHeroForm />
          </div>
          <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <DeleteHeroForm />
          </div>
        </div>
      </div>
    </>
  );
}
