const TaskList = ({ tasks }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <h3 className="text-lg font-bold mb-4">My Tasks (05)</h3>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{index + 1}</span>
              <span>{task.name}</span>
            </div>
            <span
              className={`rounded-full text-lg ${
                task.completed ? "text-green-500" : "text-gray-400"
              }`}
            >
              {task.completed ? "✔" : "○"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
