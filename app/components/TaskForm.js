"use client";
import { useState } from "react";
import axios from "axios";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    await axios.post(API_URL, { title, description });
    setTitle("");
    setDescription("");
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
