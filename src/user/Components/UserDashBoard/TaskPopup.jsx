const TaskPopup = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{task.taskName}</h2>
        <p><strong>Assigned Date:</strong> {new Date(task.assignedDate).toLocaleString()}</p>
        <p><strong>Task Description:</strong> {task.taskDescription}</p>
        <p><strong>Assigned To:</strong> {task.assignedTo.join(", ")}</p>
        <p><strong>Task Status:</strong> {task.taskStatus}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Assigned By:</strong> {task.assignedBy}</p>
        <p><strong>Reference File:</strong> <a href={task.referenceFileUrl[0]} className="text-blue-500" target="_blank" rel="noopener noreferrer">View File</a></p>
      </div>
    </div>
  );
};

export default TaskPopup;
