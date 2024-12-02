import { useEffect, useState } from "react";
// import { Icon } from "@iconify/react";
import axiosInstance from "../../common/utils/axios/axiosInstance";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    employeeID: "",
    name: "",
    mobile: 0,
    password: "",
    email: "",
    address: "",
    DOB: "",
    reference: "",
    role: "",
    gender: "",
    position: "",
    department: "",
    teamLead: "",
    appliedDate: "",
  });

  const [setUsers] = useState([]);

  const getAllEmp = async () => {
    try {
      const response = await axiosInstance.get("employee/getMembers/24110004");
      console.log(response.data.message);

      setUsers(response?.data?.message);
    } catch (error) {
      console.error("Error syncing with server:", error);
      // toast.error("Failed to fetch users.");
    }
  };
  const generateEmployeeId = async () => {
    try {
      const response = await axiosInstance.get("employee/generateId");

      if (response?.data?.message) {
        const generatedId = response.data.message; // Assuming the response contains the generated ID
        console.log("Generated Employee ID:", generatedId);

        // Update the employeeID in the form data
        setFormData((prev) => ({
          ...prev,
          employeeID: generatedId,
        }));
      }
    } catch (error) {
      console.error("Error generating Employee ID:", error);
      // toast.error("Failed to generate Employee ID. Please try again later.");
    }
  };
  useEffect(() => {
    getAllEmp();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "mobile" ? parseInt(value) || 0 : value, // Ensure mobile is stored as an integer
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting Form Data:", formData);

      // Make the API POST request
      const response = await axiosInstance.post("employee/add", formData);
      console.log(response);

      // Handle success
      if (response.status === 200 || response.status === 201) {
        console.log("Server Response:", response.data);

        // Reset form (if needed)
        setFormData({
          employeeID: "",
          name: "",
          mobile: 0,
          password: "",
          email: "",
          address: "",
          DOB: "",
          reference: "",
          role: "",
          gender: "",
          position: "",
          department: "",
          teamLead: "",
          appliedDate: "",
        });
      } else {
        console.error("Unexpected response:", response);
        // toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      // toast.error("Failed to submit the form. Please try again later.");
    }
  };
  return (
    <div className="min-h-screen  flex flex-col items-center ">
      <div className="w-full max-w-6xl bg-white p-6 sm:p-8 ">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-teal-600">
          Employee Form
        </h1>

        {/* Grid container */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Applied Date */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Applied Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Employee ID */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label className="text-gray-700 font-medium mb-1">
              Employee ID<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="text"
                name="employeeID"
                value={formData.employeeID} // Controlled input tied to formData
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-grow"
              />
              <button
                className="ml-3 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                type="button" // Prevent form submission
                onClick={generateEmployeeId}
              >
                Generate
              </button>
            </div>
          </div>

          {/* Team Lead */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Team Lead<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="teamLead"
              value={formData.teamLead}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              DOB<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Mail Id<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Gender<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Department<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Applied Role<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Position Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              If reference,Employee ID<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
