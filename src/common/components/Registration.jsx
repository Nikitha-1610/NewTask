import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "mobile" ? parseInt(value, 10) || 0 : value, // Ensure mobile is stored as an integer
    }));
  };

  const [showPassword, setShowPassword] = useState(false); // <-- Added this state
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev); // <-- Added this function
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    const requiredFields = ["name", "mobile","gender","password", "email", "DOB", "position","address","department", "role", "appliedDate"];
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
      setIsSubmitting(true); // Disable the button
  
      try {
        const response = await axiosInstance.post(
          "user/signup",
          {
            ...formData,
            mobile: Number(formData.mobile),
            alterMobile: Number(formData.alterMobile),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
            onClose: () => setIsSubmitting(false), // Enable button after toast
          });
          localStorage.setItem("authToken", response.data.token);
  
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setErrorMessage("Unexpected response. Please try again.");
          setIsSubmitting(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred. Please try again", {
          position: "top-right",
          onClose: () => setIsSubmitting(false), // Enable button after toast
        });
      }
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    const updatedValue =
      (name === "mobile" || name === "alterMobile")
        ? value === "" ? "" : Number(value) 
        : value;

    setFormData({ ...formData, [name]: updatedValue });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#dff6f0]">
         <ToastContainer />
      <div className="w-full max-w-2xl bg-white p-7 rounded-md shadow-md relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-2xl text-gray-700 hover:text-teal-500"
        >
          <i className="fa fa-arrow-left"></i>
        </button>

        <h2 className="text-center text-xl font-semibold text-gray-700 mb-2">
          Registration
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Fill all the details which are mandatory for Registration
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm">
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
            if (field === "password"){
              return (
                <div key={field} className="flex flex-col">
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

            
            


            if (field === "gender") {
              return (
                <div key={field} className="flex flex-col">
                  <label className="font-medium text-gray-700">
                    Gender {errors.role && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`border p-2 rounded-md ${errors.role ? "border-red-500" : "border-cyan-200"}`}
                  >
                    <option value="">Select Gender</option>
                    {["Male", "Female"].map((option) => (
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
                  {field.replace(/([A-Z])/g, " $1")} 
                  {errors[field] && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field === "DOB" || field === "appliedDate" ? "date" : field === "mobile" || field === "alterMobile" ? "number" : "text"}
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
  className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition disabled:bg-gray-400"
  disabled={isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Submit"}
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
