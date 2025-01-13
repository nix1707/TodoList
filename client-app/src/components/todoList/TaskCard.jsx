import { CheckCircle2, Circle, Edit2, Trash2 } from "lucide-react";
import { getPriorityColor, getPriorityText } from "../../models/taskPriority";
import EditingTaskCard from "./EditingTaskCard";
import { useTaskStore } from "../../state/useTaskStore";

const TaskCard = ({ task }) => {
  const { setEditingTask, editingTask, viewMode, updateTask, deleteTask } =
    useTaskStore((state) => state);
  const isSticky = viewMode === "sticky";

  return (
    <div
      className={`${
        isSticky
          ? "bg-yellow-100 rotate-1 transform hover:rotate-0 transition-transform"
          : task.isCompleted
          ? "bg-green-50"
          : "bg-white"
      } rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow`}
    >
      <div className="p-4">
        {editingTask?.id === task.id ? (
          <EditingTaskCard />
        ) : (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateTask({
                      ...task,
                      isCompleted: !task.isCompleted,
                    })
                  }
                  className="flex-shrink-0 focus:outline-none"
                >
                  {task.isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <h3
                  className={`font-medium ${
                    task.isCompleted ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setEditingTask({
                      ...task,
                      priority: getPriorityColor(task.priority),
                    })
                  }
                  className="p-1 hover:bg-gray-100 rounded-lg focus:outline-none"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 hover:bg-gray-100 rounded-lg focus:outline-none"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{task.description}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span
                className={`px-2 py-1 rounded-full ${getPriorityColor(
                  task.priority
                )}`}
              >
                {getPriorityText(task.priority)}
              </span>
              <span className="text-gray-500">
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
