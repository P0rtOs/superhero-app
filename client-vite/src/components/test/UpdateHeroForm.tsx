import React, { useState } from "react";
import api from "../../api/axiosInstance";

export function UpdateHeroForm() {
  const [id, setId] = useState("");
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
    if (!id.trim()) {
      alert("Please provide an ID");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image") {
        if (value) formData.append("image", value);
      } else if (typeof value === "string" && value.trim()) {
        formData.append(key, value);
      }
    });

    if ([...formData.keys()].length === 0) {
      alert("No changes to submit");
      return;
    }

    try {
      await api.patch(`/${id}`, formData);
      alert("Updated successfully");
      console.log("PATCH /" + id, formData);
    } catch {
      alert("Error updating hero");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h3 className="text-2xl font-semibold text-center">Update Superhero</h3>

      <input
        type="text"
        placeholder="Hero ID *"
        value={id}
        onChange={e => setId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <input
        type="text"
        placeholder="New Nickname"
        value={form.nickname}
        onChange={e => setForm({ ...form, nickname: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        placeholder="New Real Name"
        value={form.real_name}
        onChange={e => setForm({ ...form, real_name: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        placeholder="New Origin Description"
        value={form.origin_description}
        onChange={e => setForm({ ...form, origin_description: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        placeholder="New Superpowers (comma separated)"
        value={form.superpowers}
        onChange={e => setForm({ ...form, superpowers: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        placeholder="New Catch Phrase"
        value={form.catch_phrase}
        onChange={e => setForm({ ...form, catch_phrase: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div>
        <input
          id="update-image"
          type="file"
          accept="image/*"
          onChange={e => setForm({ ...form, image: e.target.files?.[0] || null })}
          className="hidden"
        />
        <label
          htmlFor="update-image"
          className="inline-block w-full text-center bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition-colors"
        >
          {form.image ? form.image.name : "Choose New Image"}
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 transition-colors"
      >
        Update
      </button>
    </form>
  );
}
