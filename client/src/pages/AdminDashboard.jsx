import React, { useState } from "react";
import AdminSidebar from "../components/Dashboard/AdminSidebar";
import Navbar from "../components/Dashboard/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block lg:w-64 w-full bg-gray-800 text-white p-4`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 ${
          sidebarOpen ? "ml-64" : "ml-0"
        } bg-gray-100 h-screen transition-all duration-300`}
      >
        {/* Navbar */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          <button
            className="lg:hidden text-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i> {/* Hamburger Icon */}
          </button>
          <Navbar />
        </div>

        {/* Outlet for Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
