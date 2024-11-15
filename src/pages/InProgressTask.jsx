import TaskDetails from "../components/TaskDetails";

const InProgressTask = () => {
  const sampleTask = {
    id: 4,
    title: "Task 1: Landing page and Dashboard of M App",
    status: "In Progress",
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
  };

  return <TaskDetails task={sampleTask} />;
};

export default InProgressTask;
