export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  return (
    <div className="bg-white shadow p-5 rounded">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>

      {tasks.length === 0 && <p>No tasks available</p>}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border-b py-3 flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-bold">
              {task.title}{" "}
              {task.completed && (
                <span className="text-green-600 text-sm">(Completed)</span>
              )}
            </h3>
            <p className="text-sm">{task.description}</p>
            <p className={`text-sm font-semibold ${
  task.priority === "High"
    ? "text-red-600"
    : task.priority === "Medium"
    ? "text-yellow-600"
    : "text-green-600"
}`}>
  Priority: {task.priority}
</p>

            <p className="text-sm">Due: {task.ddueDate}</p>
          </div>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-yellow-600 text-white rounded"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>

            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => onToggle(task.id)}
            >
              {task.completed ? "Undo" : "Done"}
            </button>

            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}