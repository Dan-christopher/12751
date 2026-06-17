import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🔔</span>
          AffordMed Notifications
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <span>📬</span> All Notifications
          </Link>
          <Link to="/priority" className="nav-link">
            <span>⭐</span> Priority Inbox
          </Link>
        </div>

        <div className="navbar-info">
          <span className="user-info">👤 Dan Christopher</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
