import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import { useAuth } from "./context/AuthContext";
import AdminSummary from "./components/Dashboard/AdminSummary";
import DepartmentList from "./components/Department/DepartmentList";
import AddDepartment from "./components/Department/AddDepartment";
import EditDepartment from "./components/Department/EditDepartment";
import EmployeeList from "./components/Employee/EmployeeList";
import AddEmployee from "./components/Employee/AddEmployee";
import ViewEmployee from "./components/Employee/ViewEmployee";
import EditEmployee from "./components/Employee/EditEmployee";
import AddSalary from "./components/Salary/AddSalary";
import SalaryList from "./components/Salary/SalaryList";
import EmployeeSummary from "./components/EmployeeDashboard/EmployeeSummary";
import Profile from "./components/EmployeeDashboard/Profile";
import Settings from "./components/EmployeeDashboard/Settings";
import LeaveList from "./components/Leave/LeaveList";
import AddLeave from "./components/Leave/AddLeave";
import LeaveTable from "./components/Leave/LeaveTable";
import HandleLeave from "./components/Leave/HandleLeave";
import Attendance from "./components/Attendance/Attendance";
import AttendanceReport from "./components/Attendance/AttendanceReport";

const App = () => {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user?.role === "admin" ? (
              <Navigate to="/admin-dashboard" />
            ) : user?.role === "employee" ? (
              <Navigate to="/employee-dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/login"
          element={
            user?.role === "admin" ? (
              <Navigate to="/admin-dashboard" />
            ) : user?.role === "employee" ? (
              <Navigate to="/employee-dashboard" />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes reqRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/departments/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/departments/department/:id"
            element={<EditDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/employees"
            element={<EmployeeList />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/add-employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/employee/:id"
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/employee/edit/:id"
            element={<EditEmployee />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/employee/salary/add"
            element={<AddSalary />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/employee/salary/:id"
            element={<SalaryList />}
          ></Route>
          <Route
            path="/admin-dashboard/employees/employee/leave/:id"
            element={<LeaveList />}
          ></Route>
          <Route path="/admin-dashboard/leaves" element={<LeaveTable />} />
          <Route
            path="/admin-dashboard/leaves/leave/:id"
            element={<HandleLeave />}
          />
          <Route
            path="/admin-dashboard/settings"
            element={<Settings />}
          ></Route>
          <Route
            path="/admin-dashboard/attendance"
            element={<Attendance />}
          ></Route>
          <Route
            path="/admin-dashboard/attendance/attendance-report"
            element={<AttendanceReport />}
          ></Route>
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes reqRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummary />}></Route>
          <Route
            path="/employee-dashboard/profile/:id"
            element={<Profile />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves/:id"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/employee-dashboard/leaves/add-leave"
            element={<AddLeave />}
          ></Route>
          <Route
            path="/employee-dashboard/attendance/attendance-report"
            element={<AttendanceReport />}
          ></Route>
          <Route
            path={`/employee-dashboard/salary/:id`}
            element={<SalaryList />}
          ></Route>
          <Route
            path="/employee-dashboard/settings"
            element={<Settings />}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
