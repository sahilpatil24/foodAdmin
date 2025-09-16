import React, { useState } from "react";

function RestaurantForm() {
  const [form, setForm] = useState({
    fssaiNumber: "",
    gstNumber: "",
    ownerId: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Restaurant details submitted:\n" + JSON.stringify(form, null, 2));
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px" }}>🍴 Restaurant Verification</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>FSSAI Number</label>
          <input
            type="text"
            name="fssaiNumber"
            placeholder="Enter FSSAI Number"
            value={form.fssaiNumber}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>GST Number</label>
          <input
            type="text"
            name="gstNumber"
            placeholder="Enter GST Number"
            value={form.gstNumber}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Owner ID Proof (URL or Number)</label>
          <input
            type="text"
            name="ownerId"
            placeholder="Enter Owner ID Proof"
            value={form.ownerId}
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
  background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
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
  backgroundColor: "#FF5722",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default RestaurantForm;
