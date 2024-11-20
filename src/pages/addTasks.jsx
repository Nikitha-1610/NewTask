import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import TaskForm from '../components/TaskComp/TaskForm';


const AddTasks = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // To toggle the success message
  const [taskData, setTaskData] = useState({}); // Store form data (example)
  const [formMessage, setFormMessage] = useState("");
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all fields are filled
    const isFormFilled = Object.values(taskData).every(value => value !== "");
  
    if (isFormFilled) {
      setIsSubmitted(true); // Show success message
      setFormMessage("Form submitted successfully!");
  
      // // Apply blur effect to the background elements only
      // document.body.style.filter = "blur(2px)";

      const sidebar = document.querySelector(".sidebar");
      const navbar = document.querySelector(".navbar");
    
      if (sidebar) sidebar.style.filter = "blur(2px)";
      if (navbar) navbar.style.filter = "blur(2px)";
      // document.querySelector(".add-tasks-container").style.filter = "blur(2px)";
      document.querySelector(".left-container").style.filter = "blur(2px)";
      document.querySelector(".right").style.filter = "blur(2px)";
      
  
      // Ensure success message is not blurred
      document.querySelector(".success-message").style.filter = "none";
    } else {
      setIsSubmitted(false); // Show failure message
      setFormMessage("Please fill all the fields.");
    }
  };

  const handleClose = () => {
    setIsSubmitted(false); // Close success message
     // Remove blur effect

     const sidebar = document.querySelector(".sidebar");
      const navbar = document.querySelector(".navbar");
    
      if (sidebar) sidebar.style.filter = "none";
      if (navbar) navbar.style.filter = "none";
      // Remove blur effect from all background elements
  document.body.style.filter = "none";
  // document.querySelector(".add-tasks-container").style.filter = "none";
  document.querySelector(".left-container").style.filter = "none";
  document.querySelector(".add-task-btn").style.filter = "none";
  document.querySelector(".filter-btn").style.filter = "none";
  document.querySelector(".right").style.filter = "none";
  
    navigate("/addtasks");
  };


  const handleRefresh = () => {
    const isFormFilled = Object.values(taskData).every(value => value !== "");
    if (isFormFilled) {
      setIsSubmitted(true); // Set submission success
      setFormMessage("Form submitted successfully!");
    } else {
      setIsSubmitted(false); // Submission failure
      setFormMessage("Please fill all the fields.");
    }
  };

  const handleAddTaskClick = () => {
    // Triggering a page reload
    window.location.reload();
  };
  return (
<div className="add-tasks-container w-full flex flex-col md:flex-row h-full p-2 relative min-h-screen">
      {/* Left Container */}
      <div className={`left-container flex flex-col gap-6 p-4 sm:w-[340px] md:w-[500px] lg:w-[713px] ${isSubmitted ? "blur-sm" : ""}`}>
  <TaskForm taskData={taskData} setTaskData={setTaskData} />
</div>


      {/* Right Container for Buttons */}
      <div className="right absolute top-30 right-6 flex gap-4">
  <Link
    onClick={handleAddTaskClick}
    to="/addtasks"
    className="add-task-btn flex items-center gap-2 bg-[#01C2B5] text-white p-3 rounded-[19px] w-[120px] h-[35px] shadow-lg hover:bg-[#01B2A5] font-[600] font-sans sm:p-2 sm:w-[140px] sm:h-[42px] sm:text-[18px] text-[12px]"
  >
    <Icon icon="mdi:plus" width={24} height={24} />
    Add Task
  </Link>

  <Link
   
    className="filter-btn flex items-center gap-2 text-[#475569] p-3 rounded-md hover:bg-transparent font-sans font-[400] sm:p-2 sm:w-[120px] sm:h-[40px] w-[100px] text-[12px] sm:text-[18px]"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={13} viewBox="0 0 14 13" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.33333 6.77344C2.6555 6.77344 2.91667 7.0346 2.91667 7.35677V11.4401C2.91667 11.7623 2.6555 12.0234 2.33333 12.0234C2.01117 12.0234 1.75 11.7623 1.75 11.4401V7.35677C1.75 7.0346 2.01117 6.77344 2.33333 6.77344Z" fill="#475569"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.33333 0.357422C2.6555 0.357422 2.91667 0.618589 2.91667 0.940755V5.02409C2.91667 5.34625 2.6555 5.60742 2.33333 5.60742C2.01117 5.60742 1.75 5.34625 1.75 5.02409V0.940755C1.75 0.618589 2.01117 0.357422 2.33333 0.357422Z" fill="#475569"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.99935 5.60742C7.32152 5.60742 7.58268 5.86859 7.58268 6.19076V11.4408C7.58268 11.7629 7.32152 12.0241 6.99935 12.0241C6.67718 12.0241 6.41602 11.7629 6.41602 11.4408V6.19076C6.41602 5.86859 6.67718 5.60742 6.99935 5.60742Z" fill="#475569"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.99935 0.357422C7.32152 0.357422 7.58268 0.618589 7.58268 0.940755V3.85742C7.58268 4.17959 7.32152 4.44076 6.99935 4.44076C6.67718 4.44076 6.41602 4.17959 6.41602 3.85742V0.940755C6.41602 0.618589 6.67718 0.357422 6.99935 0.357422Z" fill="#475569"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6673 7.94141C11.9895 7.94141 12.2507 8.20257 12.2507 8.52474V11.4414C12.2507 11.7636 11.9895 12.0247 11.6673 12.0247C11.3452 12.0247 11.084 11.7636 11.084 11.4414V8.52474C11.084 8.20257 11.3452 7.94141 11.6673 7.94141Z" fill="#475569"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6673 0.357422C11.9895 0.357422 12.2507 0.618589 12.2507 0.940755V6.19076C12.2507 6.51292 11.9895 6.77409 11.6673 6.77409C11.3452 6.77409 11.084 6.51292 11.084 6.19076V0.940755C11.084 0.618589 11.3452 0.357422 11.6673 0.357422Z" fill="#475569"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0 7.35677C0 7.0346 0.261167 6.77344 0.583333 6.77344H4.08333C4.4055 6.77344 4.66667 7.0346 4.66667 7.35677C4.66667 7.67894 4.4055 7.9401 4.08333 7.9401H0.583333C0.261167 7.9401 0 7.67894 0 7.35677Z" fill="#475569"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.66602 3.85677C4.66602 3.5346 4.92718 3.27344 5.24935 3.27344H8.74935C9.07151 3.27344 9.33268 3.5346 9.33268 3.85677C9.33268 4.17894 9.07151 4.4401 8.74935 4.4401H5.24935C4.92718 4.4401 4.66602 4.17894 4.66602 3.85677Z" fill="#475569"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.33398 8.52474C9.33398 8.20257 9.59515 7.94141 9.91732 7.94141H13.4173C13.7395 7.94141 14.0007 8.20257 14.0007 8.52474C14.0007 8.84691 13.7395 9.10807 13.4173 9.10807H9.91732C9.59515 9.10807 9.33398 8.84691 9.33398 8.52474Z" fill="#475569"/>
    </svg>
    Filter
  </Link>
</div>


      {/* Success Message */}
      {isSubmitted && (
 <div className="success-message fixed top-0 left-0 w-full h-full flex justify-center items-center">
    <div className="success-container flex flex-col items-center gap-10 p-10 w-[500px] font-sans bg-white rounded-lg shadow-lg relative sm:w-[500px] sm:p-8 border-2 border-black z-90">
      {/* Close Icon */}
      <button onClick={handleClose} className="absolute top-4 right-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 36 36" fill="none">
          <path
            d="M20.121 18L24.3645 13.758C24.646 13.4765 24.8041 13.0948 24.8041 12.6967C24.8041 12.2987 24.646 11.917 24.3645 11.6355C24.083 11.354 23.7013 11.1959 23.3032 11.1959C22.9052 11.1959 22.5235 11.354 22.242 11.6355L18 15.879L13.758 11.6355C13.4765 11.354 13.0948 11.1959 12.6967 11.1959C12.2987 11.1959 11.917 11.354 11.6355 11.6355C11.354 11.917 11.1959 12.2987 11.1959 12.6967C11.1959 13.0948 11.354 13.4765 11.6355 13.758L15.879 18L11.6355 22.242C11.354 22.5235 11.1959 22.9052 11.1959 23.3032C11.1959 23.7013 11.354 24.083 11.6355 24.3645C11.917 24.646 12.2987 24.8041 12.6967 24.8041C13.0948 24.8041 13.4765 24.646 13.758 24.3645L18 20.121L22.242 24.3645C22.5235 24.646 22.9052 24.8041 23.3032 24.8041C23.7013 24.8041 24.083 24.646 24.3645 24.3645C24.646 24.083 24.8041 23.7013 24.8041 23.3032C24.8041 22.9052 24.646 22.5235 24.3645 22.242L20.121 18ZM18 33C9.7155 33 3 26.2845 3 18C3 9.7155 9.7155 3 18 3C26.2845 3 33 9.7155 33 18C33 26.2845 26.2845 33 18 33Z"
            fill="black"
          />
        </svg>
      </button>

      {/* Success Message */}
      <h2 className="text-xl font-semibold text-green-600 font-sans" style={{ color: "#1E293B", fontFamily: "sans serif", fontSize: "24px", fontWeight: "700", lineHeight: "normal" }}>
        Task Added Successfully!
      </h2>

      {/* Additional Content */}
      <p className="text-[#1E293B] text-[18px] font-semibold leading-[23px] tracking-[0.3px] text-center font-sans">
        Your task has been successfully added to this project.
      </p>

      {/* Great Button */}
      <button
    onClick={handleRefresh}
    className="bg-[#01C2B5] text-white text-[20px] w-[500px] px-[128px] py-[18px] rounded-full mt-6  sm:w-auto sm:px-12 sm:py-3 font-sans font-[600]"
  >
    Great
  </button>

    </div>
  </div>
)}


      {/* Submit Button */}
      {!isSubmitted && ( 
        <div className="submit-btn-container absolute bottom-[-240px] right-5 flex justify-center ">
          <button 
            onClick={handleSubmit}
            className="submit-btn   rounded-[var(--Spacing-8,8px)] bg-[#01C2B5] w-[85px] py-[10px] px-[12px] text-white shadow-lg flex items-center justify-center hover:bg-[#019F97] font-sans font-[600] sm:w-[150px] sm:h-[44px] sm:text-[20px] text-[12px]"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTasks;