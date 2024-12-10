import { useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { Oval } from 'react-loader-spinner'; // Import loader

const ProjectStatus = ({ task }) => {
  const [priority, setPriority] = useState(task.priority || "Normal");

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-800">
        {task.projectName}
      </h3>

      <div className="mt-4 text-sm md:text-base font-normal text-gray-600 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <span className="icon-placeholder">🕒</span>
            <span className="ml-2">Status:</span>
          </div>
          <div className="flex items-center">
            <span className="icon-placeholder">🔄</span>
            <span className="ml-1 font-medium">{task.projectStatus}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <span className="icon-placeholder"><IoPersonSharp /></span>
            <span className="ml-2">Project Lead :</span>
          </div>
          <div className="flex items-center">
            <span className="icon-placeholder"><GoPerson /></span>
            <span className="ml-1 font-medium">{task.projectLead}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <span className="icon-placeholder"><IoPersonSharp /></span>
            <span className="ml-2">Design Lead :</span>
          </div>
          <div className="flex items-center">
            <span className="icon-placeholder"><GoPerson /></span>
            <span className="ml-1 font-medium">{task.designLead}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <span className="icon-placeholder"><IoPersonSharp /></span>
            <span className="ml-2">Frontend Lead :</span>
          </div>
          <div className="flex items-center">
            <span className="icon-placeholder"><GoPerson /></span>
            <span className="ml-1 font-medium">{task.frontendLead}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <span className="icon-placeholder"><IoPersonSharp /></span>
            <span className="ml-2">Backend Lead :</span>
          </div>
          <div className="flex items-center">
            <span className="icon-placeholder"><GoPerson /></span>
            <span className="ml-1 font-medium">{task.backendLead}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <span className="icon-placeholder">📅</span>
            <span className="ml-2">Start Date:</span>
          </div>
          <span className="font-medium">
            {new Date(task.startDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <span className="icon-placeholder">📅</span>
            <span className="ml-2">End Date:</span>
          </div>
          <span className="font-medium">
            {new Date(task.endDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <span className="font-semibold">Priority:</span>
          <span
            className={`${
              task.priority === "Urgent"
                ? "text-red-600"
                : task.priority === "Normal"
                ? "text-yellow-600"
                : "text-green-600"
            } font-medium`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-base font-semibold">Description</h4>
        <p className="text-sm text-gray-600">
          {task.projectDescription || "No description provided."}
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/project/getAll",
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setProjects(data.message || []);
        } else {
          console.error("Error fetching projects:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center mt-6">Project List</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <Oval
            height={80}
            width={30}
            color="#4fa94d"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {projects.map((project) => (
            <ProjectStatus key={project.projectId} task={project} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-6">No projects available.</p>
      )}
    </div>
  );
};

export default App;
