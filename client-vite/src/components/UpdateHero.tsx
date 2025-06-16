import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

interface UpdateHeroFormProps {
  id: number;
}

export function UpdateHeroForm({ id }: UpdateHeroFormProps) {
  const [updates, setUpdates] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    image: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(updates).forEach(([key, value]) => {
      if (value == null) return;
      if (typeof value === "string" && !value.trim()) return;
      formData.append(key, value as Blob | string);
    });

    if ([...formData.keys()].length === 0) {
      alert("No changes to submit");
      return;
    }

    try {
      await api.patch(`/${id}`, formData);
      alert("Updated successfully");
      window.location.reload();
    } catch {
      alert("Error updating hero");
    }
  };

  function DeleteHero({ id }: { id: number }) {
    const navigate = useNavigate();
    const handleDelete = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await api.delete(`/${id}`);
        alert("Deleted successfully");
        navigate("/");
        window.location.reload();
      } catch {
        alert("Error deleting hero");
      }
    };
    return (
      <form onSubmit={handleDelete} className="mt-6">
        <button
          type="submit"
          className="w-full bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition-colors"
        >
          Delete Hero
        </button>
      </form>
    );
  }

  return (
    <div className="w-1/2 max-w-[50vw] p-8 bg-gray-100 flex flex-col space-y-4 overflow-auto">
      <h3 className="text-2xl font-semibold">Update Superhero</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="New Nickname"
          value={updates.nickname}
          onChange={e =>
            setUpdates({ ...updates, nickname: e.target.value })
          }
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="New Real Name"
          value={updates.real_name}
          onChange={e =>
            setUpdates({ ...updates, real_name: e.target.value })
          }
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          placeholder="New Origin Description"
          value={updates.origin_description}
          onChange={e =>
            setUpdates({ ...updates, origin_description: e.target.value })
          }
          className="border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="New Superpowers (comma separated)"
          value={updates.superpowers}
          onChange={e =>
            setUpdates({ ...updates, superpowers: e.target.value })
          }
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="New Catch Phrase"
          value={updates.catch_phrase}
          onChange={e =>
            setUpdates({ ...updates, catch_phrase: e.target.value })
          }
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={e =>
              setUpdates({ ...updates, image: e.target.files?.[0] || null })
            }
            className="hidden"
          />
          <label
            htmlFor="file-input"
            className="
              inline-flex items-center justify-center
              w-full px-4 py-2 bg-green-600 text-white rounded
              cursor-pointer hover:bg-green-700 transition-colors
            "
          >
            {updates.image ? updates.image.name : "Choose Image"}
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 transition-colors"
        >
          Update
        </button>
      </form>

      {/* Delete Hero Form */}
      <DeleteHero id={id} />
    </div>
  );
}
