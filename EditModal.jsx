import { useState } from "react";

export default function EditModal({ task, onUpdate, onClose }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...task,
      title,
      description,
      priority,
      dueDate,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form className="bg-white p-6 rounded w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>

        <input
          className="border w-full p-2 mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border w-full p-2 mb-3 rounded"
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

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Save
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded w-full"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}