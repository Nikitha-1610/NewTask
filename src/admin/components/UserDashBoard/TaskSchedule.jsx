import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
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
                <TaskCard
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


