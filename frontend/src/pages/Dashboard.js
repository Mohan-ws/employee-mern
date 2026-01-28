import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="layout">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">Employee</h2>

        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/add" className="nav-link">Add Employee</Link>
        <Link to="/view" className="nav-link">View Employees</Link>
        <Link to="/" className="nav-link logout">Logout</Link>
      </div>

      {/* MAIN CONTENT */}
     <div className="main-content">

  <div className="dashboard-card">
    <h1>Welcome 👋</h1>
    <p>Select an option</p>

    <div className="dashboard-buttons">
      <Link to="/add" className="dash-btn">➕ Add Employee</Link>
      <Link to="/view" className="dash-btn">👀 View Employees</Link>
    </div>
  </div>

</div>

    </div>
  );
}

export default Dashboard;