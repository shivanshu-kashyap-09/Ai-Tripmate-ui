import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-gray-900 transition"
          >
            ✖
          </button>

          <div className="w-full flex md:hidden items-center justify-center bg-blue-50 p-6">
            <img src={logo} alt="Logo" className="w-full h-50 object-contain rounded-lg shadow-lg" />
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              AI TripMate Account
            </h2>

            <form className="space-y-5">
              <div className="flex gap-4">
                <input type="text" name="firstName" placeholder="First Name" className="border border-gray-300 p-3 rounded-lg w-1/2" onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" className="border border-gray-300 p-3 rounded-lg w-1/2" onChange={handleChange} />
              </div>

              <div className="flex">
                <input type="email" name="email" placeholder="Email" className="border border-gray-300 p-3 rounded-lg w-full" onChange={handleChange} />
                <button type="button" onClick={() => toast.success("OTP Sent!")} className="bg-blue-600 text-white px-4 rounded-lg ml-2 hover:bg-blue-900 transition">
                  OTP
                </button>
              </div>

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="border border-gray-300 p-3 rounded-lg w-full pr-12"
                  onChange={handleChange}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="border border-gray-300 p-3 rounded-lg w-full pr-12"
                  onChange={handleChange}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <button className="bg-blue-600 text-white py-3 rounded-lg w-full hover:bg-blue-900 transition-all">
                Sign Up
              </button>

              <div className="mt-2 flex justify-center">
                <GoogleLogin onSuccess={() => toast.success("Google Signup Successful!")} />
              </div>

              <p className="text-center text-sm">
                Have an account? <Link to="/login" className="text-blue-500">Log in</Link>
              </p>
            </form>
          </div>
          <div className="md:w-1/2 hidden md:flex items-center justify-center bg-blue-50">
            <img src={logo} alt="Logo" className="w-3/4 object-contain rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
