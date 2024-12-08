import { useLocation } from "react-router-dom";
import TaskDetails from "../components/TaskDetails";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const InTest = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("here is location", location);

  const tasksFromState = location.state || [];

  const sampleTask = tasksFromState.map((task) => ({
    id: task.taskId,
    title: task.taskName,
    status: task.taskStatus,
    dueDate: task.deadline,
    assignedTo: task.assignedTo || [],
    assignedBy: task.assignedBy || {},
    attachments: task.referenceFileUrl || [],
    comments: task.comment || [],
    taskDescription: task.taskDescription,
  }));

  const goBack = () => {
    navigate("/admin/task");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-4 border-gray-300">
      <div className=" flex gap-2">
          <button
            onClick={goBack}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
            }}
          >
            <Icon icon="mdi:arrow-left" height={24} width={24} />
          </button>
        <h2 className="text-xl font-bold bg-red-300 px-2 p-1 rounded-md text-gray-700">
          TodayAssigned ({sampleTask.length})
        </h2>
        </div>
        {/* <div className="flex gap-3">
          <button className="px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
            + Add a task
          </button>
          <h2 className="flex gap-2">
            <Icon icon="lets-icons:filter" height={22} width={22} />
            Filter
          </h2>
        </div> */}
      </div>
      {sampleTask.map((task) => (
        <TaskDetails key={task.id} task={task} className="gap-6" />
      ))}
    </div>
  );
};

export default InTest;
