import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import Spinner from "../Spinner";

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleDep = async(e) => {
    const emps = await getEmployees(e.target.value)
    setEmployees(emps)
  }

  useEffect(() => {
    const getDepartments = async () => {
      const gDepartments = await fetchDepartments();
      setDepartments(gDepartments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary({ ...salary, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://employee-management-system-8n86.onrender.com/api/v1/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (
        error?.response &&
        error?.response?.data &&
        !error?.response?.data?.success
      ) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-center text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDep}
                  id="department"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="employeeId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employees
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  id="employeeId"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Employees</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="basicSalary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Basic Salary
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  id="basicSalary"
                  name="basicSalary"
                  placeholder="Enter Basic Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="allowances"
                  className="block text-sm font-medium text-gray-700"
                >
                  Allowances
                </label>
                <input
                  type="number"
                  id="allowances"
                  onChange={handleChange}
                  name="allowances"
                  placeholder="Enter Allowances"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="deductions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deductions
                </label>
                <input
                  type="number"
                  id="deductions"
                  onChange={handleChange}
                  name="deductions"
                  placeholder="Enter Deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pay Date
                </label>
                <input
                  type="date"
                  id="date"
                  onChange={handleChange}
                  name="payDate"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 text-white hover:bg-teal-700 font-bold py-2 px-4 rounded"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default AddSalary;
