import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import logo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#0f2b3d] text-white py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:mb-0">
          <img src={logo} alt="Ai Tripmate Logo" className="h-50 w-50" />
        </div>

        <div className="flex flex-col items-center text-center flex-1">
          <h2 className="text-3xl font-semibold">Ai Tripmate</h2>
          <div className="flex gap-6 mt-20">
            <a href="#" className="text-white text-2xl hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="text-white text-2xl hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="text-white text-2xl hover:text-gray-400"><FaXTwitter /></a>
            <a href="#" className="text-white text-2xl hover:text-gray-400"><FaGithub /></a>
            <a href="#" className="text-white text-2xl hover:text-gray-400"><FaLinkedinIn /></a>
          </div>
          <div className="text-gray-300 text-sm mt-3">
            <h3 className="font-semibold">Contact</h3>
            <a href="mailto:support@gmail.com" className="hover:text-white">support@gmail.com</a>
          </div>
          <div className="text-gray-400 text-sm mt-3">
            Copyright © 2025 Ai Tripmate. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;