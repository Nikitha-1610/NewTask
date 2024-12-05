import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import bgImage from "../../assets/BgImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import axiosInstance from "../../common/utils/axios/axiosInstance";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign-Up and Sign-In

  // Sign-Up Form State
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    confirmPassword: "",
  });

  // Sign-In Form State
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = () => setIsSignUp(!isSignUp);

  // Handle input change for Sign-Up
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { emailId, password, confirmPassword } = formData;

    if (!emailId || !password || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    try {
      // Send Sign-Up request
      const response = await axiosInstance.post("user/signup", formData);

      if (response.data.success) {
        toast.success("Account created successfully!");
        setTimeout(() => toggleForm(), 1500); // Switch to sign-in form after success
      } else {
        toast.error(response.data.message || "Sign-Up failed!");
      }
    } catch (error) {
      console.error("Sign-Up error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred!";
      toast.error(errorMessage);
    }
  };

  const handleRegistration=() =>{
    navigate("/register"); // Navigate to the RegistrationPage
  };
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!employeeId || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      // Send Sign-In request
      const response = await axiosInstance.post("user/login", {
        employeeId,
        password,
      });

      // On successful login
      const userData = response.data;
      const token = response.data.token; // Assuming token is returned in the response
      toast.success("Login successful!");

      // Update Redux state with user data and token
      dispatch(login({ userData, token }));

      // Redirect based on role
      navigate(userData?.role === "TeamLead" ? "/admin/dashboard" : "/user/home");
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

          {/* Toggle Sign-Up/Sign-In */}
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className={`py-2 px-4 rounded-md ${
                isSignUp
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className={`py-2 px-4 rounded-md ${
                !isSignUp
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>

          {/* Sign-Up Form */}
          {isSignUp ? (
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="emailId" className="text-sm font-medium">
                  Email ID
                </label>
                <input
                  id="emailId"
                  type="email"
                  name="emailId"
                  placeholder="Enter Email ID"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleRegistration}
                className="w-full bg-teal-500 text-white py-3 rounded-md mt-4"
              >
                Register
              </button>
            </form>
          ) : (
            // Sign-In Form
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="employeeId" className="text-sm font-medium">
                  Employee ID
                </label>
                <input
                  id="employeeId"
                  type="text"
                  name="employeeId"
                  placeholder="Enter Employee ID"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-md mt-4"
              >
                Log In
              </button>
            </form>
          )}

          <p className="text-center text-xs text-gray-500 mt-4">
            By signing up to create an account I accept <br />
            Company's <span className="text-teal-500">Terms of use</span> &{" "}
            <span className="text-teal-500">Privacy Policy</span>.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
