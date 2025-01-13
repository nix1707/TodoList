const TaskPriority = Object.freeze({
  High: 0,
  Medium: 1,
  Low: 2,
});

export default TaskPriority;

export const getPriorityColor = (priority) => {
  const priorityColors = {
    [TaskPriority.Low]: "bg-green-100 text-green-800",
    [TaskPriority.Medium]: "bg-yellow-100 text-yellow-800",
    [TaskPriority.High]: "bg-red-100 text-red-800",
  };
  return priorityColors[priority] || priorityColors[1];
};

export const getPriorityText = (priority) => {
  const priorities = {
    [TaskPriority.Low]: "Low",
    [TaskPriority.Medium]: "Medium",
    [TaskPriority.High]: "High",
  };
  return priorities[priority] || "Medium";
};
