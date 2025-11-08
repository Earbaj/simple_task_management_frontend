"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          📝 Task Manager
        </h1>
        <TaskForm refresh={fetchTasks} />
        <TaskList tasks={tasks} refresh={fetchTasks} />
      </div>
    </main>
  );
}
