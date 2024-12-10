import { Icon } from "@iconify/react";
import { useState } from "react";
const TaskDetails = ({ task }) => {
  const [priority, setPriority] = useState(task.priority || "Normal");

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Task Title */}
      <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-800">
        {task.title}
      </h3>

      {/* Task Info */}
      <div className="mt-4 text-sm md:text-base font-normal text-gray-600 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Icon icon="ic:outline-watch-later" height={18} width={18} />
            <span className="ml-2">Status:</span>
          </div>
          <div className="flex items-center">
            <Icon icon="ri:progress-8-fill" height={18} width={18} />
            <span className="ml-1 font-medium">{task.status}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Icon icon="ic:outline-calendar-today" className="text-gray-500" />
            <span className="ml-2">Due Date:</span>
          </div>
          <span className="font-medium">
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Assigned To */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Icon icon="lucide:users" height={22} width={22} />
            <span className="ml-2">Assigned to:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {task.assignedTo.map((person, index) => (
              <div key={index} className="flex items-center gap-2">
                
                <Icon
                  icon="ph:user-circle-fill"
                  className="text-blue-500  p-0 rounded-full"
                  width={32}
                  height={32}
                />
                <span className="text-gray-700 font-medium">{person}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned By */}
        <div className="flex flex-wrap items-center">
          <Icon icon="mdi:user-outline" height={22} width={22} />
          <span className="ml-2">Assigned by:</span>
          <div className="flex items-center gap-2 ml-3">
            
            <Icon
              icon="mdi:account-circle-outline"
              className="text-blue-500  p-0 rounded-full"
              width={32}
              height={32}
            />
            <span className="text-gray-700 font-medium">{task.assignedBy}</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <Icon icon="tabler:file-description" height={22} width={22} />
          <h2 className="text-base font-semibold">Description</h2>
        </div>
        <textarea
          value={task.taskDescription || "No description available."}
          placeholder="Description"
          className="w-full p-2 mt-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md resize-none focus:outline-none"
        />
      </div>

      {/* Attachments Section */}
      <div className="mt-4">
  <div className="flex justify-between">
    <div className="flex gap-2">
      <Icon icon="cuida:attachment-clip-outline" height={22} width={22} />
      <h4 className="text-base font-semibold text-gray-400">
        Attachments ({task.referenceFileUrl ? task.referenceFileUrl.length : 0})
      </h4>
    </div>
  </div>
  <div className="flex flex-wrap gap-4 mt-2">
    {task.referenceFileUrl &&
      task.referenceFileUrl.map((url, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-2 border rounded-md border-gray-300 bg-gray-50 w-full md:w-80"
        >
          <Icon
            icon="mdi:file-pdf"
            className="text-red-500"
            height={40}
            width={40}
          />
          <div className="flex">
            {/* Removed the size text */}
          </div>
          <div className="text-blue-600 cursor-pointer">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <button className="text-blue-600 hover:underline">View</button>
            </a>
          </div>
        </div>
      ))}
  </div>
</div>


      {/* Comments Section */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <Icon icon="basil:comment-outline" height={22} width={22} />
          <h4 className="text-base font-semibold">
            Comments ({task.comments.length})
          </h4>
        </div>
        <div className="space-y-2 mt-2">
          {task.comments.map((comment, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 text-sm text-gray-700 bg-blue-100 border border-gray-300 rounded-md"
            >
              
              <div className=" font-bold text-teal-300 text-base">
                {comment.userName}:
              </div>
              <div>{comment.message}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Change Section */}
      <div
        className={`mt-4 flex flex-wrap gap-2 items-center ${
          priority === "Urgent"
            ? "bg-red-100"
            : priority === "Normal"
            ? "bg-yellow-100"
            : "bg-green-100"
        } p-4 rounded-md`}
      >
        <span className="text-sm font-semibold">Change Priority:</span>
        {["Low", "Normal", "Urgent"].map((currentPriority) => (
          <button
            key={currentPriority}
            onClick={() => setPriority(currentPriority)} 
            className={`px-3 py-1 flex items-center gap-1 text-xs font-medium rounded-md transition duration-200 ${
              currentPriority === priority
                ? "ring-2 ring-offset-2 ring-blue-500"
                : ""
            } ${
              currentPriority === "Low"
                ? "bg-green-100 text-green-600"
                : currentPriority === "Normal"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                currentPriority === "Low"
                  ? "bg-green-400"
                  : currentPriority === "Normal"
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }`}
            ></div>
            {currentPriority}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskDetails;
