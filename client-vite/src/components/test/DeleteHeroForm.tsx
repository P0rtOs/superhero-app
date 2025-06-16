import React, { useState } from "react";
import api from "../../api/axiosInstance";

export function DeleteHeroForm() {
  const [id, setId] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) {
      alert("Please provide an ID");
      return;
    }

    try {
      await api.delete(`/${id}`);
      alert("Deleted successfully");
    } catch {
      alert("Error deleting hero");
    }
  };

  return (
    <form
      onSubmit={handleDelete}
      className="w-full max-w-xs mx-auto bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h3 className="text-2xl font-semibold text-center">Delete Superhero</h3>

      <input
        type="text"
        placeholder="Hero ID"
        value={id}
        onChange={e => setId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        required
      />

      <button
        type="submit"
        className="w-full bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
