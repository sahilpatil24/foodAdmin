// src/App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import NgoForm from "./NgoForm";
import RestaurantForm from "./RestaurantForm";
import AdminLayout from "./AdminLayout";
import DashboardOverview from "./DashboardOverview";
import NgoRequests from "./NgoRequests";
import RestaurantRequests from "./RestaurantRequests";
import Statistics from "./Statistics";
import Settings from "./Settings";
import NgoStatus from "./NgoStatus";
import RestaurantStatus from "./RestaurantStatus";
import RestaurantSetup from "./RestaurantSetup"; // 1. Import the component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All Top-Level Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/ngo" element={<NgoForm />} />
        <Route path="/restaurant" element={<RestaurantForm />} />
        <Route path="/logout" element={<Home />} />

        {/* Public-facing status and setup pages */}
        <Route path="/ngo-status/:id" element={<NgoStatus />} />
        <Route path="/restaurant-status/:id" element={<RestaurantStatus />} />
        {/* 2. Correct the route to be at the top level */}
        <Route path="/restaurant-setup/:id" element={<RestaurantSetup />} />

        {/* Admin Dashboard Nested Routes */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="ngo-requests" element={<NgoRequests />} />
          <Route path="restaurant-requests" element={<RestaurantRequests />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
