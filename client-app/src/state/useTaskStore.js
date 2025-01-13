import { create } from "zustand";
import TaskPriority from "../models/taskPriority";
import agent from "../api/agent";
import { AwardIcon } from "lucide-react";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  editingTask: null,
  searchTerm: "",
  viewMode: "list",
  filters: { priority: "all", date: "all" },

  setSearchTerm: (newSearch) => {
    set({ searchTerm: newSearch });
  },

  setViewMode: (newViewMode) => {
    set({ viewMode: newViewMode });
  },

  setFilters: (newFilters) => {
    set({ filters: newFilters });
  },

  setEditingTask: (newEditingTask) => {
    set({ editingTask: newEditingTask });
  },

  loadTasks: async () => {
    try {
      const response = await agent.Tasks.getAllTasks();
      set({ tasks: response.data });
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  },

  createTask: async (newTask) => {
    try {
      const response = await agent.Tasks.createTask(
        newTask.title,
        newTask.description,
        newTask.deadline,
        TaskPriority[newTask.priority]
      );
      set({ tasks: [...get().tasks, response.data] });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  },

  updateTask: async (task) => {
    try {
      await agent.Tasks.updateTask({...task, priority: TaskPriority[task.priority]});
      set({ editingTask: null });
      await get().loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },

  deleteTask: async (id) => {
    await agent.Tasks.deleteTask(id)
      .then(() => set({ tasks: [...get().tasks.filter((t) => t.id !== id)] }))
      .catch((error) => console.log("Failed to delete task", error));
  },

  filterTasks: () => {
    const { tasks, filters, searchTerm } = get();

    let filtered = tasks.filter((task) => {
      const term = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    });

    if (filters.priority !== "all") {
      filtered = filtered.filter(
        (task) =>
          task.priority === TaskPriority[filters.priority] ||
          task.priority === filters.priority
      );
    }

    if (filters.date !== "all") {
      const today = new Date().setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.deadline).setHours(0, 0, 0, 0);

        switch (filters.date) {
          case "today":
            return taskDate === today;
          case "tomorrow":
            return taskDate === tomorrow.getTime();
          case "upcoming":
            return taskDate > tomorrow.getTime();
          default:
            return true;
        }
      });
    }

    return filtered;
  },
}));
