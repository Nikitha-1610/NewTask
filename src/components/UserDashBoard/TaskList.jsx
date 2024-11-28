import { useState } from "react";
import { Icon } from "@iconify-icon/react";

const TaskList = ({ employeeTasks = [], onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newTask, setNewTask] = useState({ name: "", completed: false }); 

  const handleModalOpen = () => {
    setNewTask({ name: "", completed: false }); 
    setIsModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false); 
  };

  const handleSaveTask = () => {
    if (newTask.name.trim()) {
      onAddTask(newTask); 
      setIsModalOpen(false); 
    } else {
      alert("Task name cannot be empty!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-96">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          My Tasks{" "}
          <span className="text-gray-500 text-sm">({employeeTasks.length})</span>
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleModalOpen} 
        >
          <Icon icon="material-symbols-light:add" height={22} width={22} />
        </button>
      </div>

      {/* Task List */}
      {employeeTasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks available</div> 
      ) : (
        <ul className="space-y-2">
          {employeeTasks.map((task, index) => (
            <li
              key={task.taskId} 
              className={`flex items-center justify-between px-2   py-2 rounded-lg  font-bold ${
                task.completed
                  ? "bg-green-50" 
                  : "hover:bg-gray-100 transition-colors" 
              }`}
            >
              {/* Task Name */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 font-medium">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-800">{task.taskName}</span>
              </div>

              
              {task.comments?.length > 0 && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Icon icon="akar-icons:comment" height={20} width={20} />
                  <span>{task.comments.length}</span>
                </div>
              )}

              {/* Status and Check Icon */}
              <div className="flex items-center space-x-3">
                {task.completed ? (
                  <Icon
                    icon="fluent-mdl2:completed-solid"
                    height={20}
                    width={20}
                    className="text-green-400"
                  />
                ) : (
                  <Icon
                    icon="fluent-mdl2:completed"
                    height={20}
                    width={20}
                    className="text-gray-500"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for adding new task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Task</h3>
            <div className="space-y-4">
              {/* Task Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Task Name
                </label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task name"
                />
              </div>

              {/* Completed */}
              <div className="flex items-center space-x-3">
                <label className="text-gray-700 font-medium">Completed:</label>
                <input
                  type="checkbox"
                  checked={newTask.completed}
                  onChange={(e) =>
                    setNewTask({ ...newTask, completed: e.target.checked })
                  }
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleSaveTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
