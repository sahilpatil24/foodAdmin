// import React, { useState } from "react";
// import "./Dashboard.css";

// function Dashboard() {
//   const [requests, setRequests] = useState([
//     {
//       id: 1,
//       type: "NGO",
//       details: { registrationNumber: "NGO123", panNumber: "ABCDE1234F" },
//       status: "pending",
//     },
//     {
//       id: 2,
//       type: "Restaurant",
//       details: { fssaiNumber: "FSSAI9988", gstNumber: "GST1234" },
//       status: "pending",
//     },
//   ]);

//   const updateStatus = (id, newStatus) => {
//     setRequests(
//       requests.map((req) =>
//         req.id === id ? { ...req, status: newStatus } : req
//       )
//     );
//   };

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-heading">🛠 Admin Dashboard</h2>

//       {requests.map((req) => (
//         <div key={req.id} className="request-box">
//           <h3>{req.type} Request</h3>
//           <pre className="details-style">
//             {JSON.stringify(req.details, null, 2)}
//           </pre>
//           <p>
//             Status: <b>{req.status}</b>
//           </p>

//           {req.status === "pending" && (
//             <div className="btn-group">
//               <button
//                 onClick={() => updateStatus(req.id, "approved")}
//                 className="approve-btn"
//               >
//                 ✅ Approve
//               </button>
//               <button
//                 onClick={() => updateStatus(req.id, "rejected")}
//                 className="reject-btn"
//               >
//                 ❌ Reject
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;

import React from "react";
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css"; // The main CSS file for the layout and general styles

function AdminDashboard() {
  return (
    <div className="admin-dashboard-layout">
      {/* Outlet is where the nested routes from App.jsx will render */}
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
