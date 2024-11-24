import TaskDetails from "../components/TaskDetails";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import axiosInstance from "../utilities/axios/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const InProgressTask = () => {
  const [allUsers, setAllUsers] = useState([]);
  const postAllusers = async () => {
    try {
      const response = await axiosInstance.post("task/getTaskByStatus");
      console.log(response.data.message);

      setAllUsers(response?.data?.message);
    } catch (error) {
      console.error("Error syncing with server:", error);
      toast.error("Failed to fetch users.");
    }
  };
  useEffect(() => {
    postAllusers();
  }, []);
  const sampleTask = [
    {
      id: 1,
      title: "Task 1: Landing page and Dashboard of M App",
      status: "In Test",
      dueDate: "28-10-2024",
      assignedTo: [
        {
          name: "Employee 1",
          image: "https://material-ui.com/static/images/avatar/1.jpg",
        },
        {
          name: "Employee 2",
          image: "https://material-ui.com/static/images/avatar/2.jpg",
        },
        {
          name: "Employee 3",
          image: "https://material-ui.com/static/images/avatar/3.jpg",
        },
      ],
      assignedBy: {
        name: "Employee 1",
        image: "https://material-ui.com/static/images/avatar/5.jpg",
      },
      attachments: [
        {
          id: 1,
          fileName: "Landing-page.pdf",
          date: "2021/10/31",
          size: "1Mb",
          status: "completed",
        },
        {
          id: 2,
          fileName: "Landing-page.pdf",
          date: "2021/10/31",
          size: "1Mb",
          status: "completed",
        },
        {
          id: 3,
          fileName: "Landing-page.pdf",
          date: "2021/10/31",
          size: "1Mb",
          status: "failed",
        },
      ],
      comments: [
        {
          user: "Employee 2",
          userImage: "https://material-ui.com/static/images/avatar/2.jpg",
          text: "Looks good!",
        },
        {
          user: "Employee 3",
          userImage: "https://material-ui.com/static/images/avatar/2.jpg",
          text: "Please update the last section.",
        },
      ],
    },
  ];

  return (
    <>
    <Toaster />
    <div className=" space-y-5">
      <div className="flex items-center justify-between pb-4 border-gray-300">
        <h2 className="text-xl font-bold bg-red-300 px-2 p-1 rounded-md text-gray-700">
          In Test(4)
        </h2>
        <div className=" flex gap-3">
          <button className="px-3 py-2 text-sm text-white bg-teal-500 rounded hover:bg-teal-600">
            + Add a task
          </button>
          <h2 className=" flex gap-2">
            <Icon icon="lets-icons:filter" height={22} width={22} />
            Filter
          </h2>
        </div>
      </div>
      {sampleTask.map((task) => (
        <TaskDetails key={task.id} task={task} className=" gap-6" />
      ))}
    </div>
    </>
  );
};

export default InProgressTask;
