import React from "react";
import { useTaskStore } from "../../state/useTaskStore";

const EditingTaskCard = () => {
  const { editingTask, setEditingTask, updateTask } = useTaskStore(
    (state) => state
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={editingTask.title}
        onChange={(e) =>
          setEditingTask({ ...editingTask, title: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <textarea
        value={editingTask.description}
        onChange={(e) =>
          setEditingTask({ ...editingTask, description: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
      />
      <select
        value={editingTask.priority}
        onChange={(e) =>
          setEditingTask({ ...editingTask, priority: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="flex gap-2">
        <button
          onClick={() => updateTask(editingTask)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Save
        </button>
        <button
          onClick={() => setEditingTask(null)}
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditingTaskCard;
