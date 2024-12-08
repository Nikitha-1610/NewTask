import { useEffect, useState } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { FaEye } from "react-icons/fa";

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

  const [errors, setErrors] = useState({
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

  const generateEmployeeId = async () => {
    try {
      const response = await axiosInstance.get("employee/generateId");
      if (response?.data?.message) {
        const generatedId = response.data.message;
        setFormData((prev) => ({
          ...prev,
          employeeID: generatedId,
        }));
      }
    } catch (error) {
      console.error("Error generating Employee ID:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "mobile" ? parseInt(value, 10) || 0 : value, // Ensure mobile is stored as an integer
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
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
    };

    // Validation logic
    Object.keys(newErrors).forEach((field) => {
      if (!formData[field]) newErrors[field] = `${field} is required.`;
    });

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log("Submitting Form Data:", formData);

      const response = await axiosInstance.post(
        "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/employee/add",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Server Response:", response.data);

        setFormData({
          employeeID: "",
          name: "",
          mobile: "",
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
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
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
              className="border border-gray-300 ${errors.name ?} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"/>
            {errors.name && (<p className="text-sm text-red-500 mt-1">{errors.name}</p>)}
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
            {errors.appliedDate && (<p className="text-sm text-red-500 mt-1">{errors.appliedDate}</p>)}
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
              {errors.employeeID && (<p className="text-sm text-red-500 mt-1">{errors.employeeID}</p>)}
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
            {errors.teamLead && (<p className="text-sm text-red-500 mt-1">{errors.teamLead}</p>)}
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
            {errors.DOB && (<p className="text-sm text-red-500 mt-1">{errors.DOB}</p>)}
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
            {errors.email && (<p className="text-sm text-red-500 mt-1">{errors.email}</p>)}
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
            {errors.mobile && (<p className="text-sm text-red-500 mt-1">{errors.mobile}</p>)}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="border flex border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              
            />
             {/* Eye Button */}
             <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex absolute left-[940px] top-[400px]"
          >
            {showPassword ? (
             <svg
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             strokeWidth="1.5"
             stroke="currentColor"
             className="w-5 h-5"
           >  
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.222C3.436 8.928 3 9.864 3 12s.436 3.072.98 3.778A11.947 11.947 0 0012 18c3.9 0 7.248-1.845 9.02-4.222C20.564 15.072 21 14.136 21 12s-.436-3.072-.98-3.778A11.947 11.947 0 0012 6c-3.9 0-7.248 1.845-9.02 4.222z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.222C3.436 8.928 3 9.864 3 12s.436 3.072.98 3.778A11.947 11.947 0 0012 18c3.9 0 7.248-1.845 9.02-4.222C20.564 15.072 21 14.136 21 12s-.436-3.072-.98-3.778A11.947 11.947 0 0012 6c-3.9 0-7.248 1.845-9.02 4.222z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15l-4.5-4.5m9 0L12 15"
                />
              </svg>
            )}
          </button>
            {errors.password && (<p className="text-sm text-red-500 mt-1">{errors.password}</p>)}
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
            {errors.address && (<p className="text-sm text-red-500 mt-1">{errors.address}</p>)}
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
            {errors.gender && (<p className="text-sm text-red-500 mt-1">{errors.gender}</p>)}
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
            {errors.department && (<p className="text-sm text-red-500 mt-1">{errors.department}</p>)}
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
            {errors.role && (<p className="text-sm text-red-500 mt-1">{errors.role}</p>)}
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
            {errors.position && (<p className="text-sm text-red-500 mt-1">{errors.position}</p>)}
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
            {errors.reference && (<p className="text-sm text-red-500 mt-1">{errors.reference}</p>)}
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
