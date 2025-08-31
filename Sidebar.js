import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked ✅");
    onLogout(); // clear token in App.js
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Smart Chit Fund</h2>
      </div>

      <div className="sidebar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/progress">Progress</Link>
        <Link to="/calculator">Calculator</Link>
        <Link to="/spin">Spin</Link>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;