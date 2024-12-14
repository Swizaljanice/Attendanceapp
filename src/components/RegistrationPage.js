import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationPage.css"; // Importing the CSS for styling

const RegistrationPage = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    bdate: "",
    qualification: "",
    username: "",
    userId: "",
    password: "",
  });

  const navigate = useNavigate();  // Hook for navigation after successful registration

  // Handling form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Log the raw response text
      const text = await response.text();  // Get the raw response text
      console.log("Backend response text:", text);  // Check what's being returned
  
      // Now check if the response is valid JSON
      const data = JSON.parse(text);  // Manually parse the text to JSON if it's valid
  
      if (response.ok && data.message === "Registration successful!") {
        navigate("/login");
      } else {
        alert(data.message);  // Show the message from the backend
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };
  
  return (
    <div className="registration-container">
      <h1>Faculty Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="bdate"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
