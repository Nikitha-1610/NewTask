import { useEffect, useState } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  const [showPassword, setShowPassword] = useState(false); // <-- Added this state
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev); // <-- Added this function


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
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleInputChange}
      placeholder="Enter your password"
      className="border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full" // Ensure full width and right padding for icon
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute right-3 top-1/2 transform -translate-y-1/2" 
    >
      {showPassword ? (
        <FaEyeSlash className="w-5 h-5 text-gray-600" />
      ) : (
        <FaEye className="w-5 h-5 text-gray-600" />
      )}
    </button>
  </div>
  {errors.password && (
    <p className="text-sm text-red-500 mt-1">{errors.password}</p>
  )}
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


