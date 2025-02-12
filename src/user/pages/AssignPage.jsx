import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faComment, faLink } from "@fortawesome/free-solid-svg-icons";

const DateDisplay = ({ isoDate }) => {
  if (!isoDate) return "No Date";
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return <span>{formatDate(isoDate)}</span>;
};

const generateRandomColor = () => {
  const colors = [
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-teal-200",
    "bg-purple-200",
    "bg-pink-200",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const AssignPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tasks = location.state?.tasks || [];

  return (
    <div className="p-4 min-h-screen flex flex-col items-center">
      {/* Wrapper for consistent width */}
      <div className="w-full max-w-xl">
        {/* Header with fixed width */}
        <div className="flex items-center justify-between bg-green-100 rounded-lg px-4 py-2 shadow">
          <h1 className="text-2xl font-bold text-gray-700">ASSIGNED TASKS</h1>
          <span className="text-lg font-semibold bg-white px-3 py-1 rounded shadow">
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
          </span>
        </div>

        {/* Task Cards */}
        <div className="mt-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className="block bg-white shadow rounded-lg p-4 mb-4 border border-gray-400 cursor-pointer"
                onClick={() => navigate(`/user/home/${task.taskId}`)}
              >
                {/* Task Deadline */}
                <div className="absolute top-2 right-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                    <DateDisplay isoDate={task.deadline} />
                  </div>
                </div>

                {/* Task Name */}
                {task.taskName && (
                  <span
                    className={`text-xs font-semibold mb-2 mt-4 inline-block px-2 py-1 rounded ${generateRandomColor()}`}
                  >
                    {task.taskName}
                  </span>
                )}

                {/* Task Description */}
                <div className="text-sm text-black-100">
                  {task.taskDescription || "No description available."}
                </div>

                {/* Comments & Attachments */}
                <div className="flex items-center text-sm text-gray-600 mt-2 space-x-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    {Array.isArray(task.comment) ? task.comment.length : 0} Comments
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faLink} className="mr-1" />
                    {Array.isArray(task.referenceFileUrl) ? task.referenceFileUrl.length : 0} Attachments
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No assigned tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignPage;
