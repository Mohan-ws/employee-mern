import "./Layout.css";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="layout">
      
      {/* TOP NAVBAR */}
      <div className="navbar">
        <h2>Employee Manager</h2>

        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/add">Add Employee</Link>
          <Link to="/view">View Employees</Link>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="content">
        {children}
      </div>

    </div>
  );
}

export default Layout;