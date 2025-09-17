// src/DashboardOverview.jsx
import React, { useState, useEffect } from "react";
import {
  Users,
  Utensils,
  CheckCircle,
  Clock,
  XCircle,
  ThumbsUp,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function DashboardOverview() {
  const [ngoData, setNgoData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [totalNgos, setTotalNgos] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [rejectedRequests, setRejectedRequests] = useState(0);
  const [approvalRate, setApprovalRate] = useState(0);
  const [avgProcessingTime, setAvgProcessingTime] = useState(0);
  const [mostCommonIssue, setMostCommonIssue] = useState("N/A");
  const [loading, setLoading] = useState(true);

  // useEffect 1: Fetches real-time data from both collections
  useEffect(() => {
    const unsubscribes = [];

    // Listener for all NGO data
    const unsubNgos = onSnapshot(collection(db, "NGOs"), (snapshot) => {
      setNgoData(snapshot.docs);
    });
    unsubscribes.push(unsubNgos);

    // Listener for all Restaurant data
    const unsubRestaurants = onSnapshot(
      collection(db, "Restaurants"),
      (snapshot) => {
        setRestaurantData(snapshot.docs);
      }
    );
    unsubscribes.push(unsubRestaurants);

    // Cleanup function to detach all listeners when the component unmounts
    return () => unsubscribes.forEach((unsub) => unsub());
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect 2: Performs all calculations when data changes
  useEffect(() => {
    // This hook runs whenever ngoData or restaurantData is updated
    if (ngoData.length === 0 && restaurantData.length === 0) {
      setLoading(false);
      return;
    }

    const allDocs = [...ngoData, ...restaurantData];
    let approvedCount = 0;
    let pendingCount = 0;
    let rejectedCount = 0;
    let totalProcessingTime = 0;
    const rejectionReasons = {};

    allDocs.forEach((doc) => {
      const data = doc.data();
      const status = data.status;

      if (status === "Approved") {
        approvedCount++;
        // Use submittedAt if createdAt is not available
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
        rejectionReasons[reason] = (rejectionReasons[reason] || 0) + 1;
      } else if (status === "Pending") {
        pendingCount++;
      }
    });

    setTotalNgos(ngoData.length);
    setTotalRestaurants(restaurantData.length);
    setApprovedRequests(approvedCount);
    setPendingRequests(pendingCount);
    setRejectedRequests(rejectedCount);

    const totalRequests = approvedCount + rejectedCount + pendingCount;
    const newApprovalRate =
      totalRequests > 0
        ? ((approvedCount / totalRequests) * 100).toFixed(1)
        : 0;
    setApprovalRate(newApprovalRate);

    const newAvgProcessingTime =
      approvedCount > 0 ? (totalProcessingTime / approvedCount).toFixed(1) : 0;
    setAvgProcessingTime(newAvgProcessingTime);

    let maxCount = 0;
    let commonIssue = "N/A";
    for (const reason in rejectionReasons) {
      if (rejectionReasons[reason] > maxCount) {
        maxCount = rejectionReasons[reason];
        commonIssue = reason;
      }
    }
    setMostCommonIssue(commonIssue);
    setLoading(false);
  }, [ngoData, restaurantData]);

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
      --- ## Real-Time Insights
      {/* Approval Rate, Processing Time, Most Common Issue */}
      <div className="insights-grid">
        <div className="insight-card strong-performance">
          <h4>
            <ThumbsUp className="icon" size={18} />
            Approval Rate
          </h4>
          <p>{approvalRate}%</p>
        </div>
        <div className="insight-card growth-opportunity">
          <h4>
            <Clock className="icon" size={18} />
            Avg. Processing Time
          </h4>
          <p>2.3 days</p>
        </div>
        <div className="insight-card focus-area">
          <h4>
            <XCircle className="icon" size={18} />
            Most Common Issue
          </h4>
          <p>{mostCommonIssue}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
