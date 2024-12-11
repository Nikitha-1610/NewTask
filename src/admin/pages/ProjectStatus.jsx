import { useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { Oval } from 'react-loader-spinner';
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectStatus = ({ task, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(task.projectStatus);
  const [updating, setUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await fetch(
        `https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/project/update/${task.projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectStatus: selectedStatus }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        onUpdateStatus(task.projectId, selectedStatus);
        setIsModalOpen(false);
        toast.success("Project status updated successfully!");
      } else {
        console.error("Error updating status:", data);
        toast.error("Failed to update project status.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating status.");
    } finally {
      setUpdating(false);
    }
  };

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
            <span className="icon-placeholder"><Icon icon="ri:progress-8-fill" height={18} width={18} /></span>
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
      {/* Project details here */}
      <div className="mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Status
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Update Project Status</h2>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
              <option value="In-Progress">In-Progress</option>
              <option value="In-Test">In-Test</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className={`px-4 py-2 rounded text-white ${
                  updating ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

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

  const handleUpdateStatus = (projectId, newStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.projectId === projectId
          ? { ...project, projectStatus: newStatus }
          : project
      )
    );
  };

  const filteredProjects =
    statusFilter === "All"
      ? projects
      : projects.filter((project) => project.projectStatus === statusFilter);

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mt-6">Project List</h1>
      <div className="mt-4 flex justify-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="All">All Status</option>
          <option value="In-Progress">In-Progress</option>
          <option value="In-Test">In-Test</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
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
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProjects.map((project) => (
            <ProjectStatus
              key={project.projectId}
              task={project}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-6">No projects available.</p>
      )}
    </div>
  );
};

export default App;
