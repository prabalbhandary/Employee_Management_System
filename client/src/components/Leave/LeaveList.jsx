import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { useAuth } from "../../context/AuthContext";

const LeaveList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  let sno = 1;
  const { id } = useParams();

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(
        `https://employee-management-system-8n86.onrender.com/api/v1/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setLeaves(res?.data?.leave);
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
    fetchLeaves();
  }, []);

  return (
    <>
      {leaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search Leaves"
              className="border px-4 py-2 mb-4 sm:mb-0 sm:w-1/3 rounded"
            />
            {user.role === "employee" && (
              <Link
                to="/employee-dashboard/leaves/add-leave"
                className="px-4 py-2 text-white bg-teal-600 hover:bg-teal-700 rounded mt-4 sm:mt-0"
              >
                Request a Leave
              </Link>
            )}
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>
                  <th className="px-6 py-3">Leave Type</th>
                  <th className="px-6 py-3">From</th>
                  <th className="px-6 py-3">To</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr
                    key={leave._id}
                    className="bg-white border-b border-gray-300"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{leave.leaveType}</td>
                    <td className="px-6 py-3">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">{leave.reason}</td>
                    <td className="px-6 py-3">{leave.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default LeaveList;
