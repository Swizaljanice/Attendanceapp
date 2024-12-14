import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // For navigation after login

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate= useNavigate(); // Hook to redirect user on successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/login?userId=${userId}&password=${password}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }), // Send data in the body
      });
  
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      // Parse the response JSON
      const data = await response.json();
  
      // Check the response data for login success
      if (data.message === "Login successful!") {
        setMessage("Login successful!");
        navigate("/dashboard");  // Redirect to dashboard after successful login
      } else {
        setMessage(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>{message}</p>
        <div>
          <a href="/forgot-password">Forget Password?</a> | 
          <a href="/register"> New Registration?</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
