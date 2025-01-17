import TaskPriority from "../models/taskPriority";


export const filterBySearchTerm = (tasks, searchTerm) => {
  if (!searchTerm) return tasks;

  const term = searchTerm.toLowerCase();
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term)
  );
};

export const filterByPriority = (tasks, priority) => {
  if (priority === "all") return tasks;

  return tasks.filter(
    (task) =>
      task.priority === TaskPriority[priority] || task.priority === priority
  );
};

export const filterByDate = (tasks, dateFilter) => {
  if (dateFilter === "all") return tasks;

  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dateFilters = {
    today: (taskDate) => taskDate === today,
    tomorrow: (taskDate) => taskDate === tomorrow.getTime(),
    upcoming: (taskDate) => taskDate > tomorrow.getTime(),
    default: () => true,
  };

  return tasks.filter((task) => {
    const taskDate = new Date(task.deadline).setHours(0, 0, 0, 0);
    const filterFn = dateFilters[dateFilter] || dateFilters.default;
    return filterFn(taskDate);
  });
};

export const applyAllFilters = (tasks, { searchTerm, priority, date }) => {
  return [
    tasks,
    (tasks) => filterBySearchTerm(tasks, searchTerm),
    (tasks) => filterByPriority(tasks, priority),
    (tasks) => filterByDate(tasks, date),
  ].reduce((acc, fn) => fn(acc));
};
