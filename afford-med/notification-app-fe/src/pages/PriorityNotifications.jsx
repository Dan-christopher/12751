import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import "../styles/Pages.css";

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPriorityNotifications();
  }, []);

  const fetchPriorityNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Fetching priority notifications from API...");

      const response = await api.get("/notifications");

      console.log("✅ API Response received:", response.data);

      const allNotifications = response.data.notifications || response.data || [];
      const priorityOnly = Array.isArray(allNotifications)
        ? allNotifications.filter((n) => {
            const priority = n.priority || n.Priority || "";
            return priority.toLowerCase() === "high";
          })
        : [];

      setNotifications(priorityOnly);
    } catch (error) {
      console.error("❌ Error fetching priority notifications:", error.message);
      console.error("Full error object:", error);
      setError("Failed to load priority notifications. Please try again later.");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="page-content">
        <div className="content-header">
          <h1>⭐ Priority Inbox</h1>
          <p className="content-subtitle">
            High-priority notifications: {notifications.length}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading priority notifications...</p>
          </div>
        )}

        {!loading && notifications.length > 0 ? (
          <div className="notifications-grid">
            {notifications.map((item, index) => (
              <NotificationCard
                key={index}
                notification={item}
              />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="empty-state">
              <div className="empty-icon">🎉</div>
              <h2>No Priority Notifications</h2>
              <p>Great news! You have no high-priority notifications at the moment.</p>
              <button className="refresh-btn" onClick={fetchPriorityNotifications}>
                🔄 Refresh
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default PriorityNotifications;