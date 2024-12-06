import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "../../assets/BgImage.jpg";
import logo from "../../assets/logo.png";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice.jsx";

const AuthPage = () => {
  const [formData, setFormData] = useState({ employeeId: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { employeeId, password } = formData;

    if (!employeeId || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await axiosInstance.post("user/login", {
        employeeId,
        password,
      });

      console.log("Login response:", response.data);

      const { token, role } = response.data;
      if (token) {
        toast.success("Login successful!");
        localStorage.setItem("authToken", token);
        dispatch(login({ userData: response.data, token }));

        navigate(role === "TeamLead" ? "/admin/dashboard" : "/user/home");
      } else {
        toast.error("Authentication failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Invalid credentials!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side: Welcome Section */}
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

      {/* Right Side: Login Form */}
      <div className="lg:w-7/12 w-full flex items-center justify-center p-6 md:p-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
          <p className="text-gray-500 text-center mb-6">Please log in to continue</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                EmployeeId
              </label>
              <input
                id="employeeId"
                type="text"
                name="employeeId"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                value={formData.employeeId}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
                  name="password"
                  placeholder="********"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility
                >
                  👁️
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-teal-600 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-teal-600 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-teal-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AuthPage;
