import React, { useState } from "react";
import api from "../../api/axiosInstance";

export function UpdateHeroForm() {
  const [id, setId] = useState("");
  const [updates, setUpdates] = useState({
    nickname: "",
    catch_phrase: "",
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) {
      alert("Provide ID");
      return;
    }

    const formData = new FormData();
    if (updates.nickname) formData.append("nickname", updates.nickname);
    if (updates.catch_phrase) formData.append("catch_phrase", updates.catch_phrase);
    if (updates.image) formData.append("image", updates.image);

    try {
      const res = await api.patch(`/${id}`, formData);
      alert("Updated successfully");
      console.log(res.data);
    } catch (err) {
      alert("Error updating hero");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Superhero</h3>
      <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
      <input placeholder="New Nickname" value={updates.nickname} onChange={e => setUpdates({ ...updates, nickname: e.target.value })} />
      <input placeholder="New Catch Phrase" value={updates.catch_phrase} onChange={e => setUpdates({ ...updates, catch_phrase: e.target.value })} />
      <input type="file" accept="image/*" onChange={e => setUpdates({ ...updates, image: e.target.files?.[0] || null })} />
      <button type="submit">Update</button>
    </form>
  );
}
