import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = async (response) => {
    console.log("Google Login Success:", response);
    try {
      const res = await axios.post("http://localhost:8080/auth/google", {
        withCredentials: true,
      });

      const userData = res.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User Data:", userData);

      navigate("/");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="74437701368-28o5jnuvjvl87oviq7i1vm7b2eptooio.apps.googleusercontent.com">
      <div className="flex justify-center items-center h-screen">
        {user ? (
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <img
              src={user.picture}
              alt="User profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="mt-2 font-bold text-lg">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
              }}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;