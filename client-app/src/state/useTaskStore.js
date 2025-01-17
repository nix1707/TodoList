import { create } from "zustand";
import agent from "../api/agent";
import { applyAllFilters } from "../utils/taskFilters";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  editingTask: null,
  searchTerm: "",
  viewMode: "list",
  filters: { priority: "all", date: "all" },

  setSearchTerm: (newSearch) => set({ searchTerm: newSearch }),
  setViewMode: (newViewMode) => set({ viewMode: newViewMode }),
  setFilters: (newFilters) => set({ filters: newFilters }),
  setEditingTask: (newEditingTask) => set({ editingTask: newEditingTask }),

  loadTasks: async () => {
    await agent.Tasks.getAllTasks()
      .then((response) => set({ tasks: response.data }))
      .catch((error) => console.error("Failed to load tasks:", error));
  },

  createTask: async (newTask) => {
    await agent.Tasks.createTask(newTask)
      .then((response) =>
        set((state) => ({ tasks: [...state.tasks, response.data] }))
      )
      .catch((error) => console.error("Failed to create task:", error));
  },

  updateTask: async (updateTask) => {
    try {
      const response = await agent.Tasks.updateTask(updateTask);
      set({ editingTask: null });
      set({
        tasks: [
          ...get().tasks.filter((t) => t.id !== updateTask.id),
          response.data,
        ],
      });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },

  deleteTask: async (id) => {
    try {
      await agent.Tasks.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },

  filterTasks: () => {
    const { tasks, filters, searchTerm } = get();
    return applyAllFilters(tasks, {
      searchTerm,
      priority: filters.priority,
      date: filters.date,
    });
  },
}));
