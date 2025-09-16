// src/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Utensils,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react"; // Assuming lucide-react for icons

function AdminLayout() {
  return (
    <div className="admin-dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="portal-title">Verification Portal</h2>
          <p className="admin-text">Admin Dashboard</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <LayoutDashboard className="nav-icon" /> Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/ngo-requests"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <Users className="nav-icon" /> NGO Requests
          </NavLink>
          <NavLink
            to="/dashboard/restaurant-requests"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <Utensils className="nav-icon" /> Restaurant Requests
          </NavLink>
          <NavLink
            to="/dashboard/statistics"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <BarChart2 className="nav-icon" /> Statistics
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <Settings className="nav-icon" /> Settings
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <NavLink to="/logout" className="nav-item logout">
            <LogOut className="nav-icon" /> Logout
          </NavLink>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1 className="header-title">Admin Dashboard</h1>
          {/* Add user menu or other header elements here if needed */}
        </header>
        <div className="content-area">
          <Outlet /> {/* This is where child routes will render */}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
