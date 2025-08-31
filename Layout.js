import React from "react";
import Sidebar from "./Shared/Sidebar";
import Navbar from "./Shared/Navbar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Sidebar: fixed & scrollable (CSS handles position) */}
      <aside className="sidebar">
        <Sidebar />
      </aside>

      {/* Main content: leaves space for sidebar */}
      <div className="main-content">
        <header className="navbar">
          <Navbar />
        </header>

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;