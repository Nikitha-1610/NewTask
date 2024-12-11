import { useEffect, useState } from "react";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
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
    appliedDate: ""  
  });

  const [teamLeads, setTeamLeads] = useState([]); // State to store team leads from API
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Generate Employee ID
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

  // Fetch team leads from API
  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await axiosInstance.get("employee/getOption/TeamLead");
        if (response?.data?.message) {
          setTeamLeads(response.data.message); // Response is an array of names
        }
      } catch (error) {
        console.error("Error fetching team leads:", error);
      }
    };

    fetchTeamLeads();
  }, []);

  // Handle input change for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Validate all fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required.`;
      }
    });
  
    const updatedFormData = { ...formData };
    updatedFormData.mobile = parseInt(formData.mobile, 10); 
  
    const dob = new Date(formData.DOB);
    updatedFormData.DOB = dob.toISOString().split('T')[0]; 
  
    const appliedDate = new Date(formData.appliedDate);
    updatedFormData.appliedDate = appliedDate.toISOString().split('T')[0]; 
  
    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const response = await axiosInstance.post("/employee/add", updatedFormData);
      if ([200, 201].includes(response.status)) {
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
      if (error.response) {
        console.error("Server Response Data:", error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-6 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-teal-600">
          Employee Form
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <InputField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
            <InputField label="Applied Date" name="appliedDate" type="date" value={formData.appliedDate} onChange={handleInputChange} error={errors.appliedDate} />
            
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
                  className="border border-gray-300 rounded-md px-3 py-2 flex-grow"
                  readOnly
                />
                <button
                  type="button"
                  onClick={generateEmployeeId}
                  className="ml-3 bg-teal-500 text-white px-4 py-2 rounded-md"
                >
                  Generate
                </button>
              </div>
              {errors.employeeID && <ErrorMessage message={errors.employeeID} />}
            </div>

            <InputField label="Phone Number" name="mobile" type="number" value={formData.mobile} onChange={handleInputChange} error={errors.mobile} />
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <ErrorMessage message={errors.password} />}
              {formData.password && formData.password.length < 8 && (
                <p className="text-sm text-red-500 mt-1">
                  Password must be at least 8 characters long.
                </p>
              )}
            </div>

            <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
            <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} error={errors.address} />
            <InputField label="Date of Birth" name="DOB" type="date" value={formData.DOB} onChange={handleInputChange} error={errors.DOB} />
            <InputField label="Reference" name="reference" value={formData.reference} onChange={handleInputChange} error={errors.reference} />
            <InputField label="Role" name="role" value={formData.role} onChange={handleInputChange} error={errors.role} />
            <InputField label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} error={errors.gender} />
            <InputField label="Position" name="position" value={formData.position} onChange={handleInputChange} error={errors.position} />
            <InputField label="Department" name="department" value={formData.department} onChange={handleInputChange} error={errors.department} />

            {/* Team Lead Dropdown */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Team Lead <span className="text-red-500">*</span>
              </label>
              <select
                name="teamLead"
                value={formData.teamLead}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select a Team Lead</option>
                {teamLeads.map((lead, index) => (
                  <option key={index} value={lead}>
                    {lead}
                  </option>
                ))}
              </select>
              {errors.teamLead && <ErrorMessage message={errors.teamLead} />}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-teal-500 text-white px-6 py-2 rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, onChange, error }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2"
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

const ErrorMessage = ({ message }) => <p className="text-sm text-red-500 mt-1">{message}</p>;

export default EmployeeForm;
