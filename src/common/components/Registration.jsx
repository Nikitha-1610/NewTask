import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios/axiosInstance";
import "font-awesome/css/font-awesome.min.css"; 

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    alterMobile: "",
    password: "",
    department: "",
    email: "",
    address: "",
    gender: "",
    DOB: "",
    reference: "",
    position: "",
    appliedDate: "",
    role: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    const requiredFields = ["name", "mobile", "email", "DOB", "position", "role"];
    requiredFields.forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axiosInstance.post("user/signup", {
          email: formData.email,
          password: formData.password,
        });

        console.log("API Response:", response.data);

        if (response.status === 200) {
          setSuccessMessage(response.data.message);
          localStorage.setItem("authToken", response.data.token);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setErrorMessage("Unexpected response. Please try again.");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "An error occurred. Please try again."
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#dff6f0]">
      <div className="w-full max-w-2xl bg-white p-7 rounded-md shadow-md relative">
        {/* FontAwesome Arrow Icon */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-2xl text-gray-700 hover:text-teal-500"
        >
          <i className="fa fa-arrow-left"></i> {/* Left arrow icon */}
        </button>

        <h2 className="text-center text-xl font-semibold text-gray-700 mb-2">
          Registration
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Fill all the details which are mandatory for Registration
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 text-sm">
          {Object.keys(formData).map((field) => {
            if (field === "department") {
              return (
                <div key={field} className="flex flex-col">
                  <label className="font-medium text-gray-700">
                    Department {errors.department && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`border p-2 rounded-md ${errors.department ? "border-red-500" : "border-cyan-200"}`}
                  >
                    <option value="">Select Department</option>
                    {["Design", "Development", "DevOps", "Marketing", "HR", "AI/ML"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field === "role") {
              return (
                <div key={field} className="flex flex-col">
                  <label className="font-medium text-gray-700">
                    Role {errors.role && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`border p-2 rounded-md ${errors.role ? "border-red-500" : "border-cyan-200"}`}
                  >
                    <option value="">Select Role</option>
                    {["Employee", "Intern"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={field} className="flex flex-col">
                <label className="font-medium text-gray-700 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}{" "}
                  {errors[field] && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.includes("Date") || field.includes("DOB") ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`border p-2 rounded-md ${errors[field] ? "border-red-500" : "border-cyan-200"}`}
                />
              </div>
            );
          })}

          <div className="col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {successMessage && (
          <div className="mt-4 text-center text-green-600">
            <p>{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 text-center text-red-600">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
