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
    } catch (err) {
      alert("Error deleting hero");
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <h3>Delete Superhero</h3>
      <input placeholder="Hero ID to delete" value={id} onChange={e => setId(e.target.value)} />
      <button type="submit">Delete</button>
    </form>
  );
}
