import React, { useState } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "5",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFormData({ name: "", email: "", rating: "5", comments: "" });
  };

  return (
    <section id="feedback" className="py-12 bg-blue-100 ">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl text-blue-900 font-bold mb-6">We Value Your Feedback</h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          Let us know how we can improve our services. Your feedback is important to us!
        </p>

        <form onSubmit={handleSubmit} className="mt-6 max-w-lg mx-auto bg-gray-100 p-6  rounded-lg shadow-md  text-black">
          <div className="mb-4">
            <label className="block text-left font-semibold mb-1"> Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter Your Name"
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-left font-semibold mb-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Your Email Address"
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-left font-semibold mb-1">Rating</label>
            <select 
              name="rating" 
              value={formData.rating} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
              <option value="4">⭐⭐⭐⭐ - Good</option>
              <option value="3">⭐⭐⭐ - Average</option>
              <option value="2">⭐⭐ - Poor</option>
              <option value="1">⭐ - Terrible</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-left font-semibold mb-1">Comments</label>
            <textarea 
              name="comments" 
              placeholder="Comments"
              value={formData.comments} 
              onChange={handleChange} 
              rows="4" 
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required 
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
};

export default Feedback;