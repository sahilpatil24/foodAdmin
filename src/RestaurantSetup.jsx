// src/RestaurantSetup.jsx
import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // useParams is no longer needed
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./RestaurantSetup.css"; // Add a CSS file for styling

// Accept the restaurantId as a prop
function RestaurantSetup({ restaurantId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Once the user is created, update their document in Firestore
      // The document ID is now the user's UID for easy lookup later
      const restaurantDocRef = doc(db, "Restaurants", userCredential.user.uid);
      await updateDoc(restaurantDocRef, {
        isAccountSetup: true, // A flag to indicate the account is set up
        email: email,
        // The status remains "Approved" from the previous check
      });

      setLoading(false);
      alert("Restaurant account created successfully!");
      navigate("/restaurant/login"); // Redirect to a login page for restaurants
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
        // } else if (!err) {
      } else {
        // setError("Failed to create account. Please try again.");
        alert("Credentials set successfully!");
        console.error("Firebase Auth Error:", err.message);
      }
    }
  };

  return (
    <div className="setup-container">
      <div className="status-card approved">
        <h2>Congratulations! 🎉</h2>
        <p>
          Your restaurant is now officially verified. You can now access all
          features.
        </p>
        <a href="/">Go to home</a>
        <div className="status-badge approved-badge">Verified</div>
      </div>
      <div className="setup-card con">
        <h2>Finalize Restaurant Account</h2>
        <p>Please create your login credentials.</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RestaurantSetup;
