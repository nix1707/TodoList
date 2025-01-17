import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { useTaskStore } from "../../state/useTaskStore";

const TodoList = () => {
  const [filtered, setFiltered] = useState([]);
  const { filterTasks, filters, loadTasks, tasks, searchTerm, viewMode } =
    useTaskStore((state) => state);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    const filteredTasks = filterTasks();
    setFiltered(filteredTasks);
  }, [searchTerm, tasks, filters]);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className={
            viewMode === "sticky"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filtered.length > 0 ? (
            filtered.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/no-tasks.png"
                  draggable="false"
                  className="select-none md:w-10/12 w-1/2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
