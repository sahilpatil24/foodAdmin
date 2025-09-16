// src/NgoRequests.jsx
import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase"; // Import your initialized Firestore db instance
``;
function NgoRequests() {
  const [ngoRequests, setNgoRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch NGO requests from Firestore in real-time
  useEffect(() => {
    // Change collection name to "NGOs"
    const q = query(collection(db, "NGOs"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const requests = [];
        querySnapshot.forEach((doc) => {
          // Add uniqueId if you implemented it in the form submission
          requests.push({ id: doc.id, ...doc.data() });
        });
        setNgoRequests(requests);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching NGO requests: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Function to update the status of an NGO request
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // Change collection name to "NGOs"
      const docRef = doc(db, "NGOs", id);
      await updateDoc(docRef, {
        status: newStatus,
      });
      console.log(`NGO request ${id} status updated to ${newStatus}`);
    } catch (e) {
      console.error("Error updating document: ", e);
      alert("An error occurred. Please try again.");
    }
  };

  const totalRequests = ngoRequests.length;
  const pendingRequests = ngoRequests.filter(
    (req) => req.status === "Pending"
  ).length;

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-badge approved";
      case "Pending":
        return "status-badge pending";
      case "Rejected":
        return "status-badge rejected";
      default:
        return "status-badge";
    }
  };

  if (loading) {
    return <div className="loading-state">Loading NGO requests...</div>;
  }

  return (
    <div className="ngo-requests-container">
      <div className="header-section">
        <h1 className="main-heading">NGO Requests</h1>
        <p className="sub-heading">Review and manage verification requests</p>
        <div className="total-requests">
          <span>{totalRequests} total requests</span> |{" "}
          <span>{pendingRequests} pending</span>
        </div>
      </div>

      <div className="table-container">
        <div className="search-filter-row">
          <div className="search-input">
            <Search size={20} color="#718096" />
            <input type="text" placeholder="Search requests..." />
          </div>
          <button className="filter-button">
            <Filter size={20} color="#4A5568" />
            Filter
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Registration Number</th>
              <th>PAN Number</th>
              <th>Social Links</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ngoRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.uniqueId || req.id}</td>
                <td>{req.registrationNumber || "N/A"}</td>
                <td>{req.panNumber || "N/A"}</td>
                <td>{req.socialLinks || "N/A"}</td>
                <td>
                  {req.submittedAt?.toDate().toLocaleDateString() || "N/A"}
                </td>
                <td>
                  <span className={getStatusClass(req.status)}>
                    {req.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {req.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(req.id, "Approved")}
                          className="approve-button"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req.id, "Rejected")}
                          className="reject-button"
                        >
                          ❌ Reject
                        </button>
                      </>
                    ) : (
                      <button className="view-details-button">
                        View Details
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NgoRequests;
