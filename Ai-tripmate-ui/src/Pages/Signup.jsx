import React, { useState } from "react";
import logo from "../assets/logo.jpg";

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: { day: "", month: "", year: "" },
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("birthDate")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        birthDate: { ...prev.birthDate, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form Submitted:", formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-6">
          <span className="text-5xl font-bold text-blue-950">Ai TripMate</span> Account
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Benefits Image */}
          <div className="hidden md:block w-1/2">
            <img src={logo} alt="Logo" className="w-full rounded-lg" />
          </div>

          {/* Signup Form */}
          <form className="flex-1 space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="border p-2 rounded-lg w-full"
                  onChange={handleChange}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="border p-2 rounded-lg w-full"
                  onChange={handleChange}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 rounded-lg w-full"
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 rounded-lg w-full"
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="border p-2 rounded-lg w-full"
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

            {/* Birth Date */}
            <div className="flex gap-2">
              <select
                name="birthDate.day"
                className="border p-2 rounded-lg w-1/3"
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
                className="border p-2 rounded-lg w-1/3"
                onChange={handleChange}
                required
              >
                <option value="">Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
                ].map((month, i) => (
                  <option key={i} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                name="birthDate.year"
                className="border p-2 rounded-lg w-1/3"
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
              <label className="text-sm">
                I agree to the{" "}
                <span className="text-blue-600 cursor-pointer">Ai TripMate Terms of Service</span>
              </label>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

            {/* Signup Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-900"
            >
              CREATE FREE ACCOUNT →
            </button>

            {/* Login Link */}
            <p className="text-center mt-4 text-sm">
              Have an account?{" "}
              <span className="text-blue-500 cursor-pointer" onClick={onClose}>Log in</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
