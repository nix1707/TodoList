import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const Tasks = {
  createTask: (title, description, deadline, priority) =>
    axios.post("/tasks", { title, description,deadline, priority }),
  getAllTasks: () => axios.get("/tasks"),
  updateTask: (newTask) =>
    axios.put(`/tasks`, newTask),
  deleteTask: (id) => axios.delete(`/tasks/${id}`),
};

const agent = {
  Tasks,
};

export default agent;
