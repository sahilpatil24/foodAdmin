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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/ngo" element={<NgoForm />} />
        <Route path="/restaurant" element={<RestaurantForm />} />
        <Route path="/logout" element={<Home />} />
        {/*code*/}

        <Route path="/ngo-status/:id" element={<NgoStatus />} />
        <Route path="/restaurant-status/:id" element={<RestaurantStatus />} />
        {/* Keep this outside the admin dashboard routes */}
        {/* Admin Dashboard Nested Routes */}
        {/* All routes inside this <Route> will be rendered within the <AdminLayout> */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />{" "}
          {/* Renders at /dashboard */}
          {/* Use RELATIVE paths for nested routes */}
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
