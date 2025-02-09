import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      {/* Hamburger Button for Mobile */}
      <button
        className="block sm:hidden p-4 text-white"
        onClick={toggleSidebar}
      >
        <FaTachometerAlt size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } sm:block bg-gray-800 text-white h-screen fixed top-0 left-0 bottom-0 w-64 z-50 transition-transform duration-300`}
      >
        <div
          onClick={() =>
            user?.role === "admin"
              ? navigate("/admin-dashboard")
              : navigate("/employee-dashboard")
          }
          className="bg-teal-600 h-12 flex items-center justify-center cursor-pointer"
        >
          <h3 className="text-2xl text-center font-sevillana">Employee MS</h3>
        </div>
        <div className="space-y-2">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/employees"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
          >
            <FaUsers />
            <span>Employees</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/departments"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
          >
            <FaBuilding />
            <span>Departments</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/leaves"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
          >
            <FaCalendarAlt />
            <span>Leaves</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/employees/employee/salary/add"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
          >
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>
          <NavLink
            to={`/admin-dashboard/attendance`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
          >
            <FaRegCalendarAlt />
            <span>Attendance</span>
          </NavLink>
          <NavLink
            to={`/admin-dashboard/attendance/attendance-report`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
          >
            <AiOutlineFileText />
            <span>Attendance Report</span>
          </NavLink>
          <NavLink
            to="/admin-dashboard/settings"
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-500" : ""
              } flex items-center space-x-4 py-2.5 px-4 rounded`
            }
            end
          >
            <FaCogs />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } sm:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40`}
        onClick={toggleSidebar}
      />
    </div>
  );
};

export default AdminSidebar;
