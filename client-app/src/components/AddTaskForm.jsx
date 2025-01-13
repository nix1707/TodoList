import React, { useState } from "react";
import { useTaskStore } from "../state/useTaskStore";

const emptyFormTask = {
  title: "",
  description: "",
  priority: 0,
  deadline: new Date().toISOString().split("T")[0],
};

const AddTaskForm = () => {
  const taskStore = useTaskStore();

  const [newTask, setNewTask] = useState(emptyFormTask);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await taskStore.createTask(newTask);
    setNewTask(emptyFormTask);
  };

  return (
    <div className="bg-white border-t shadow-lg p-4 sticky bottom-0">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleCreateTask} className="flex flex-wrap gap-4">
          <input
            required
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            required
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            required
            type="date"
            value={newTask.deadline}
            onChange={(e) =>
              setNewTask({ ...newTask, deadline: e.target.value })
            }
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            required
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: parseInt(e.target.value, 10) })
            }
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="2">Low</option>
            <option value="1">Medium</option>
            <option value="0">High</option>
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
