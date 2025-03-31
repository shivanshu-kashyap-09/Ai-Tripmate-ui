import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FaArrowRight } from "react-icons/fa";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/logo.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const togglePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      toast.error("Email and password are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/public/login`, { email, password });
      if (response.status === 200) {
        const { email: userEmail, userName } = response.data;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loginEmail", userEmail);
        localStorage.setItem("loginUserName", userName);
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
      toast.error("Login failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    try {
      const res = await axios.post(`${baseUrl}/auth/google`, { token });
      if (res.status === 200) {
        const { email, name, picture } = res.data;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loginEmail", email);
        localStorage.setItem("loginUserName", name);
        localStorage.setItem("userProfilePic", picture);
        toast.success("Logged in with Google!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Google login failed.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden relative">
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-5 right-5 text-gray-600 text-2xl hover:text-gray-900"
          >
            ✖
          </button>

          {/* Left Side - Logo on Mobile */}
          <div className="md:hidden flex justify-center bg-blue-50 p-4">
            <img src={logo} alt="Logo" className="w-32 object-contain rounded-lg shadow-lg" />
          </div>

          {/* Left Side - Login Form */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              <span className="text-blue-800">AI TripMate</span> Login
            </h2>

            {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}

            <div className="space-y-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or Username"
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="border border-gray-300 p-3 rounded-lg w-full pr-12 focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              <button
                onClick={handleLogin}
                className={`bg-blue-600 text-white py-3 rounded-lg w-full flex justify-center items-center gap-2 text-lg font-semibold hover:bg-blue-900 transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "LOGIN"}
                <FaArrowRight />
              </button>

              {/* <div className="text-center">
                <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">
                  Forgot login details?
                </a>
              </div> */}

              <div className="text-center text-sm text-gray-600">
                Need help? Email <span className="text-blue-600 font-medium">support@gmail.com</span>
              </div>

              <div className="mt-4 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Google login failed.")}
                />
              </div>

              <p className="text-center mt-2 text-sm">
                Don't have an account?{" "}
                <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>
                  Sign up
                </span>
              </p>
            </div>
          </div>

          {/* Right Side - Logo */}
          <div className="md:w-1/2 hidden md:flex items-center justify-center bg-blue-50">
            <img src={logo} alt="Logo" className="w-3/4 object-contain rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
