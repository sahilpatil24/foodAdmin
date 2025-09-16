// src/DashboardOverview.jsx
import React, { useState, useEffect } from "react";
import {
  Users,
  Utensils,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  RefreshCcw,
  ThumbsUp,
} from "lucide-react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path if necessary

function DashboardOverview() {
  const [totalNgos, setTotalNgos] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [rejectedRequests, setRejectedRequests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Array to hold all unsubscribe functions
    const unsubscribes = [];

    const fetchCounts = async () => {
      // Listener for total NGOs
      const unsubNgos = onSnapshot(collection(db, "NGOs"), (snapshot) => {
        setTotalNgos(snapshot.size);
      });
      unsubscribes.push(unsubNgos);

      // Listener for total Restaurants
      const unsubRestaurants = onSnapshot(
        collection(db, "Hotels"),
        (snapshot) => {
          setTotalRestaurants(snapshot.size);
        }
      );
      unsubscribes.push(unsubRestaurants);

      // Listener to update the status counts (approved, pending, rejected)
      // This listener checks both collections for a more efficient single update
      const unsubStatus = onSnapshot(collection(db, "NGOs"), async () => {
        const ngoSnapshot = await getDocs(collection(db, "NGOs"));
        const restaurantSnapshot = await getDocs(collection(db, "Hotels"));

        const allDocs = [...ngoSnapshot.docs, ...restaurantSnapshot.docs];

        const approvedCount = allDocs.filter(
          (doc) => doc.data().status === "Approved"
        ).length;
        const pendingCount = allDocs.filter(
          (doc) => doc.data().status === "Pending"
        ).length;
        const rejectedCount = allDocs.filter(
          (doc) => doc.data().status === "Rejected"
        ).length;

        setApprovedRequests(approvedCount);
        setPendingRequests(pendingCount);
        setRejectedRequests(rejectedCount);
        setLoading(false);
      });
      unsubscribes.push(unsubStatus);
    };

    fetchCounts();

    // Cleanup function to detach all listeners when the component unmounts
    return () => unsubscribes.forEach((unsub) => unsub());
  }, []);

  // Recalculate percentages whenever the counts change
  const totalRequests = approvedRequests + pendingRequests + rejectedRequests;
  const approvedPercentage =
    totalRequests > 0
      ? ((approvedRequests / totalRequests) * 100).toFixed(1)
      : 0;
  const pendingPercentage =
    totalRequests > 0
      ? ((pendingRequests / totalRequests) * 100).toFixed(1)
      : 0;
  const rejectedPercentage =
    totalRequests > 0
      ? ((rejectedRequests / totalRequests) * 100).toFixed(1)
      : 0;

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard-overview">
      <h2 className="content-area-title">Dashboard Overview</h2>
      <p className="content-area-description">
        Monitor verification requests and approval statistics
      </p>

      {/* Top Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-blue">
            <Users size={20} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{totalNgos}</div>
            <div className="stat-label">Total NGOs</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-purple">
            <Utensils size={20} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{totalRestaurants}</div>
            <div className="stat-label">Total Restaurants</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-green">
            <CheckCircle size={20} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{approvedRequests}</div>
            <div className="stat-label">Approved</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-orange">
            <Clock size={20} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{pendingRequests}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-icon-red">
            <XCircle size={20} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{rejectedRequests}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>
      </div>

      {/* Monthly Requests & Request Status */}
      <div className="dashboard-chart-grid">
        <div className="card chart-card">
          <h3 className="card-title">Monthly Requests by Type</h3>
          <div className="chart-placeholder">
            {/* Replace with actual chart library like Chart.js or Recharts */}
            Bar Chart Placeholder
          </div>
        </div>
        <div className="card chart-card">
          <h3 className="card-title">Request Status Distribution</h3>
          <div className="chart-placeholder">
            {/* Replace with actual chart library */}
            Donut Chart Placeholder (Approved: {approvedPercentage}%, Pending:{" "}
            {pendingPercentage}%, Rejected: {rejectedPercentage}%)
          </div>
        </div>
      </div>

      {/* Approval Rate, Processing Time, Most Common Issue */}
      <div className="insights-grid">
        <div className="insight-card strong-performance">
          <h4>
            <ThumbsUp className="icon" size={18} />
            Approval Rate
          </h4>
          <p>71.6%</p>
          <p className="description">↑ 5.2% from last month</p>
        </div>
        <div className="insight-card growth-opportunity">
          <h4>
            <Clock className="icon" size={18} />
            Avg. Processing Time
          </h4>
          <p>2.3 days</p>
          <p className="description">↓ 0.5 days improvement</p>
        </div>
        <div className="insight-card focus-area">
          <h4>
            <XCircle className="icon" size={18} />
            Most Common Issue
          </h4>
          <p>Documentation</p>
          <p className="description">45% of rejections</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
