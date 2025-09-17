// src/Statistics.jsx

import React, { useState, useEffect } from "react";
import { TrendingUp, ThumbsUp, Clock, XCircle, BarChart2 } from "lucide-react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import "./AdminDashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Statistics() {
  const [ngoData, setNgoData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats
  const [approvalRate, setApprovalRate] = useState(0);
  const [rejectionRate, setRejectionRate] = useState(0);
  const [avgProcessingTime, setAvgProcessingTime] = useState(0);
  const [rejectionReasons, setRejectionReasons] = useState([]);

  // Hardcoded chart data for demonstration purposes
  const monthlyTrendData = [
    { name: "Jan", "Avg. Days": 4.5 },
    { name: "Feb", "Avg. Days": 3.2 },
    { name: "Mar", "Avg. Days": 3.4 },
    { name: "Apr", "Avg. Days": 3.1 },
    { name: "May", "Avg. Days": 4.0 },
    { name: "Jun", "Avg. Days": 4.9 },
  ];

  // useEffect 1: Fetches real-time data from both collections
  useEffect(() => {
    try {
      const unsubscribes = [];
      const qNgo = query(collection(db, "NGOs"), orderBy("submittedAt"));
      const unsubNgos = onSnapshot(qNgo, (snapshot) => {
        setNgoData(snapshot.docs);
      });
      unsubscribes.push(unsubNgos);

      const qRestaurants = query(
        collection(db, "Restaurants"),
        orderBy("submittedAt")
      );
      const unsubRestaurants = onSnapshot(qRestaurants, (snapshot) => {
        setRestaurantData(snapshot.docs);
      });
      unsubscribes.push(unsubRestaurants);

      return () => unsubscribes.forEach((unsub) => unsub());
    } catch (error) {
      console.error("Error setting up Firestore listeners:", error);
      setLoading(false);
    }
  }, []);

  // useEffect 2: Performs all calculations when data changes
  useEffect(() => {
    try {
      if (ngoData.length === 0 && restaurantData.length === 0) {
        setLoading(false);
        return;
      }

      const allDocs = [...ngoData, ...restaurantData];
      let approvedCount = 0;
      let pendingCount = 0;
      let rejectedCount = 0;
      let totalProcessingTime = 0;
      const rejectionReasonsMap = {};

      allDocs.forEach((doc) => {
        const data = doc.data();
        const status = data.status;

        if (status === "Approved") {
          approvedCount++;
          if (data.submittedAt && data.approvedAt) {
            const submittedDate = data.submittedAt.toDate();
            const approvedDate = data.approvedAt.toDate();
            const diffInDays =
              (approvedDate.getTime() - submittedDate.getTime()) /
              (1000 * 3600 * 24);
            totalProcessingTime += diffInDays;
          }
        } else if (status === "Rejected") {
          rejectedCount++;
          const reason = data.rejectionReason || "Other";
          rejectionReasonsMap[reason] = (rejectionReasonsMap[reason] || 0) + 1;
        } else if (status === "Pending") {
          pendingCount++;
        }
      });

      const totalRequests = approvedCount + pendingCount + rejectedCount;

      const newApprovalRate =
        totalRequests > 0
          ? ((approvedCount / totalRequests) * 100).toFixed(1)
          : 0;
      const newRejectionRate =
        totalRequests > 0
          ? ((rejectedCount / totalRequests) * 100).toFixed(1)
          : 0;
      setApprovalRate(newApprovalRate);
      setRejectionRate(newRejectionRate);

      const newAvgProcessingTime =
        approvedCount > 0
          ? (totalProcessingTime / approvedCount).toFixed(1)
          : 0;
      setAvgProcessingTime(newAvgProcessingTime);

      const newRejectionReasons = Object.keys(rejectionReasonsMap).map(
        (reason) => {
          const percentage = (
            rejectedCount > 0
              ? (rejectionReasonsMap[reason] / rejectedCount) * 100
              : 0
          ).toFixed(1);
          return { text: reason, percentage: parseFloat(percentage) };
        }
      );
      setRejectionReasons(newRejectionReasons);

      setLoading(false);
    } catch (error) {
      console.error("Error calculating statistics:", error);
      setLoading(false);
    }
  }, [ngoData, restaurantData]);

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  const monthlyGrowth = "+18.2%";

  return (
    <div className="statistics-page">
      <h2 className="content-area-title">Statistics & Analytics</h2>
      <p className="content-area-description">
        Detailed insights into verification request patterns and performance
      </p>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="top-section">
            <div className="icon-wrapper blue">
              <TrendingUp size={20} />
            </div>
            <span className="label">Monthly Growth</span>
          </div>
          <div className="value">{monthlyGrowth}</div>
        </div>
        <div className="analytics-card">
          <div className="top-section">
            <div className="icon-wrapper green">
              <ThumbsUp size={20} />
            </div>
            <span className="label">Approval Rate</span>
          </div>
          <div className="value">{approvalRate}%</div>
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
          <div className="value">{rejectionRate}%</div>
        </div>
      </div>

      <div className="dashboard-chart-grid">
        <div className="card chart-card">
          <h3 className="chart-section-title">Average Processing Time Trend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={monthlyTrendData}
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Avg. Days"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card chart-card">
          <h3 className="chart-section-title">Rejection Reasons</h3>
          <div className="rejection-reasons-card">
            {rejectionReasons.length > 0 ? (
              rejectionReasons.map((reason, index) => (
                <div className="reason-item" key={index}>
                  <span className="reason-text">{reason.text}</span>
                  <div className="progress-bar-wrapper">
                    <div
                      className="progress-bar"
                      style={{ "--progress-width": `${reason.percentage}%` }}
                    ></div>
                  </div>
                  <span className="reason-percentage">
                    {reason.percentage}%
                  </span>
                </div>
              ))
            ) : (
              <div className="no-data-message">
                No rejection data available.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="insights-grid">
        <div className="insight-card strong-performance">
          <h4>
            <ThumbsUp className="icon" size={18} />
            Strong Performance
          </h4>
          <p>
            Approval rate of {approvalRate}% indicates high-quality submissions
            and effective screening process.
          </p>
        </div>
        <div className="insight-card growth-opportunity">
          <h4>
            <BarChart2 className="icon" size={18} />
            Growth Opportunity
          </h4>
          <p>
            {monthlyGrowth} monthly growth suggests increasing platform
            adoption. Consider scaling review capacity.
          </p>
        </div>
        <div className="insight-card focus-area">
          <h4>
            <XCircle className="icon" size={18} />
            Focus Area
          </h4>
          <p>
            {rejectionReasons.find((r) => r.text === "Incomplete Documentation")
              ?.percentage || "N/A"}
            % of rejections due to incomplete documents. Improve submission
            guidelines and validation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
