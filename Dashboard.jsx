import { useState, useEffect } from "react";
import TaskForm from "../components/Tasks/TaskForm";
import TaskList from "../components/Tasks/TaskList";
import TaskFilters from "../components/Tasks/TaskFilters";
import EditModal from "../components/Tasks/EditModal";
import useDebounce from "../hooks/useDebounce";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("nelo_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  // save tasks to storage
  useEffect(() => {
    localStorage.setItem("nelo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([{ ...task, id: uuidv4(), completed: false }, ...tasks]);
  };

  const deleteTask = (id) => {
    if (confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const updateTask = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  // 🔥 Debounced search
  const debouncedSearch = useDebounce(search, 300);

  // 🔥 Filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus =
      status === "All"
        ? true
        : status === "Completed"
        ? task.completed
        : !task.completed;
    const matchesPriority = priority === "All" ? true : task.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 🔥 Auto task reminder every 20 minutes
  useEffect(() => {
    const notify = () => {
      const pending = tasks.filter((t) => !t.completed);
      if (pending.length > 0) {
        console.log(
          `[Task Reminder] You have ${pending.length} pending tasks. Mock email sent to user.`
        );
      }
    };

    notify(); // immediate run on page open
    const interval = setInterval(notify, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  // 🔥 Logout button
  const logout = () => {
    sessionStorage.removeItem("nelo_user");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <button
        className="bg-red-600 text-white px-4 py-2 rounded w-32"
        onClick={logout}
      >
        Logout
      </button>


      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={(task) => setEditingTask(task)}
      />

      {editingTask && (
        <EditModal
          task={editingTask}
          onUpdate={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}