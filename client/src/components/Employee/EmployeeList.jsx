import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { empColumns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";
import Spinner from "../Spinner";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filEmployee, setFilEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const res = await axios.get(
          "https://employee-management-system-8n86.onrender.com/api/v1/employee/get",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          let sno = 1;
          const data = await res?.data?.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                src={`https://employee-management-system-8n86.onrender.com/${emp?.userId?.profileImage}`}
                className="w-10 h-10 rounded-full"
                alt="Profile"
              />
            ),
            action: <EmployeeButtons _id={emp._id} />,
          }));
          setEmployees(data);
          setFilEmployee(data);
        }
      } catch (error) {
        if (
          error?.response &&
          error?.response?.data &&
          !error?.response?.data?.success
        ) {
          toast.error(`Error: ${error?.response?.data?.message}`);
        } else {
          toast.error("Something went wrong. Please try again later");
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFil = (e) => {
    const records = employees.filter((emp) =>
      emp?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilEmployee(records);
  };

  return (
    <>
      {!empLoading ? (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mt-4">
            <input
              type="text"
              placeholder="Search by EmpId"
              className="px-4 py-2 border w-full md:w-auto"
              onChange={handleFil}
            />
            <Link
              to="/admin-dashboard/employees/add-employee"
              className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 w-full md:w-auto text-center"
            >
              Add New Employee
            </Link>
          </div>
          <div className="mt-6 overflow-x-auto">
            <DataTable
              columns={empColumns}
              data={filEmployee}
              pagination
              highlightOnHover
            />
          </div>
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default EmployeeList;
