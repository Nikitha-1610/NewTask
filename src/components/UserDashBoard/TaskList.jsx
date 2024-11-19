import { Icon } from "@iconify-icon/react";
const TaskList = ({ tasks }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          My Tasks{" "}
          <span className="text-gray-500 text-sm">({tasks.length})</span>
        </h2>
        <button className="text-gray-500 hover:text-gray-700">
          <Icon icon="material-symbols-light:add" height={22} width={22} />
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between px-3 py-2 rounded-lg ${
              task.completed
                ? "bg-green-50"
                : "hover:bg-gray-100 transition-colors"
            }`}
          >
            {/* Task Number and Name */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-gray-800">{task.name}</span>
              {task.subtasks && (
                <span className="text-gray-400 text-sm flex items-center space-x-1">
                  <Icon icon="basil:comment-outline" height={22} width={22} />
                  <span>{task.subtasks}</span>
                </span>
              )}
            </div>

            {/* Completion Icon */}
            <button
              className={`p-1 rounded-full ${
                task.completed
                  ? " text-green-400"
                  : " text-gray-500 hover:bg-gray-100"
              }`}
            >
              {task.completed ? (
                <Icon
                  icon="fluent-mdl2:completed-solid"
                  height={22}
                  width={22}
                />
              ) : (
                <Icon icon="fluent-mdl2:completed" height={22} width={22} />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
