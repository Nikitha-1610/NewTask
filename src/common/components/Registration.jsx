import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    mailId: "",
    phoneNumber: "",
    phoneCountryCode: "+91",
    altPhoneNumber: "",
    alternativeCountryCode: "+91",
    address: "",
    appliedRole: "",
    appliedDate: "",
    refEmployeeId: "",
    currentCtc: "",
    expectedCtc: "",
    joiningDate: "",
    prevCompany: "",
    positionName: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Show success message
      setSuccessMessage("Registration Successful! Redirecting to Sign In...");

      // Redirect to the sign-in page after 3 seconds
      setTimeout(() => {
        navigate("/login"); // Replace with your actual sign-in route
      }, 3000);
    }
  };

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#dff6f0]">
      <div className="w-full max-w-6xl bg-white p-8 rounded-md shadow-md">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          Registration
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Fill all the details which is mandatory for the Registration
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Full Name {errors.fullName && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`border p-2 rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
            />
          </div>

          

            {/* DOB */}
            <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              DOB {errors.dob && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Mail ID */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Mail ID {errors.mailId && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              name="mailId"
              value={formData.mailId}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.mailId ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Phone Number {errors.phoneNumber && <span className="text-red-500">*</span>}
            </label>
            <div className="flex">
              <select
                name="phoneCountryCode"
                value={formData.phoneCountryCode}
                onChange={handleChange}
                className="border rounded-l-md p-2 bg-gray-50"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full border rounded-r-md p-2 ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          {/* Alternative Phone Number */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Alternative Phone Number{" "}
              {errors.altPhoneNumber && <span className="text-red-500">*</span>}
            </label>
            <div className="flex">
              <select
                name="alternativeCountryCode"
                value={formData.alternativeCountryCode}
                onChange={handleChange}
                className="border rounded-l-md p-2 bg-gray-50"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="text"
                name="altPhoneNumber"
                value={formData.altPhoneNumber}
                onChange={handleChange}
                className={`w-full border rounded-r-md p-2 ${
                  errors.altPhoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Address {errors.address && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Applied Role */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Applied Role {errors.appliedRole && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="appliedRole"
              value={formData.appliedRole}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.appliedRole ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Applied Date */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Applied Date {errors.appliedDate && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.appliedDate ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Reference ID */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              If reference, Employee ID{" "}
              {errors.refEmployeeId && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="refEmployeeId"
              value={formData.refEmployeeId}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.refEmployeeId ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Current CTC */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Current CTC {errors.currentCtc && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="currentCtc"
              value={formData.currentCtc}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.currentCtc ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Expected CTC */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Expected CTC {errors.expectedCtc && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="expectedCtc"
              value={formData.expectedCtc}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.expectedCtc ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Joining Date */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Joining Date {errors.joiningDate && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.joiningDate ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Previous Company */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Previous Company{" "}
              {errors.prevCompany && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="prevCompany"
              value={formData.prevCompany}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.prevCompany ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Position Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">
              Position Name {errors.positionName && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name="positionName"
              value={formData.positionName}
              onChange={handleChange}
              className={`border p-2 rounded-md ${
                errors.positionName ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          
          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Display success message if registration is successful */}
        {successMessage && (
          <div className="mt-4 text-center text-green-600">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
