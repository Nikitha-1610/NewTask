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
      { name: "Landing-page.pdf", size: "1Mb", link: "#" },
      { name: "Dashboard.pdf", size: "1Mb", link: "#" },
      { name: "Settings.pdf", size: "1Mb", link: "#" },
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
