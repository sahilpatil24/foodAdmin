import React, { useState } from "react";

function NgoForm() {
  const [form, setForm] = useState({
    registrationNumber: "",
    panNumber: "",
    socialLinks: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("NGO details submitted:\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>🌍 NGO Verification</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>NGO Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            placeholder="Enter NGO Registration Number"
            value={form.registrationNumber}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>PAN Number</label>
          <input
            type="text"
            name="panNumber"
            placeholder="Enter PAN Number"
            value={form.panNumber}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Social Media Links</label>
          <input
            type="text"
            name="socialLinks"
            placeholder="Enter Social Media Links"
            value={form.socialLinks}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={btnStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
  fontFamily: "Arial, sans-serif"
};

const cardStyle = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  width: "400px",
  textAlign: "left"
};

const formStyle = {
  display: "flex",
  flexDirection: "column"
};

const labelStyle = {
  marginBottom: "6px",
  fontWeight: "bold",
  fontSize: "14px"
};

const inputStyle = {
  marginBottom: "20px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const btnStyle = {
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default NgoForm;
