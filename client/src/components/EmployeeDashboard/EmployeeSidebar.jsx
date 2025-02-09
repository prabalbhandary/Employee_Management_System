import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineFileText } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const EmployeeSidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen fixed top-0 left-0 bottom-0 transition-transform duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div
          onClick={() =>
            user?.role === "admin" ? navigate("/admin-dashboard") : navigate("/employee-dashboard")
          }
          className="bg-teal-600 h-12 flex items-center justify-center cursor-pointer"
        >
          <h3 className="text-2xl text-center font-sevillana">Employee MS</h3>
        </div>

        <div className="mt-6">
          <NavLink
            to="/employee-dashboard"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200`
            }
            end
          >
            <FaTachometerAlt />
            {isSidebarOpen && <span>Dashboard</span>}
          </NavLink>
          <NavLink
            to={`/employee-dashboard/profile/${user?._id}`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200`
            }
            end
          >
            <FaUsers />
            {isSidebarOpen && <span>My Profile</span>}
          </NavLink>
          <NavLink
            to={`/employee-dashboard/leaves/${user?._id}`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200`
            }
            end
          >
            <FaCalendarAlt />
            {isSidebarOpen && <span>Leaves</span>}
          </NavLink>
          <NavLink
            to={`/employee-dashboard/attendance/attendance-report`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200`
            }
            end
          >
            <AiOutlineFileText />
            {isSidebarOpen && <span>Attendance Report</span>}
          </NavLink>
          <NavLink
            to={`/employee-dashboard/salary/${user?._id}`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200`
            }
          >
            <FaMoneyBillWave />
            {isSidebarOpen && <span>Salary</span>}
          </NavLink>
          <NavLink
            to="/employee-dashboard/settings"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200`
            }
          >
            <FaCogs />
            {isSidebarOpen && <span>Settings</span>}
          </NavLink>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div
        className="md:hidden fixed top-0 left-0 p-4"
        onClick={toggleSidebar}
      >
        <HiOutlineMenuAlt3 className="text-3xl text-white cursor-pointer" />
      </div>

      {/* Content Area */}
      <div className="flex-1 ml-64 md:ml-16 p-6">
        {/* This would be where the main content of the page goes */}
      </div>
    </div>
  );
};

export default EmployeeSidebar;
