export default function TaskFilters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}) {
  return (
    <div className="bg-white shadow p-5 rounded mb-6 flex flex-col gap-3">
      <input
        className="border p-2 rounded"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-3">
        <select
          className="border p-2 rounded w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          className="border p-2 rounded w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
}