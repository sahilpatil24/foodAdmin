import React, { useState } from "react";
import { Mail, Shield, LogOut } from "lucide-react";
import "./AdminDashboard.css"; // Import the same CSS file for shared styles

function Settings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="settings-page">
      <h2 className="content-area-title">Settings</h2>
      <p className="content-area-description">
        Manage your profile, security, and notification preferences
      </p>

      <div className="settings-grid">
        <div className="main-settings">
          {/* Daily Summary and Alerts */}
          <div className="card setting-section">
            <h3 className="sub-header">Daily Summary</h3>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Daily digest of pending requests</h4>
                <p>Daily summary delivered to your inbox</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Urgent Alerts</h4>
                <p>Immediate alerts for high-priority requests</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Weekly Reports</h4>
                <p>Weekly performance and statistics reports</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card setting-section">
            <h3 className="sub-header">Security Settings</h3>
            <form>
              <div className="form-group">
                <label>Current Password</label>
                <div className="input-password-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
            </form>

            <div className="two-factor-auth">
              <div>
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
              </div>
              <span className="status-badge">Not Enabled</span>
            </div>
          </div>
        </div>

        {/* Action Cards Sidebar */}
        <div className="right-sidebar">
          <div className="action-card">
            <h3>Data Management</h3>
            <div className="form-group">
              <button className="btn btn-outline">Export Data</button>
            </div>
            <div className="form-group">
              <button className="btn btn-outline">Email Reports</button>
            </div>
            <div className="form-group">
              <button
                className="btn btn-outline"
                style={{ color: "#dc3545", borderColor: "#ffe6e6" }}
              >
                Clear Cache
              </button>
            </div>
          </div>
          <div className="action-card">
            <h3>Need Help?</h3>
            <p>
              Contact our support team for assistance with the verification
              portal.
            </p>
            <button className="btn btn-primary">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
