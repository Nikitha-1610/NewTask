import { useLocation } from "react-router-dom";
import TaskDetails from "../components/TaskDetails";
import { Icon } from "@iconify/react";

const AssignTask = () => {
  const location = useLocation();
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

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-gray-300">
        <h2 className="text-xl font-bold bg-green-400 px-2 p-1 rounded-md text-gray-700">
          Today Assigned ({sampleTask.length})
        </h2>
        <div className="flex gap-3">
          <button className="px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
            + Add a task
          </button>
          <h2 className="flex gap-2">
            <Icon icon="lets-icons:filter" height={22} width={22} />
            Filter
          </h2>
        </div>
      </div>

      {/* Task List or No Data Message */}
      {sampleTask.length > 0 ? (
        sampleTask.map((task) => (
          <TaskDetails key={task.id} task={task} className="gap-6" />
        ))
      ) : (
        <div className="flex items-center justify-center h-40 text-lg font-medium text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default AssignTask;
