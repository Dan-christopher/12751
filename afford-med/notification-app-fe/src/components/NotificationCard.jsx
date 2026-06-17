import "../styles/NotificationCard.css";

function NotificationCard({ notification }) {
  // Handle flexible field names - try multiple possible names
  let title = notification?.title || notification?.subject || notification?.Title || notification?.Subject || "";
  let message = notification?.message || notification?.body || notification?.content || notification?.Message || notification?.Body || notification?.Content || "";
  
  const priority = notification?.priority || notification?.Priority || "low";
  const timestamp = notification?.timestamp || notification?.createdAt || notification?.Timestamp || notification?.CreatedAt || new Date().toISOString();
  const category = notification?.category || notification?.Category || "";

  // If title is empty but message exists, use message as title and leave message empty
  // This handles APIs that only send message/body
  if (!title && message) {
    title = message;
    message = "";
  }

  // If still no title, use "Notification"
  if (!title) {
    title = "Notification";
  }

  // Log for debugging
  console.log("📌 NotificationCard Data:", { title, message, priority, timestamp, fullData: notification });

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
    if (!ts) return "Just now";
    try {
      const date = new Date(ts);
      if (isNaN(date.getTime())) return ts;
      return date.toLocaleDateString("en-US", {
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

      {message && <p className="card-message">{message}</p>}

      <div className="card-footer">
        <span className="card-timestamp">
          📅 {formatTimestamp(timestamp)}
        </span>
        {category && <span className="card-category">{category}</span>}
      </div>
    </div>
  );
}

export default NotificationCard;
