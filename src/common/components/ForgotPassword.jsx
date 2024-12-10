import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import Modal from "react-modal";
import bgImage from "../../assets/BgImage.jpg";
import axiosInstance from "../../common/utils/axios/axiosInstance";

const ForgetPasswordPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    // Validate employee ID
    const isValidEmployeeId = /^241100\d{1,9}$/.test(employeeId);
    if (!isValidEmployeeId) {
      toast.error("Invalid Employee ID. Must start with 241100 and have 1-9 digits.");
      return;
    }

    setLoading(true);
    try {
      // Call API to send OTP
      const response = await axiosInstance.get(`user/getOTP/${employeeId}`);

      if (response.data.status === 200 || response.data.success) {
        toast.success("OTP sent to your registered email successfully!");
        setIsOtpModalOpen(true); // Open OTP modal
      } else {
        const errorMessage =
          response.data.message || "Failed to send OTP! Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }

    setLoading(true);
    try {
      // Call API to verify OTP
      
      
      const response = await axiosInstance.post("user/verifyOtp", {
        employeeId,
        otp:Number(otp),
      });

      if (response.data.status === 200 || response.data.success) {
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          navigate(`/reset-password/${employeeId}`); // Navigate to reset password page
        }, 1500);
      } else {
        const errorMessage =
          response.data.message || "Invalid OTP! Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="lg:w-5/12 w-full text-white flex flex-col justify-between p-6 md:p-10">
        <div
          className="bg-cover bg-center rounded-2xl overflow-hidden w-full h-72 md:h-96 lg:h-full flex flex-col"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="text-center mt-10 md:mt-14">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">
              Welcome to Task Flow
            </h1>
            <p className="text-sm md:text-md lg:text-lg mt-2">
              Your Gateway to Effortless Management.
            </p>
          </div>
          <div className="text-center mt-10 md:mt-auto mb-6 lg:mb-10">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold">
              Seamless Collaboration
            </h2>
            <p className="text-sm md:text-md lg:text-lg mt-2">
              Effortlessly work together with your
              <br />
              team in real-time.
            </p>
          </div>
        </div>
      </div>


      {/* Right Section */}
      <div className="lg:w-7/12 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Forget Password
          </h2>

          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* Employee ID Input */}
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium">
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter your Employee ID"
                required
              />
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Modal
        isOpen={isOtpModalOpen}
        onRequestClose={() => setIsOtpModalOpen(false)}
        contentLabel="OTP Verification"
        ariaHideApp={false}
        className="modal-content bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-lg font-bold mb-4">Verify OTP</h3>
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter OTP"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ForgetPasswordPage;
