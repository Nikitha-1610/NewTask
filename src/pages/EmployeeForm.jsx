import React, { useState } from "react";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    appliedDate: "",
    employeeID: "",
    dob: "",
    mailID: "",
    phoneNumber: "+91",
    altPhoneNumber: "+91",
    address: "",
    currentCTC: "",
    expectedCTC: "",
    joiningDate: "",
    previousCompany: "",
    appliedRole: "",
    positionName: "",
    referenceEmployeeID: "",
    teamLead: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Remaining fields */}
          {[
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
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
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
