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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h3 className="text-2xl font-semibold text-center">Create Superhero</h3>

      <input
        type="text"
        placeholder="Nickname *"
        value={form.nickname}
        onChange={e => setForm({ ...form, nickname: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <input
        type="text"
        placeholder="Real Name *"
        value={form.real_name}
        onChange={e => setForm({ ...form, real_name: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <textarea
        placeholder="Origin Description"
        value={form.origin_description}
        onChange={e => setForm({ ...form, origin_description: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        placeholder="Superpowers (comma separated) *"
        value={form.superpowers}
        onChange={e => setForm({ ...form, superpowers: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <input
        type="text"
        placeholder="Catch Phrase"
        value={form.catch_phrase}
        onChange={e => setForm({ ...form, catch_phrase: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div>
        <input
          id="create-file-input"
          type="file"
          accept="image/*"
          onChange={e => setForm({ ...form, image: e.target.files?.[0] || null })}
          className="hidden"
          required
        />
        <label
          htmlFor="create-file-input"
          className="inline-block w-full text-center bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition-colors"
        >
          {form.image ? form.image.name : "Choose Image *"}
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 transition-colors"
      >
        Create
      </button>
    </form>
  );
}
