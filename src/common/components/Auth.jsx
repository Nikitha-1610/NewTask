import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../common/utils/axios/axiosInstance";
import bgImage from "../../assets/BgImage.jpg";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice.jsx";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    // Basic validation to prevent form submission if there are empty fields
    if (!email || !password || !confirmPassword) {
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
      // Send sign-up request
      const response = await axiosInstance.post("user/signup", {
        email,
        password,
      });

      console.log("Sign-Up Response:", response.data);

      // Check if the status is 200 (Success)
      if (response.data.status === 200) {
        toast.success(response.data.message);

        const { token } = response.data;
        if (token) {
          localStorage.setItem("authToken", token);
        }

        // Navigate to login page after successful signup
        navigate("/register");
      } else {
        // Handle case where the email already exists
        if (response.data.message === "Email already exists. Please use a different email.") {
          toast.error(response.data.message); // Show the backend error message
        } else {
          toast.error(response.data.message || "Sign-Up failed!");
        }
      }
    } catch (error) {
      console.error("Sign-Up error:", error);

      // Handle error scenarios
      if (error.response) {
        // If the backend returns an error message (e.g., email already exists)
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        // If no response from the backend (network issue, etc.)
        toast.error("Network error. Please try again.");
      }
    }
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

      const { token, role, name } = response.data;

      if (token) {
        toast.success("Login successful!");
        localStorage.setItem("authToken", token);
        dispatch(login({ userData: response.data, token }));

        if (role === "TeamLead") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/home");
        }
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

      {/* Right Side with Form */}
      <div className="lg:w-7/12 w-full flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center lg:justify-start mb-6">
            <img src={logo} alt="Task Flow Logo" className="w-8 h-8 mr-2" />
            <h2 className="text-xl md:text-2xl font-semibold">Task Flow</h2>
          </div>

          {/* Toggle Sign-Up/Sign-In */}
          <div className="flex justify-center space-x-4 mb-4">
            <button
              className={`py-2 px-4 rounded-md ${isSignUp ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500"}`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className={`py-2 px-4 rounded-md ${!isSignUp ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500"}`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>

          {/* Sign-Up Form */}
          {isSignUp ? (

            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email ID
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter Email ID"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={formData.email}
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

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-md"
              >
                Register
              </button>

              {/* Terms and Privacy Policy Message */}
              <div className="text-sm text-center text-gray-500 mt-4">
                <p>
                  By signing up to create an account, I accept the{" "}
                  <a href="/terms" className="text-teal-500 hover:underline">
                    Company’s Terms of Use
                  </a>{" "}
                  &{" "}
                  <a href="/privacy-policy" className="text-teal-500 hover:underline">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </form>

          ) : (

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
                  value={formData.employeeId}
                  onChange={handleInputChange}
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
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-md mt-4"
              >
                Log In
              </button>

              {/* Terms and Privacy Policy Message */}
              <div className="text-sm text-center text-gray-500 mt-4">
                <p>
                  By signing up to create an account, I accept the{" "}
                  <a href="/terms" className="text-teal-500 hover:underline">
                    Company’s Terms of Use
                  </a>{" "}
                  &{" "}
                  <a href="/privacy-policy" className="text-teal-500 hover:underline">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </form>

          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
