import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FaArrowRight } from "react-icons/fa";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;  
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      toast.error("Please fill email or password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/public/login`, {
        email,
        password,
      });
      const { email: userEmail, userName } = response.data;
      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loginEmail", userEmail);
        localStorage.setItem("loginUserName", userName);
        toast.success("Successfully logged in.");
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid login credentials.");
      toast.error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="min-h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-[#F7F5F0] rounded-2xl shadow-xl p-8 w-[400px] relative">
          <button className="absolute top-5 right-5 text-gray-500 text-2xl hover:text-gray-700">
            ✖
          </button>

          <h2 className="text-3xl text-center font-semibold text-gray-900">Login</h2>
          <div className="w-16 h-0.5 bg-[#D29B7F] mx-auto mt-2"></div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {/* Input Fields */}
          <div className="mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Username"
              className="w-full p-3 border border-gray-300 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className={`w-full flex items-center justify-center gap-2 p-3 mt-6 text-white rounded-full text-lg font-semibold transition-all duration-300 ${
              isLoading ? "bg-gray-400" : "bg-[#0E2835] hover:bg-[#09202A]"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "LOGIN"}
            <FaArrowRight />
          </button>

          {/* Forgot Password */}
          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-[#D29B7F] hover:underline text-sm">
              Forgot Login details?
            </a>
          </div>

          {/* Sign in with Google */}
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={(response) => {
                console.log("Google Login Success:", response);
                toast.success("Logged in with Google!");
                navigate("/");
              }}
              onError={() => toast.error("Google login failed.")}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
