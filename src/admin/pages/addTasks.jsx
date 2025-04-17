import { useEffect, useState } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { s3Client } from "../../common/utils/aws/awsconfig";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Icon } from "@iconify/react";

const AddTasks = () => {
  const [formData, setFormData] = useState({
    taskName: "",
    deadline: "",
    assignedTo: [],
    assignedBy: "john",
    reviewers: "",
    priority: "Low",
    taskDescription: "",
    referenceFileUrl: [],
    category: "",
    project: "",
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [projectOptions, setProjectOptions] = useState([]);
  const [displayReferences, setDisplayReferences] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get("project/names");
        if (res.status === 200 && res.data.message) {
          setProjectOptions(res.data.message);
        }
      } catch (err) {
        console.error("Project fetch error:", err);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const getAllEmp = async () => {
      try {
        const res = await axiosInstance.get(
          `employee/getMembers/${employeeId}`
        );
        setUsers(res?.data?.message || []);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    getAllEmp();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectUser = (user) => {
    setFormData((prev) => ({
      ...prev,
      [selectedUserType]:
        selectedUserType === "assignedTo"
          ? [...new Set([...prev.assignedTo, user])]
          : user,
    }));
    setShowUserList(false);
  };

  const handleRemoveUser = (userToRemove) => {
    setFormData((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.filter((user) => user !== userToRemove),
    }));
  };

  const handleAddReference = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const BUCKET_NAME = "task-m";
    const uploadToS3 = async () => {
      const fileName = `${Date.now()}-${file.name}`;
      const params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      };

      try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        const region = "us-east-1";
        return `https://${BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}`;
      } catch (err) {
        console.error("S3 upload error:", err);
        return null;
      }
    };

    setUploading(true);
    const fileUrl = await uploadToS3();
    setUploading(false);

    if (fileUrl) {
      setFormData((prev) => ({
        ...prev,
        referenceFileUrl: [...prev.referenceFileUrl, fileUrl],
      }));
      setDisplayReferences((prev) => [
        ...prev,
        {
          name: file.name,
          size: file.size,
          url: fileUrl,
        },
      ]);
    } else {
      alert("Failed to upload. Try again.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.taskName) newErrors.taskName = "Task name is required.";
    if (!formData.deadline) newErrors.deadline = "Deadline is required.";
    if (formData.assignedTo.length === 0)
      newErrors.assignedTo = "Assign at least one person.";
    if (!formData.reviewers) newErrors.reviewers = "Reviewer is required.";
    if (!formData.project) newErrors.project = "Select a project.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.priority) newErrors.priority = "Priority is required.";
    if (!formData.taskDescription)
      newErrors.taskDescription = "Description is required.";

    // Reference file is now optional
    // if (formData.referenceFileUrl.length === 0)
    //   newErrors.referenceFileUrl = "Add at least one reference.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("task/addTask", formData);
      if (response.status === 200 || response.status === 201) {
        setIsPopupVisible(true);
        setFormData({
          taskName: "",
          deadline: "",
          assignedTo: [],
          assignedBy: "john",
          reviewers: "",
          priority: "Low",
          taskDescription: "",
          referenceFileUrl: [],
          category: "",
          project: "",
        });
        setDisplayReferences([]);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const toggleSelectAll = () => {
    setSelectAll((prev) => {
      const newState = !prev;
      if (newState) {
        setFormData((prevData) => ({
          ...prevData,
          assignedTo: users.map((user) => user),
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          assignedTo: [],
        }));
      }
      return newState;
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      {/* Success Modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] sm:w-96 text-center">
            <Icon
              icon="mdi:check-circle"
              className="text-teal-500"
              width={48}
            />
            <h2 className="text-xl font-semibold mt-2">Task Added!</h2>
            <p className="text-sm text-gray-600 mt-1">
              Your task has been successfully created.
            </p>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Task Heading */}
      <h1 className="text-3xl sm:text-3xl lg:text-4xl font-semibold text-teal-600 mb-6 text-center">
        ADD TASK
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Task Name */}
        <div>
          <label className="block font-medium">Task Name</label>
          <input
            type="text"
            name="taskName"
            value={formData.taskName}
            onChange={handleInputChange}
            className={`mt-1 w-full border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-teal-400 ${
              errors.taskName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.taskName && (
            <p className="text-red-500 text-sm">{errors.taskName}</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className={`mt-1 w-full border p-2 rounded-md shadow-sm ${
              errors.deadline ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm">{errors.deadline}</p>
          )}
        </div>

        {/* Assigned To */}
        <div className="md:col-span-2">
          <label className="block font-medium">Assigned To</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.assignedTo.map((member, index) => (
              <div
                key={index}
                className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                <span>{member}</span>
                <button type="button" onClick={() => handleRemoveUser(member)}>
                  <Icon icon="mdi:close" width={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setSelectedUserType("assignedTo");
                setShowUserList(true);
              }}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
            >
              <Icon icon="ic:outline-add" />
            </button>
          </div>

          {/* Select All / Deselect All Button */}
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={toggleSelectAll}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                selectAll
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-teal-600"
              } hover:bg-teal-700 hover:text-white`}
            >
              {selectAll ? "Deselect All" : "Select All"}
            </button>
          </div>

          {errors.assignedTo && (
            <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>
          )}
        </div>

        {/* Priority */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Priority</label>
          <div className="flex gap-3">
            {["Low", "Normal", "Urgent"].map((level) => (
              <button
                key={level}
                type="button"
                className={`px-4 py-1 rounded-full transition ${
                  formData.priority === level
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, priority: level }))
                }
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Task Description */}
        <div className="md:col-span-2">
          <label className="block font-medium">Task Description</label>
          <textarea
            name="taskDescription"
            value={formData.taskDescription}
            onChange={handleInputChange}
            rows={4}
            className={`mt-1 w-full border p-2 rounded-md shadow-sm ${
              errors.taskDescription ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {/* Reference Upload */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Reference Files</label>
          <div className="flex flex-wrap gap-3">
            {displayReferences.map((ref, i) => (
              <div
                key={i}
                className="p-3 bg-gray-100 rounded-md w-[200px] shadow-sm"
              >
                <p className="truncate text-sm font-medium">{ref.name}</p>
                <p className="text-xs text-gray-500">
                  {(ref.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ))}
            {uploading && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Icon icon="mdi:loading" className="animate-spin" width={20} />
                <span>Uploading...</span>
              </div>
            )}
            <div>
              <input
                type="file"
                hidden
                id="fileInput"
                onChange={handleAddReference}
              />
              <button
                type="button"
                onClick={() => document.getElementById("fileInput").click()}
                className="flex items-center gap-2 border px-4 py-2 rounded bg-white hover:bg-gray-100 text-sm"
              >
                <Icon icon="mdi:upload" width={18} />
                Upload
              </button>
            </div>
          </div>
          {errors.referenceFileUrl && (
            <p className="text-red-500 text-sm mt-2">
              {errors.referenceFileUrl}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* User List Modal */}
      {showUserList && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Select a User</h3>
            <ul className="max-h-64 overflow-y-auto space-y-2">
              {users.map((user, index) => (
                <li
                  key={index}
                  className="p-2 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectUser(user)}
                >
                  {user}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowUserList(false)}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTasks;
