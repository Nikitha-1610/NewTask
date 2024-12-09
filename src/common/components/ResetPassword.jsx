import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "../../assets/BgImage.jpg";
import axiosInstance from "../../common/utils/axios/axiosInstance";

const ResetPasswordPage = ({ userName }) => {
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const [formData, setFormData] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    containsNumberOrSymbol: false,
    doesNotContainUserInfo: false,
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (password) => {
    setFormData((prevData) => ({ ...prevData, newPassword: password }));

    if (!password) {
      setPasswordValidations({
        length: false,
        containsNumberOrSymbol: false,
        doesNotContainUserInfo: false,
      });
      setPasswordStrength("");
      return;
    }

    const validations = {
      length: password.length >= 8,
      containsNumberOrSymbol: /[0-9!@#$%^&*]/.test(password),
      doesNotContainUserInfo: !password.includes(userName),
    };

    setPasswordValidations(validations);

    const strength = Object.values(validations).filter(Boolean).length;
    setPasswordStrength(
      strength === 1 ? "Weak" : strength === 2 ? "Medium" : "Strong"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const { length, containsNumberOrSymbol, doesNotContainUserInfo } =
      passwordValidations;

    if (!length || !containsNumberOrSymbol || !doesNotContainUserInfo) {
      toast.error("Password does not meet all the criteria!");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `user/changePasswoad`,
        { password:newPassword,
          employeeId: employeeId
         }
      );
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred while resetting password!");
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
      <div className="lg:w-7/12 w-full flex items-center justify-center p-6 md:p-10 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-700">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div>
              <label htmlFor="previousPassword" className="block text-sm font-medium">
                Previous Password
              </label>
              <input
                type="password"
                id="previousPassword"
                name="previousPassword"
                value={formData.previousPassword}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:ring focus:ring-teal-400"
                required
              />
            </div> */}

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="w-full p-3 border rounded-md border-gray-300 focus:ring focus:ring-teal-400"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:ring focus:ring-teal-400"
                required
              />
              {formData.newPassword && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Password Strength: <strong>{passwordStrength}</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className={passwordValidations.length ? "text-green-600" : "text-gray-600"}>
                      At least 8 characters
                    </li>
                    <li className={passwordValidations.containsNumberOrSymbol ? "text-green-600" : "text-gray-600"}>
                      Contains a number or symbol
                    </li>
                    <li className={passwordValidations.doesNotContainUserInfo ? "text-green-600" : "text-gray-600"}>
                      Does not contain your username
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-teal-500 text-white py-3 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600"} transition`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPage;
