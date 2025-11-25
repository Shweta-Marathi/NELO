import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return alert("Title & Due Date are required");

    onAdd({
      title,
      description,
      priority,
      dueDate,
    });

    // Reset form after submit
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-5 rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

      <input
        className="border w-full p-2 mb-3 rounded"
        placeholder="Task Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border w-full p-2 mb-3 rounded"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-3 mb-3">
        <select
          className="border p-2 rounded w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded w-full"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add Task
      </button>
    </form>
  );
}