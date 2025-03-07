import React, { useState } from "react";
import logo from "../assets/logo.jpg"; // Replace with your actual logo path

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: { day: "", month: "", year: "" },
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("birthDate")) {
      setFormData({
        ...formData,
        birthDate: { ...formData.birthDate, [name.split(".")[1]]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-[#e0f7ff] p-6 rounded-4xl shadow-lg max-w-4xl w-full relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          <span className="text-5xl font-bold text-blue-950">Ai TripMate</span> Account
        </h2>

        {/* Benefits Section (Image) */}
        <div className="flex gap-6 ">
          <div className="flex-1 ">
            <img src={logo} alt="Logo" className="w-full rounded-3xl  " />
          </div>

          {/* Signup Form */}
          <form className="flex-1 space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border p-2 rounded-2xl w-full"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border p-2 rounded-2xl w-full"
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded-2xl w-full"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded-2xl w-full"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Password confirmation"
              className="border p-2 rounded-2xl w-full"
              onChange={handleChange}
              required
            />

            {/* Birth Date */}
            <div className="flex gap-2">
              <select
                name="birthDate.day"
                className="border p-2 rounded-2xl w-full"
                onChange={handleChange}
                required
              >
                <option value="">Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                name="birthDate.month"
                className="border p-2 rounded-2xl w-full"
                onChange={handleChange}
                required
              >
                <option value="">Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, i) => (
                  <option key={i} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                name="birthDate.year"
                className="border p-2 rounded-2xl w-full"
                onChange={handleChange}
                required
              >
                <option value="">Year</option>
                {[...Array(100)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                className="mr-2"
                onChange={handleChange}
                required
              />
              <label>
                I agree to the{" "}
                <span className="text-blue-600 cursor-pointer">
                  Ai TripMate Terms of Service
                </span>
              </label>
            </div>

            {/* reCAPTCHA Placeholder */}
            <div className="border p-3 rounded-3xl flex items-center justify-center bg-gray-200">
              <input type="checkbox" className="mr-2" required />
              <span>I'm not a robot</span>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-3xl w-full hover:bg-blue-900"
            >
              CREATE FREE ACCOUNT →
            </button>

            {/* Login Link */}
            <p className="text-center mt-4">
              Have an account?{" "}
              <span className="text-blue-500 cursor-pointer">Log in.</span>
            </p>

            {/* Support Email */}
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
