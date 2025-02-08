import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useAuth } from "../../context/AuthContext";

const SalaryList = () => {
  const [salaries, setSalaries] = useState(null);
  const [filSalaries, setFilSalaries] = useState(null);
  const { id } = useParams();
  const {user} = useAuth()
  let sno = 1;
  const fetchSalaries = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/salary/${id}/${user?.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setSalaries(res?.data?.salary);
        setFilSalaries(res?.data?.salary);
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
    }
  };
  useEffect(() => {
    fetchSalaries();
  }, []);

  const filSalary = (q) => {
    const filRecords = salaries.filter((leave) =>
      leave.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilSalaries(filRecords);
  };

  return (
    <>
      {filSalaries === null ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By EmpID"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={(e) => filSalary(e.target.value)}
            />
          </div>
          {filSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Emp ID</th>
                  <th className="px-6 py-3">Salary</th>
                  <th className="px-6 py-3">Allowance</th>
                  <th className="px-6 py-3">Deduction</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filSalaries.map((salary) => (
                  <tr
                    key={salary._id}
                    className="bg-white border-b border-gray-200"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">
                      {salary?.employeeId?.employeeId}
                    </td>
                    <td className="px-6 py-3">{salary?.basicSalary}</td>
                    <td className="px-6 py-3">{salary?.allowances}</td>
                    <td className="px-6 py-3">{salary?.deductions}</td>
                    <td className="px-6 py-3">{salary?.netSalary}</td>
                    <td className="px-6 py-3">
                      {new Date(salary?.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Records Found</div>
          )}
        </div>
      )}
    </>
  );
};

export default SalaryList;
