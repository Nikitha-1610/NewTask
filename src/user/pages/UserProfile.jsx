import axios from "axios";
import { useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import { ClipLoader } from "react-spinners"; // Import the loader
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const employeeId = localStorage.getItem('employeeId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/employee/get/${employeeId}`
        );
        if (response.data.status === 200) {
          setUserData(response.data.message);
          setEditedData(response.data.message);
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
      const reader = new FileReader();
      reader.onload = () => {
        setEditedData((prevData) => ({
          ...prevData,
          profileImage: reader.result, // Base64 encoding for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = async () => {
    try {
      // If there's an image, append it to FormData
      const formData = new FormData();
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      // Append other fields from editedData
      Object.keys(editedData).forEach((key) =>
        formData.append(key, editedData[key])
      );

      const response = await axios.put(
        "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/employee/update/24110001",
        formData
      );

      if (response.status === 200) {
        toast.success("Changes saved successfully!");
        setUserData({ ...editedData, profileImage: previewImage });
        setIsEditing(false);
      } else {
        throw new Error("Failed to save changes");
      }
    } catch (err) {
      toast.error("Error saving changes: " + err.message);
    }
  };

  // Loader component to display while loading
  if (loading) {
    return (
      <div className="p-6 text-center">
        <ClipLoader color="#01C2B5" loading={loading} size={50} />
      </div>
    );
  }
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;


  return (
   <div className="h-full bg-gradient-to-br from-white to-[#01C2B5] flex items-center justify-center py-4 sm:mt-0 mt-24">
  <div className="bg-white shadow-2xl rounded-lg px-10 py-2 w-full max-w-5xl h-auto sm:h-[500px] flex flex-col justify-center items-center">
  {/* Profile Section */}
  <div className="flex flex-col items-center mb-6 sm:mt-0">
    <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-4xl text-white font-bold overflow-hidden">
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
      <strong>Employee ID:</strong> {userData.employeeID}
    </p>
  </div>

  
<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-4 justify-items-center sm:justify-items-start text-center sm:text-left">
  <p>
    <strong>Email:</strong> {userData.email}
  </p>
  <p>
    <strong>Mobile:</strong> {userData.mobile}
  </p>
  <p>
    <strong>Address:</strong> {userData.address}
  </p>
  <p>
    <strong>Date of Birth:</strong> {userData.DOB}
  </p>
  <p>
    <strong>Role:</strong> {userData.role}
  </p>
  <p>
    <strong>Applied Date:</strong> {userData.appliedDate}
  </p>
  <p>
    <strong>Reference:</strong> {userData.reference}
  </p>
  <p>
    <strong>Created On:</strong> {new Date(userData.createdOn).toLocaleDateString()}
  </p>
  <p>
    <strong>Team Lead:</strong> {userData.teamLead}
  </p>
  <p>
    <strong>Team Members:</strong> {userData.teamMembers}
  </p>
</div>



  {/* Edit Profile Button */}
  <div className="mt-6 flex justify-center">
    <button
      onClick={() => setIsEditing(true)}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
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
        <div className="relative w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-4xl text-white font-bold overflow-hidden">
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
            className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
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
              value={editedData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              placeholder="Email"
            />
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
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              placeholder="Mobile"
            />
          </div>

          <div>
            <label htmlFor="address" className="block font-bold mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={editedData.address}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              placeholder="Address"
            />
          </div>

          <div>
            <label htmlFor="dob" className="block font-bold mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="DOB"
              value={editedData.DOB}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label htmlFor="role" className="block font-bold mb-1">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={editedData.role}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              placeholder="Role"
            />
          </div>

          <div>
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
          </div>

          <div>
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
          </div>
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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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

