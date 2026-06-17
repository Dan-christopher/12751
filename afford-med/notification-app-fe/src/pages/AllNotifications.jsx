import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import NotificationCard from "../components/NotificationCard";
import "../styles/Pages.css";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    applyFilter(selectedFilter);
  }, [notifications, selectedFilter]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Fetching notifications from API...");

      const response = await api.get("/notifications");

      console.log("✅ API Response received:", response.data);
      
      // Log the first notification to inspect field names
      if (response.data && response.data.length > 0) {
        console.log("📋 First notification structure:", response.data[0]);
        console.log("📋 All available field names:", Object.keys(response.data[0]));
      }

      const notificationsData = response.data.notifications || response.data || [];
      setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
    } catch (error) {
      console.error("❌ Error fetching notifications:", error.message);
      console.error("Full error object:", error);
      setError("Failed to load notifications. Please try again later.");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (filter) => {
    if (filter === "all") {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(
        notifications.filter((n) => n.priority?.toLowerCase() === filter.toLowerCase())
      );
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="page-container">
      <Navbar />

      <FilterBar onFilterChange={handleFilterChange} />

      <div className="page-content">
        <div className="content-header">
          <h1>📬 All Notifications</h1>
          <p className="content-subtitle">
            Total: {filteredNotifications.length} notification
            {filteredNotifications.length !== 1 ? "s" : ""}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading notifications...</p>
          </div>
        )}

        {!loading && filteredNotifications.length > 0 ? (
          <div className="notifications-grid">
            {filteredNotifications.map((item, index) => (
              <NotificationCard
                key={index}
                notification={item}
              />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h2>No Notifications Found</h2>
              <p>
                {selectedFilter === "all"
                  ? "You're all caught up! No notifications at the moment."
                  : `No ${selectedFilter} priority notifications.`}
              </p>
              <button className="refresh-btn" onClick={fetchNotifications}>
                🔄 Refresh
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AllNotifications;