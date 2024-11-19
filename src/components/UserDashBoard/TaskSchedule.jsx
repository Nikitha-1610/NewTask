import TaskCard from "./Taskcard";

const TaskSchedule = () => {
  const tasks = [
    { id: 1, title: "Work 1", time: "10:00am - 12:00pm" },
    { id: 2, title: "Work 1", time: "10:00am - 12:00pm" },
  ];

  return (
    <div className="w-80 mx-auto p-4 h-80 rounded-lg shadow-lg bg-white">
      <div className="flex justify-between items-center mb-6 bg-teal-100 rounded-md p-2">
        <div>
          <p className="text-gray-500">September</p>
          <h2 className="text-xl font-bold text-gray-800">23-10-2023</h2>
        </div>
        <button className=" bg-white rounded-md text-teal-600 px-3 py-1 rounded-md text-sm">
          Today&apos;s Task
        </button>
      </div>
      <div className="relative">
        <div className="absolute left-0 w-10 text-gray-400 text-sm">
          <p className="mt-8">09:00</p>
          <p className="mt-12">10:00</p>
          <p className="mt-12">11:00</p>
        </div>
        <div className="ml-12">
          {tasks.map((task) => (
            <TaskCard key={task.id} title={task.title} time={task.time} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskSchedule;
