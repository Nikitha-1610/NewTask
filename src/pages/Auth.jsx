import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bgImage from "../assets/BgImage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    const newUser = { email, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    toast.success("Sign-up successful! You can now sign in.");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setIsSignUp(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const userExists = registeredUsers.some(
      (user) => user.email === signInEmail && user.password === signInPassword
    );

    if (userExists) {
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/SideBar");
      }, 1500);
    } else {
      toast.error("Invalid email or password!");
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
          {/* Top Welcome Phrase */}
          <div className="text-center mt-10 md:mt-14">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">
              Welcome to Task Flow
            </h1>
            <p className="text-sm md:text-md lg:text-lg mt-2">
              Your Gateway to Effortless Management.
            </p>
          </div>

          {/* Bottom Seamless Collaboration Phrase */}
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

          {/* Toggle Buttons */}
          <div className="flex mb-4">
            <button
              onClick={() => setIsSignUp(true)}
              className={`w-1/2 py-2 rounded-lg ${
                isSignUp
                  ? "bg-teal-500 text-white"
                  : "bg-teal-100 text-teal-500"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`w-1/2 py-2 rounded-lg ${
                !isSignUp
                  ? "bg-teal-500 text-white"
                  : "bg-teal-100 text-teal-500"
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Conditional Rendering of Forms */}
          {isSignUp ? (
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="signup-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="Enter Email"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="text-sm font-medium"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="w-full bg-teal-500 text-white py-3 rounded-md mt-4">
                Create Account
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="signin-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="signin-email"
                  type="email"
                  placeholder="Enter Email"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="signin-password"
                  className="text-sm font-medium"
                >
                  Password
                </label>
                <input
                  id="signin-password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-3 border rounded-md border-teal-400"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
