import React, { useState } from "react";

function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Fake admin credentials (later we’ll replace with Firebase Auth)
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
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  // Sample requests (later will come from Firestore)
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "NGO",
      details: { registrationNumber: "NGO123", panNumber: "ABCDE1234F" },
      status: "pending"
    },
    {
      id: 2,
      type: "Restaurant",
      details: { fssaiNumber: "FSSAI9988", gstNumber: "GST1234" },
      status: "pending"
    }
  ]);

  const updateStatus = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div style={containerStyle}>
      {!isLoggedIn ? (
        // LOGIN PAGE
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center" }}>🔐 Admin Login</h2>
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

            <button type="submit" style={btnStyle}>Login</button>
          </form>
        </div>
      ) : (
        // ADMIN DASHBOARD
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>🛠 Admin Dashboard</h2>

          {requests.map((req) => (
            <div key={req.id} style={requestBox}>
              <h3>{req.type} Request</h3>
              <pre style={detailsStyle}>{JSON.stringify(req.details, null, 2)}</pre>
              <p>Status: <b>{req.status}</b></p>

              {req.status === "pending" && (
                <div style={btnGroup}>
                  <button onClick={() => updateStatus(req.id, "approved")} style={approveBtn}>
                    ✅ Approve
                  </button>
                  <button onClick={() => updateStatus(req.id, "rejected")} style={rejectBtn}>
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "100vh",
  paddingTop: "50px",
  background: "linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%)",
  fontFamily: "Arial, sans-serif"
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  width: "400px"
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

const requestBox = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "15px",
  marginBottom: "20px",
  background: "#fafafa"
};

const detailsStyle = {
  background: "#eee",
  padding: "10px",
  borderRadius: "6px",
  fontSize: "13px",
  overflowX: "auto"
};

const btnGroup = {
  display: "flex",
  gap: "10px",
  marginTop: "10px"
};

const approveBtn = {
  padding: "8px 16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const rejectBtn = {
  padding: "8px 16px",
  backgroundColor: "#F44336",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default AdminDashboard;




