"use client";
import axios from "axios";

export default function TaskList({ tasks, refresh }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const toggleComplete = async (task) => {
    await axios.put(`${API_URL}/${task._id}`, { completed: !task.completed });
    refresh();
  };

  const deleteTask = async (id) => {
    if (confirm("Delete this task?")) {
      await axios.delete(`${API_URL}/${id}`);
      refresh();
    }
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="border p-3 rounded flex justify-between items-center"
        >
          <div>
            <h3
              className={`font-semibold ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600">{task.description}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => toggleComplete(task)}
              className="text-green-600 hover:text-green-800"
              title="Mark Complete"
            >
              ✔
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-600 hover:text-red-800"
              title="Delete Task"
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
