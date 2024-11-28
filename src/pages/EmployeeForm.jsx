import { useEffect, useState } from "react";
// import { Icon } from "@iconify/react";
import axiosInstance from "../utilities/axios/axiosInstance";


const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    appliedDate: "",
    employeeID: "",
    DOB: "",
    email: "",
    mobile: "",   
    address: "",
    // currentCTC: "",
    // expectedCTC: "",
    // joiningDate: "",
    // previousCompany: "",
    role: "",
    position: "",
    reference: "",
    teamLead: "",
  });

  
  const [users, setUsers] = useState([]);
 
  const getAllEmp = async () => {
    try {
      const response = await axiosInstance.get("employee/getMembers/24110018");
      console.log(response.data.message);

      setUsers(response?.data?.message);
    } catch (error) {
      console.error("Error syncing with server:", error);
      // toast.error("Failed to fetch users.");
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

 

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      console.log("Submitting Form Data:", formData);

      // Make the API POST request
      const response = await axiosInstance.post("employee/add", formData);

      // Handle success
      if (response.status === 200 || response.status === 201) {
        console.log("Server Response:", response.data);

        // Reset form (if needed)
        setFormData({
          name: "",
          appliedDate: "",
          employeeID: "",
          DOB: "",
          email: "",
          mobile: "",   
          address: "",
          // currentCTC: "",
          // expectedCTC: "",
          // joiningDate: "",
          // previousCompany: "",
          role: "",
          position: "",
          reference: "",
          teamLead: "",
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
                value={formData.employeeID}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-grow"
              />
              <button
                className="ml-3 bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                onClick={() =>
                  alert("Generate Employee ID functionality not implemented.")
                }
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
              name="useremail"
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
              Alternate Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
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
              Current CTC<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Current"
              value={formData.current}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Expected CTC<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Expected"
              value={formData.expected}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Joining Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="joining"
              value={formData.joining}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Previous Company<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="previous"
              value={formData.previous}
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
          


          

          




          {/* Remaining fields */}
          {/* {[
            ["dob", "DOB", "date"],
            ["mailID", "Mail ID", "email"],
            ["phoneNumber", "Phone Number", "tel"],
            ["altPhoneNumber", "Alternative Phone Number", "tel"],
            ["address", "Address", "text"],
            ["currentCTC", "Current CTC", "number"],
            ["expectedCTC", "Expected CTC", "number"],
            ["joiningDate", "Joining Date", "date"],
            ["previousCompany", "Previous Company", "text"],
            ["appliedRole", "Applied Role", "text"],
            ["positionName", "Position Name", "text"],
            ["referenceEmployeeID", "If reference, Employee ID", "text"],
          ].map(([name, label, type]) => (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                {label}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          ))} */}
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
