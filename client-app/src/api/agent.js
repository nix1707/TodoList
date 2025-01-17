import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const Tasks = {
  createTask: (task) => axios.post("/tasks", task),
  getAllTasks: () => axios.get("/tasks"),
  updateTask: async (task) => axios.put(`/tasks`, task),
  deleteTask: (id) => axios.delete(`/tasks/${id}`),
};

const agent = {
  Tasks,
};

export default agent;
