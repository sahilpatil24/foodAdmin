import React, { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebase";
import { useParams } from "react-router-dom";
import "./RestaurantStatus.css";

function RestaurantStatus() {
  const { id } = useParams();
  const [status, setStatus] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No document ID provided in the URL.");
      setLoading(false);
      return;
    }

    // Change the collection name to "Restaurants"
    const restaurantDocRef = doc(db, "Restaurants", id);

    const unsubscribeSnapshot = onSnapshot(
      restaurantDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const newStatus = docSnap.data().status;
          setStatus(newStatus);
        } else {
          setStatus("Not Found");
          setError("The requested verification document was not found.");
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching status:", err);
        setError("Failed to get status. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [id]);

  if (loading) {
    return (
      <div className="status-container loading-state">
        <div className="loader"></div>
        <p>Checking your verification status...</p>
      </div>
    );
  }

  return (
    <div className="status-container">
      {error && <div className="status-message error-message">{error}</div>}

      {status === "Pending" && (
        <div className="status-card pending">
          <h2>Verification Request Submitted ✅</h2>
          <p>Your request is currently under review by our team.</p>
          <div className="status-badge pending-badge">Pending</div>
          <p>We'll notify you once your account is verified.</p>
        </div>
      )}

      {status === "Approved" && (
        <div className="status-card approved">
          <h2>Congratulations! 🎉</h2>
          <p>
            Your restaurant is now officially verified. You can now access all
            features.
          </p>
          <div className="status-badge approved-badge">Verified</div>
        </div>
      )}

      {status === "Rejected" && (
        <div className="status-card rejected">
          <h2>Verification Request Rejected ❌</h2>
          <p>
            Unfortunately, your request was rejected. Please review our
            guidelines and resubmit your application with the correct
            documentation.
          </p>
          <div className="status-badge rejected-badge">Rejected</div>
        </div>
      )}

      {status === "Not Found" && (
        <div className="status-card not-found">
          <h2>No Request Found 🚫</h2>
          <p>The document you are looking for does not exist.</p>
        </div>
      )}
    </div>
  );
}

export default RestaurantStatus;
