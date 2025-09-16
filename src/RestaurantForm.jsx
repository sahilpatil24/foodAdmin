// src/RestaurantForm.js

import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./RestaurantForm.css";
import { useNavigate } from "react-router-dom";

function RestaurantForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    gstNumber: "",
    fssaiId: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new document reference with an auto-generated ID
      const newDocRef = doc(collection(db, "Restaurants"));

      // Set the data for the new document, including the uniqueId field
      await setDoc(newDocRef, {
        ...form,
        uniqueId: newDocRef.id, // Add the uniqueId field with the document's auto-generated ID
        submittedAt: new Date(),
        status: "Pending",
      });

      alert(
        "Restaurant details submitted successfully! Unique ID: " + newDocRef.id
      );

      navigate(`/restaurant-status/${newDocRef.id}`);

      // Reset form fields after successful submission
      setForm({
        name: "",
        address: "",
        gstNumber: "",
        fssaiId: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">🍴 Restaurant Verification</h2>
        <form onSubmit={handleSubmit} className="form-style">
          <label className="form-label">Restaurant Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Restaurant Name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label className="form-label">Restaurant Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter Restaurant Address"
            value={form.address}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label className="form-label">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            placeholder="Enter GST Number"
            value={form.gstNumber}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label className="form-label">FSSAI ID</label>
          <input
            type="text"
            name="fssaiId"
            placeholder="Enter FSSAI ID"
            value={form.fssaiId}
            onChange={handleChange}
            className="form-input"
            required
          />

          <button type="submit" className="form-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RestaurantForm;
