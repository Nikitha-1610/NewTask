import { useEffect, useState } from "react";
import { format } from "date-fns";

const TaskSchedule = ({ employeeTasks, setTasks }) => {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [tasksForToday, setTasksForToday] = useState([]);

  const formatDate = (apiDate) => {
    const parsedDate = new Date(apiDate);

    if (isNaN(parsedDate)) {
      console.error("Invalid date value:", apiDate);
      return null; 
    }
    return format(parsedDate, "dd-MM-yyyy"); 
  };

  useEffect(() => {
    const formatted = formatDate(new Date());
    setFormattedDate(formatted);

    const todayTasks = employeeTasks.filter((task) => {
      const taskDate = formatDate(task.assignedDate);
      return taskDate === formatted;
    });

    setTasksForToday(todayTasks);
  }, [employeeTasks]);

  // UserTaskCard component as a local component within TaskSchedule
  const UserTaskCard = ({ title, time }) => {
    return (
      <div className="flex items-center bg-white shadow-md rounded-md px-4 py-2 mb-4">
        <div className="w-1 bg-teal-500 rounded-full h-full mr-3"></div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">{time}</p>
        </div>
        <div className="ml-auto">
          <button className="text-gray-400 hover:text-gray-600">
            <Icon icon="mdi:dots-vertical" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 mx-auto p-4 h-80 rounded-lg shadow-lg bg-white">
      <div className="flex justify-between items-center mb-6 bg-teal-100 rounded-md p-2">
        <div>
          <p className="text-gray-500">{format(date, "MMMM")}</p>
          <h2 className="text-xl font-bold text-gray-800">{formattedDate}</h2>
        </div>
      </div>
      <div className="relative">
        {tasksForToday.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available for today.</p>
        ) : (
          <div className="ml-12">
            {tasksForToday.map((task) => (
              <UserTaskCard
                key={task.taskId}
                title={task.taskName}
                time={formatDate(task.assignedDate)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSchedule;
