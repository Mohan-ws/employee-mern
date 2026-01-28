import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import ViewEmployees from "./pages/ViewEmployees";

function App() {
  return (
    <Router>
      <Routes>


        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

         {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Add Employee */}
        <Route path="/add" element={<AddEmployee />} />

        {/* View Employees */}
        <Route path="/view" element={<ViewEmployees />} />

      </Routes>
    </Router>
  );
}

export default App;