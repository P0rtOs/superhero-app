import React, { useState } from "react";
import api from "../../api/axiosInstance";

export function CreateHeroForm() {
  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nickname || !form.real_name || !form.superpowers || !form.image) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && value) {
        formData.append("image", value);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const res = await api.post("/", formData);
      alert("Created successfully");
      console.log(res.data);
    } catch (err) {
      alert("Error creating hero");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Superhero</h3>
      <input placeholder="Nickname" value={form.nickname} onChange={e => setForm({ ...form, nickname: e.target.value })} />
      <input placeholder="Real Name" value={form.real_name} onChange={e => setForm({ ...form, real_name: e.target.value })} />
      <textarea placeholder="Origin Description" value={form.origin_description} onChange={e => setForm({ ...form, origin_description: e.target.value })} />
      <input placeholder="Superpowers" value={form.superpowers} onChange={e => setForm({ ...form, superpowers: e.target.value })} />
      <input placeholder="Catch Phrase" value={form.catch_phrase} onChange={e => setForm({ ...form, catch_phrase: e.target.value })} />
      <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files?.[0] || null })} />
      <button type="submit">Create</button>
    </form>
  );
}
