import axios from "axios";
import React,{ useState, useEffect } from "react";

import { Icon } from "@iconify/react";
//import { ClipLoader } from "react-spinners"; // Import the loader

import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";


const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const employeeId = localStorage.getItem('employeeId');
  const [errors, setErrors] = React.useState({});



  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // Ensures valid domain and TLD
    return emailRegex.test(email);
  };
  

const validateMobileNumber = (number) => {
  const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile number regex
  return mobileRegex.test(number);
};

const handleInputChanges = (e) => {
  const { name, value } = e.target;

  // Update the edited data
  setEditedData((prevData) => ({ ...prevData, [name]: value }));

  // Handle validation
  if (name === "email") {
    if (!validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors; // Remove the email error
        return rest;
      });
    }
  }

  // Validation for mobile and alterMobile
  if (name === "mobile" ) {
    if (!validateMobileNumber(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid 10-digit mobile number starting with 6-9.",
      }));
    } else {
      setErrors((prevErrors) => {
        const { [name]: removedError, ...rest } = prevErrors; // Remove the specific mobile error
        return rest;
      });
    }
  }
};


{/* State to Manage Errors */}


useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(
        `employee/get/${employeeId}`
      );
      if (response.data.status === 200) {
        const fetched = response.data.message;

        const localData = {
          name: localStorage.getItem("name") || fetched.name,
          email: localStorage.getItem("email") || fetched.email,
          mobile: localStorage.getItem("mobile") || fetched.mobile,
          Department: localStorage.getItem("Department") || fetched.Department,
          Section: localStorage.getItem("Section") || fetched.Section,
          RegisterNumber: localStorage.getItem("RegisterNumber") || fetched.RegisterNumber,
          profileImage: fetched.profileImage,
          position: fetched.position,
        };

        setUserData(localData);
        setEditedData(localData);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file); 
  
      const reader = new FileReader();
      reader.onload = () => {
        setEditedData((prevData) => ({
          ...prevData,
          profileImage: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
  
      Object.keys(editedData).forEach((key) =>
        formData.append(key, editedData[key])
      );
  
      const response = await axiosInstance.put(
        `employee/update/${employeeId}`,
        {
          name: editedData.name,
          email: editedData.email,
          Department: editedData.Department,
          Class: editedData.Class,
          RegisterNumber: Number(editedData.RegisterNumber),
          mobile: Number(editedData.mobile),
        }
      );
  
      if (response.status === 200) {
        // Save data to localStorage, including the Section field
        localStorage.setItem("name", editedData.name || "");
        localStorage.setItem("email", editedData.email || "");
        localStorage.setItem("mobile", editedData.mobile || "");
        localStorage.setItem("Department", editedData.Department || "");
        localStorage.setItem("Section", editedData.Section || ""); // <-- Add this line for Section
        localStorage.setItem("RegisterNumber", editedData.RegisterNumber || "");
  
        toast.success("Changes saved successfully!");
        setUserData(editedData);
        setIsEditing(false);
      } else {
        throw new Error("Failed to save changes");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error saving changes: " + err.message);
    }
  };
  
  

  // Loader component to display while loading
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-40 z-50">
         <ReactLoading type="spin" color="#00bfae" height={50} width={50} />
      </div>
    );
  }
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;


  return (
   <div className="h-full bg-gradient-to-br from-white to-[#01C2B5] flex items-center justify-center py-4 sm:mt-0 mt-24">
  <div className="bg-white shadow-2xl rounded-lg px-10 py-2 w-full max-w-5xl h-auto sm:h-[500px] flex flex-col justify-center items-center">
  {/* Profile Section */}
  <div className="flex flex-col items-center mb-6 sm:mt-0">
    <div className="w-24 h-24 rounded-full bg-teal-200 flex items-center justify-center text-4xl text-white font-bold overflow-hidden">
      {userData.profileImage ? (
        <img
          src={userData.profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        userData.name[0]
      )}
    </div>
    <h2 className="text-2xl font-bold mt-4">{userData.name}</h2>
    <p className="text-gray-700">{userData.position}</p>
    <p className="text-gray-700">
     
    </p>
  </div>

  
<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-4 justify-items-center sm:justify-items-start text-center sm:text-left">
  <p>
    <strong>Email:</strong> {userData.email}
  </p>
  <p>
    <strong>Name:</strong> {userData.name}
  </p>
  <p>
    <strong>Mobile:</strong> {userData.mobile}
  </p>
  <p>
    <strong>Department:</strong> {userData.Department}
  </p>
  <p>
    <strong>Section:</strong> {userData.Section}
  </p>
  <p>
    <strong>RegisterNumber:</strong> {userData.RegisterNumber}
  </p>
  
  
 
  
 
</div>



  {/* Edit Profile Button */}
  <div className="mt-6 flex justify-center">
    <button
      onClick={() => setIsEditing(true)}
      className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600"
    >
      Edit Profile
    </button>
  </div>
</div>



      {/* Edit Profile Overlay */}
      {isEditing && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-4xl overflow-y-auto max-h-[90vh] relative">
      <button
        onClick={() => setIsEditing(false)}
        className="absolute top-4 right-4 text-black hover:text-green-800"
        aria-label="Close Edit Form"
      >
        <Icon icon="mdi:close" className="text-2xl font-bold" />
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 rounded-full bg-teal-200 flex items-center justify-center text-4xl text-white font-bold overflow-hidden">
          {editedData.profileImage ? (
            <img
              src={editedData.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            editedData.name[0]
          )}
          <label
            htmlFor="profileImage"
            className="absolute bottom-1 right-1 bg-teal-500 text-white p-2 rounded-full cursor-pointer hover:bg-teal-600"
            title="Edit Profile Image"
          >
            <Icon icon="mdi:pencil" className="text-sm" />
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Editable Fields */}
      <div className="space-y-6">
        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block font-bold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              placeholder="Name"
            />
          </div>
          <div>
  <label htmlFor="email" className="block font-bold mb-1">
    Email
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value={editedData.email || ""}
    onChange={handleInputChanges} 
    className={`w-full p-3 border rounded ${errors.email ? "border-red-500" : ""}`}
    placeholder="Email"
  />
  {errors.email && (
    <span className="text-red-500 text-sm mt-1">{errors.email}</span>
  )}
</div>


          <div>
  <label htmlFor="mobile" className="block font-bold mb-1">
    Mobile
  </label>
  <input
    type="text"
    id="mobile"
    name="mobile"
    value={editedData.mobile}
    onChange={handleInputChanges}
    className={`w-full p-3 border rounded ${errors.mobile ? "border-red-500" : ""}`}
    placeholder="Mobile"
  />
  {errors.mobile && (
    <span className="text-red-500 text-sm mt-1">{errors.mobile}</span>
  )}
</div>


<div>
  <label htmlFor="Department" className="block font-bold mb-1">
    Department
  </label>
  <input
    type="text"
    id="Department"
    name="Department"
    value={editedData.Department}
    onChange={handleInputChange}
    className="w-full p-3 border rounded"
    placeholder="Department"
  />
</div>


<div>
  <label htmlFor="section" className="block font-bold mb-1">
    Section
  </label>
  <input
    type="text"
    id="section"
    name="Section"  
    value={editedData.Section || ""}  
    onChange={handleInputChange}
    className="w-full p-3 border rounded"
    placeholder="Section"
  />
</div>


          <div>
  <label htmlFor="alterMobile" className="block font-bold mb-1">
    RegisterNumber
  </label>
  <input
    type="text"
    id="RegisterNumber"
    name="RegisterNumber"
    value={editedData.RegisterNumber || ""}
    onChange={handleInputChanges}
    className="w-full p-3 border rounded" 
    placeholder="RegisterNumber"
   
  />
 
</div>

          {/* <div>
            <label htmlFor="appliedDate" className="block font-bold mb-1">
              Applied Date
            </label>
            <input
              type="date"
              id="appliedDate"
              name="appliedDate"
              value={editedData.appliedDate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
          </div> */}

          {/* <div>
            <label htmlFor="reference" className="block font-bold mb-1">
              Reference
            </label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={editedData.reference}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              placeholder="Reference"
            />
          </div> */}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={saveChanges}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}





      <ToastContainer position="top-center" autoClose={3000} />
      
    </div>
  );
};

export default UserProfile;
