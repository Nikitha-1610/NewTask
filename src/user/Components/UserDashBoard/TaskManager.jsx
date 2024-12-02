import { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Slack Logo Design", duration: 1800 },
    { id: 2, name: "Dashboard Design", duration: 1800 },
    { id: 3, name: "Create Wireframe", duration: 1500 },
    { id: 4, name: "Create Wireframe", duration: 1500 },
  ]);

  const [activeTask, setActiveTask] = useState(tasks[2]); // Pre-select one task for demo

  useEffect(() => {
    let timer;
    if (activeTask) {
      timer = setInterval(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === activeTask.id
              ? { ...task, duration: task.duration + 1 }
              : task
          )
        );
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTask]);

  const startTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setActiveTask(task);
    setTasks((prevTasks) =>
      prevTasks.map((t) => ({
        ...t,
        isActive: t.id === id,
      }))
    );
  };

  const pauseTask = () => {
    setActiveTask(null);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, isActive: false }))
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 h-96 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className=" flex justify-between">
        <h2>Timer</h2>
        <Icon icon="stash:play-btn-light" height={22} width={22} />
      </div>
      <div className="p-4 bg-teal-50 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <div>
              <Icon icon="stash:stopwatch-solid" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Create Wireframe</h3>
            </div>
          </div>
          <div className=" flex gap-2">
            <p className="text-sm text-gray-500">
              {Math.floor(activeTask.duration / 60)}m {activeTask.duration % 60}
              s
            </p>
            <button onClick={pauseTask}>
              <Icon
                icon="material-symbols:pause-outline"
                height={22}
                width={22}
              />
            </button>
            <div>
              <Icon icon="mage:dots" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Project Section */}
      <div className="flex justify-between">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Main Project</h2>
        <Icon icon="stash:play-btn-light" height={22} width={22} />
      </div>

      {/* Task List Section */}
      <div
        className="space-y-2 overflow-y-auto max-h-48"
        style={{ maxHeight: "calc(100% - 180px)" }} // Adjust height based on layout
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-md border ${
              task.isActive ? "bg-green-50 border-green-400" : "bg-gray-50"
            }`}
          >
            <div className="flex gap-1">
              <div>
                <Icon icon="stash:stopwatch-solid" />
              </div>
              <h3 className="font-medium text-gray-800">{task.name}</h3>
            </div>
            <div className="flex gap-1">
              <div>
                <p className="text-sm text-gray-500">
                  {Math.floor(task.duration / 60)}m {task.duration % 60}s
                </p>
              </div>
              <div>
                <button onClick={() => startTask(task.id)}>
                  <Icon icon="stash:play-btn-light" height={22} width={22} />
                </button>
              </div>
              <div>
                <Icon icon="mage:dots" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;