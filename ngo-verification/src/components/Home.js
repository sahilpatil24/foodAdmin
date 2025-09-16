import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to the Verification Portal</h1>
      <p style={subtitleStyle}>Choose an option to continue</p>

      <div style={buttonContainer}>
        <div style={cardStyle} onClick={() => navigate("/ngo")}>
          <h2>🌍 NGO</h2>
          <p>Verify NGO details with Registration & PAN</p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/restaurant")}>
          <h2>🍴 Restaurant</h2>
          <p>Submit FSSAI, GST & Owner ID proof</p>
        </div>

        <div style={cardStyle} onClick={() => navigate("/admin")}>
          <h2>🛠 Admin</h2>
          <p>Review & approve verification requests</p>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  fontFamily: "Arial, sans-serif",
  color: "#333",
  textAlign: "center"
};

const titleStyle = {
  fontSize: "36px",
  marginBottom: "10px"
};

const subtitleStyle = {
  fontSize: "18px",
  marginBottom: "40px"
};

const buttonContainer = {
  display: "flex",
  gap: "30px"
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  width: "220px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  textAlign: "center"
};

cardStyle[":hover"] = {
  transform: "translateY(-5px)",
  boxShadow: "0 8px 30px rgba(0,0,0,0.25)"
};

export default Home;
