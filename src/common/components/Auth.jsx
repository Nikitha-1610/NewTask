import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import bgImage from "../../assets/BgImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import axiosInstance from "../../common/utils/axios/axiosInstance";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!employeeId || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // Send login request
      const response = await axiosInstance.post("user/login", {
        employeeId,
        password,
      });

      // On successful login
      const userData = response.data;
      const token = response.data.token; // Assuming `token` is returned in the response
      toast.success("Login successful!");

      // Update Redux state with user data and token
      dispatch(login({ userData, token }));

      // Redirect based on role
      navigate(userData?.role === "admin" ? "/admin/dashboard" : "/user/home");
    } catch (error) {
      console.error("Login error:", error);

      const errorMessage =
        error.response?.data?.message || "Invalid employee ID or password!";
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

      {/* Right Side with Form */}
      <div className="lg:w-7/12 w-full flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="flex items-center justify-center lg:justify-start mb-6">
            <img src={logo} alt="Task Flow Logo" className="w-8 h-8 mr-2" />
            <h2 className="text-xl md:text-2xl font-semibold">Task Flow</h2>
          </div>

          {/* Sign In Form */}
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="signin-employee-id"
                className="text-sm font-medium"
              >
                Employee ID
              </label>
              <input
                id="signin-employee-id"
                type="text"
                placeholder="Enter Employee ID"
                className="w-full p-3 border rounded-md border-teal-400"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="signin-password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="signin-password"
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 border rounded-md border-teal-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-md mt-4"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
