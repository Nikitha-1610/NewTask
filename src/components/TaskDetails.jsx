import { Icon } from "@iconify/react";

const TaskDetails = ({ task }) => {
  return (
    <div className=" w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 font-sans">
      {/* Task Status */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300">
        <h2 className="text-xl font-bold bg-yellow-200 px-2 p-1 rounded-md text-gray-700">
          In Progress({task.id})
        </h2>
        <div className=" flex gap-3">
          <button className="px-3 py-1 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
            + Add a task
          </button>
          <h2 className=" flex gap-2">
            <Icon icon="lets-icons:filter" height={22} width={22} />
            Filter
          </h2>
        </div>
      </div>

      {/* Task Title */}
      <h3 className="mt-4 text-xl font-semibold text-gray-800">{task.title}</h3>

      {/* Task Details */}
      <div className="mt-4 text-base font-normal text-gray-600">
        <div className="flex items-center gap-8 mb-2">
          <div className=" flex">
            <Icon icon="ic:outline-watch-later" height={18} width={18} />
            <span className="ml-2">Status</span>:{" "}
          </div>
          <div className=" flex">
            <Icon icon="ri:progress-8-fill" height={18} width={18} />
            <span className="ml-1 font-medium">{task.status}</span>
          </div>
        </div>
        <div className="flex items-center gap-8 mb-2">
          <div className="flex">
            <Icon icon="ic:outline-calendar-today" className="text-gray-500" />
            <span className="ml-2">Due Date</span>:{" "}
          </div>
          <span className="ml-1 font-medium">{task.dueDate}</span>
        </div>

        {/* Assigned To */}
        <div className="flex items-center gap-1 mb-2">
          <div className=" flex">
            <Icon icon="lucide:users" height={22} width={22} />
            <span className="ml-2">Assigned to:</span>
          </div>
          <div className="ml-2 flex space-x-2">
            {task.assignedTo.map((person, index) => (
              <div key={index} className="flex items-center gap-3">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-6 h-6 rounded-full mr-1"
                />
                <span className="text-gray-700 font-medium">{person.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned By */}
        <div className="flex items-center mb-2">
          <Icon icon="mdi:user-outline" height={22} width={22} />
          <span className="ml-2">Assigned by:</span>
          <div className="ml-2 flex items-center">
            <img
              src={task.assignedBy.image}
              alt={task.assignedBy.name}
              className="w-6 h-6 rounded-full mr-1"
            />
            <span className="text-gray-700 font-medium">
              {task.assignedBy.name}
            </span>
          </div>
        </div>
      </div>

      <div className=" flex mt-8 gap-1">
        <Icon icon="tabler:file-description" height={22} width={22} />
        <h2 className=" text-base font-semibold">Description</h2>
      </div>
      <textarea
        placeholder="Description"
        className="w-full p-2 min-h-20 mt-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md resize-none focus:outline-none"
      />

      <div className="mt-4">
        <div className=" flex gap-2">
          <Icon icon="cuida:attachment-clip-outline" height={22} width={22} />
          <h4 className="text-gray-700 text-base font-semibold">
            Attachments ({task.attachments.length})
          </h4>
        </div>
        <div className="flex space-x-4 mt-2">
          {task.attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 border rounded-md border-gray-300 bg-gray-50 h-20 w-80"
            >
              <Icon
                icon="mdi:file-pdf"
                className="text-red-500"
                height={40}
                width={40}
              />
              <div className="flex-grow">
                <div className="text-base font-medium">{file.fileName}</div>
                <div className="text-sm text-gray-500">{file.date}</div>
                <div className="text-sm flex gap-2">
                  <span className="font-medium">Size:</span> {file.size}
                  <a href="#" className="ml-2 text-blue-600 underline">
                    Download
                  </a>
                  <Icon
                    icon="material-symbols-light:download"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              {file.status === "completed" ? (
                <Icon
                  icon="fluent-mdl2:completed-solid"
                  height={22}
                  width={22}
                />
              ) : (
                <Icon
                  icon="material-symbols-light:arrow-upload-progress"
                  height={22}
                  width={22}
                />
              )}
            </div>
          ))}
          <button className="flex items-center justify-center h-20 w-16 border rounded-md border-gray-300 text-gray-600 hover:bg-gray-100">
            <Icon icon="mdi:plus" height={30} width={30} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        <h4 className="text-gray-700 text-sm font-semibold">
          Comments ({task.comments.length})
        </h4>
        <div className="space-y-2">
          {task.comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-2">
              <img
                src={comment.userImage}
                alt={comment.user}
                className="w-6 h-6 rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {comment.user}
                </div>
                <div className="text-sm text-gray-600">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
        <textarea
          placeholder="Add a comment"
          className="w-full p-2 mt-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md resize-none focus:outline-none"
        />
      </div>

      {/* Status Change */}
      <div className="mt-4 flex items-center space-x-2">
        <span className="text-gray-700 text-sm font-semibold">
          Change Status
        </span>
        <button className="px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-md">
          Low
        </button>
        <button className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-md">
          Normal
        </button>
        <button className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-md">
          Urgent
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
