import "../styles/NotificationCard.css";

function NotificationCard({ title, message, priority = "low", timestamp, category }) {
  const getPriorityEmoji = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "ℹ️";
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return ts;
    }
  };

  return (
    <div className={`notification-card ${priority?.toLowerCase() || "low"}`}>
      <div className="card-header">
        <h3 className="card-title">
          {getPriorityEmoji(priority)} {title}
        </h3>
        <span className={`priority-badge ${priority?.toLowerCase() || "low"}`}>
          {priority || "Normal"}
        </span>
      </div>

      <p className="card-message">{message}</p>

      <div className="card-footer">
        <span className="card-timestamp">
          📅 {formatTimestamp(timestamp) || "Just now"}
        </span>
        {category && <span className="card-category">{category}</span>}
      </div>
    </div>
  );
}

export default NotificationCard;
