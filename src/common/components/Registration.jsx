import React, { useState } from "react";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    appliedDate: "",
    dob: "",
    employeeID: "",
    mailID: "",
    currentCTC: "",
    phoneNumber: "",
    phoneCountryCode: "+91",
    alternativePhone: "",
    alternativeCountryCode: "+91",
    address: "",
    appliedRole: "",
    expectedCTC: "",
    joiningDate: "",
    previousCompany: "",
    positionName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Registration
        </h1>
        <p className="text-center mb-8 text-gray-500">
          Fill all the details which are mandatory for the registration
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block font-medium">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Applied Date *</label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">DOB *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">
              If Reference, Employee ID
            </label>
            <input
              type="text"
              name="employeeID"
              value={formData.employeeID}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter reference employee ID"
            />
          </div>
          <div>
            <label className="block font-medium">Mail ID *</label>
            <input
              type="email"
              name="mailID"
              value={formData.mailID}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter your mail ID"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Current CTC *</label>
            <input
              type="number"
              name="currentCTC"
              value={formData.currentCTC}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter current CTC"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number *</label>
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
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border rounded-r-md p-2"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">
              Alternative Phone Number *
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
                {/* Add more country codes as needed */}
              </select>
              <input
                type="tel"
                name="alternativePhone"
                value={formData.alternativePhone}
                onChange={handleChange}
                className="w-full border rounded-r-md p-2"
                placeholder="Enter an alternative phone number"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter your address"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Applied Role *</label>
            <input
              type="text"
              name="appliedRole"
              value={formData.appliedRole}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter applied role"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Expected CTC *</label>
            <input
              type="number"
              name="expectedCTC"
              value={formData.expectedCTC}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter expected CTC"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Joining Date *</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Previous Company *</label>
            <input
              type="text"
              name="previousCompany"
              value={formData.previousCompany}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter previous company name"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Position Name *</label>
            <input
              type="text"
              name="positionName"
              value={formData.positionName}
              onChange={handleChange}
              className="w-full border rounded-md p-2 mt-2"
              placeholder="Enter position name"
              required
            />
          </div>
          <div className="col-span-full flex justify-center">
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
