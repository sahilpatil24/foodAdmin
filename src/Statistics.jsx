import React from "react";
import { TrendingUp, ThumbsUp, Clock, XCircle, BarChart2 } from "lucide-react";
import "./AdminDashboard.css"; // Import the same CSS file for shared styles

function Statistics() {
  const rejectionReasons = [
    { text: "Incomplete Documentation", percentage: 45.3 },
    { text: "Invalid License", percentage: 21.6 },
    { text: "Missing Tax Info", percentage: 16.2 },
    { text: "Verification Failed", percentage: 13.5 },
    { text: "Other", percentage: 3.4 },
  ];

  return (
    <div className="statistics-page">
      <h2 className="content-area-title">Statistics & Analytics</h2>
      <p className="content-area-description">
        Detailed insights into verification request patterns and performance
      </p>

      {/* Top Stat Cards */}
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="top-section">
            <div className="icon-wrapper blue">
              <TrendingUp size={20} />
            </div>
            <span className="label">Monthly Growth</span>
          </div>
          <div className="value">+18.2%</div>
        </div>
        <div className="analytics-card">
          <div className="top-section">
            <div className="icon-wrapper green">
              <ThumbsUp size={20} />
            </div>
            <span className="label">Approval Rate</span>
          </div>
          <div className="value">71.6%</div>
        </div>
        <div className="analytics-card">
          <div className="top-section">
            <div className="icon-wrapper orange">
              <Clock size={20} />
            </div>
            <span className="label">Avg. Processing</span>
          </div>
          <div className="value">2.3 days</div>
        </div>
        <div className="analytics-card">
          <div className="top-section">
            <div className="icon-wrapper red">
              <XCircle size={20} />
            </div>
            <span className="label">Rejection Rate</span>
          </div>
          <div className="value">8.4%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-chart-grid">
        <div className="card chart-card">
          <h3 className="chart-section-title">Average Processing Time Trend</h3>
          <div className="chart-container">Placeholder for Line Chart</div>
        </div>
        <div className="card chart-card">
          <h3 className="chart-section-title">Rejection Reasons</h3>
          <div className="rejection-reasons-card">
            {rejectionReasons.map((reason, index) => (
              <div className="reason-item" key={index}>
                <span className="reason-text">{reason.text}</span>
                <div className="progress-bar-wrapper">
                  <div
                    className="progress-bar"
                    style={{ "--progress-width": `${reason.percentage}%` }}
                  ></div>
                </div>
                <span className="reason-percentage">{reason.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights Section */}
      <div className="insights-grid">
        <div className="insight-card strong-performance">
          <h4>
            <ThumbsUp className="icon" size={18} />
            Strong Performance
          </h4>
          <p>
            Approval rate of 71.6% indicates high-quality submissions and
            effective screening process.
          </p>
        </div>
        <div className="insight-card growth-opportunity">
          <h4>
            <BarChart2 className="icon" size={18} />
            Growth Opportunity
          </h4>
          <p>
            18.2% monthly growth suggests increasing platform adoption. Consider
            scaling review capacity.
          </p>
        </div>
        <div className="insight-card focus-area">
          <h4>
            <XCircle className="icon" size={18} />
            Focus Area
          </h4>
          <p>
            45.3% of rejections due to incomplete documents. Improve submission
            guidelines and validation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
