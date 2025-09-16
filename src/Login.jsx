import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Fake admin credentials
  const adminUser = { email: "admin@example.com", password: "admin123" };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (
      loginForm.email === adminUser.email &&
      loginForm.password === adminUser.password
    ) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ ...adminLoginHeading, textAlign: "center" }}>
          🔐 Admin Login
        </h2>
        <form onSubmit={handleLoginSubmit} style={formStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={loginForm.email}
            onChange={handleLoginChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginForm.password}
            onChange={handleLoginChange}
            style={inputStyle}
          />

          <button type="submit" style={btnStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Styles reused from your AdminDashboard
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "100vh",
  paddingTop: "50px",
  background: "linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)",
  fontFamily: "Arial, sans-serif",
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  width: "400px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "6px",
  fontWeight: "bold",
  fontSize: "14px",
};

const inputStyle = {
  marginBottom: "20px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const btnStyle = {
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const adminLoginHeading = {
  color: "#333",
};

export default Login;
