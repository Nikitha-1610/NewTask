import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import AWS from "aws-sdk"; // Import AWS SDK

const AddTasks = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    dueDate: "",
    members: [],
    reviewers: "",
    priority: "Low",
    description: "",
    references: [],
  });

  const [showUserList, setShowUserList] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [users, setUsers] = useState([]);

  // Configure AWS S3
  const s3 = new AWS.S3({
    accessKeyId: "YOUR_AWS_ACCESS_KEY", // Replace with your AWS Access Key
    secretAccessKey: "YOUR_AWS_SECRET_KEY", // Replace with your AWS Secret Key
    region: "YOUR_AWS_REGION", // Replace with your AWS region
  });

  const getAllEmp = async () => {
    try {
      const response = await axiosInstance.get("employee/getMembers/24110004");
      setUsers(response?.data?.message);
    } catch (error) {
      console.error("Error syncing with server:", error);
    }
  };

  useEffect(() => {
    getAllEmp();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectUser = (user) => {
    setFormData((prev) => ({
      ...prev,
      [selectedUserType]:
        selectedUserType === "members" ? [...prev.members, user] : user,
    }));
    setShowUserList(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileDetails = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB", // Convert size to MB
      lastModified: new Date(file.lastModified).toLocaleDateString(),
    };

    try {
      // Upload file to AWS S3
      const params = {
        Bucket: "YOUR_S3_BUCKET_NAME", // Replace with your bucket name
        Key: `uploads/${file.name}`, // Specify the folder path in S3
        Body: file,
        ContentType: file.type,
      };

      const uploadResult = await s3.upload(params).promise();
      const fileUrl = uploadResult.Location; // Retrieve the uploaded file's URL

      // Update formData with the uploaded file
      setFormData((prev) => ({
        ...prev,
        references: [...prev.references, { ...fileDetails, url: fileUrl }],
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Optionally, send this data to a backend API
  };

  return (
    <div className="w-full p-6">
      <form onSubmit={handleSubmit} className="w-8/12">
        {/* Project Name and Due Date */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold">Project Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="Enter project name"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold">Due Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Members
          </label>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            {/* Left Section: Icon and Added Members */}
            <div className="flex items-center gap-2">
              {/* Add Member Icon */}
              <Icon
                icon="ic:sharp-person-add"
                className="text-gray-600"
                height={22}
                width={22}
              />

              {/* Dynamically Render Members */}
              {formData.members.map((member, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs"
                >
                  {member}
                </span>
              ))}
            </div>

            {/* Right Section: Add Button */}
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-400"
              onClick={() => {
                setSelectedUserType("members");
                setShowUserList(true);
              }}
            >
              <Icon
                icon="ic:outline-add"
                className="text-gray-600"
                height={20}
                width={20}
              />
            </button>
          </div>
        </div>
        {/* Members Section */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Reviewer
          </label>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            {/* Left Section: Icon and Added Members */}
            <div className="flex items-center gap-2">
              {/* Add Member Icon */}
              <Icon
                icon="ic:sharp-person-add"
                className="text-gray-600"
                height={22}
                width={22}
              />

              {formData.reviewers && (
                <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs">
                  {formData.reviewers}
                </span>
              )}
            </div>

            {/* Right Section: Add Button */}
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-400"
              onClick={() => {
                setSelectedUserType("reviewers");
                setShowUserList(true);
              }}
            >
              <Icon
                icon="ic:outline-add"
                className="text-gray-600"
                height={20}
                width={20}
              />
            </button>
          </div>
        </div>

        {/* Priority and Description */}
        <div className="flex-col space-y-4 items-center mb-4">
          <label className="text-sm font-semibold mr-2">Priority</label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`${
                formData.priority === "Low"
                  ? "bg-teal-200 text-yellow-700"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-1 rounded-full flex justify-center items-center gap-2`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, priority: "Low" }))
              }
            >
              <div className=" h-2 w-2 bg-yellow-400 rounded-full"></div>
              Low
            </button>
            <button
              type="button"
              className={`${
                formData.priority === "Normal"
                  ? "bg-blue-200 text-blue-700"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-1 rounded-full flex justify-center items-center gap-2`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, priority: "Normal" }))
              }
            >
              <div className=" h-2 w-2 bg-green-400 rounded-full"></div>
              Normal
            </button>
            <button
              type="button"
              className={`${
                formData.priority === "Urgent"
                  ? "bg-red-200 text-red-700"
                  : "bg-gray-200 text-gray-700"
              } px-4 py-1 rounded-full flex justify-center items-center gap-2`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, priority: "Urgent" }))
              }
            >
              <div className=" h-2 w-2 bg-teal-400 rounded-full"></div>
              Urgent
            </button>
          </div>
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded mt-4"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter a description of the task"
          />
        </div>

        {/* File References */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">References</label>
          <div className="flex gap-3 flex-wrap">
            {formData.references.map((ref, index) => (
              <div
                key={index}
                className="flex gap-2 items-center shadow-md p-4 border border-gray-300 rounded-lg bg-gray-50 w-full"
              >
                <div className="flex gap-3 items-center">
                  <Icon
                    icon="fa6-solid:file-pdf"
                    height={22}
                    width={22}
                    className="text-red-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {ref.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last Modified: {ref.lastModified}
                    </p>
                    <p className="text-xs text-gray-500">Size: {ref.size}</p>
                    <a
                      href={ref.url}
                      className="text-blue-600 text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* File Upload Input */}
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center h-24 w-14 rounded-md shadow-md bg-gray-100 cursor-pointer"
            >
              <Icon
                icon="mdi:add-bold"
                className="text-teal-500"
                height={30}
                width={30}
              />
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-400 text-white px-6 py-2 rounded-md mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTasks;
