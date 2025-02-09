import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const HandleLeave = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get(
          `https://employee-management-system-8n86.onrender.com/api/v1/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          setLeave(res?.data?.leave);
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
    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `https://employee-management-system-8n86.onrender.com/api/v1/leave/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin-dashboard/leaves");
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
      {leave ? (
        <div className="max-w-3xl mx-auto mt-6 sm:mt-10 bg-white p-6 sm:p-8 rounded-md shadow-md w-full sm:w-96">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex justify-center mb-6 sm:mb-0">
              <img
                src={`https://employee-management-system-8n86.onrender.com/${leave?.employeeId?.userId?.profileImage}`}
                alt="Profile"
                className="rounded-full border w-32 sm:w-48 h-32 sm:h-48 object-cover"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-3">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{leave?.employeeId?.userId?.name}</p>
              </div>
              <div className="flex space-x-3 mb-3">
                <p className="text-lg font-bold">Employee Id:</p>
                <p className="font-medium">{leave?.employeeId?.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-3">
                <p className="text-lg font-bold">Leave Type:</p>
                <p className="font-medium">{leave?.leaveType}</p>
              </div>
              <div className="flex space-x-3 mb-3">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave?.reason}</p>
              </div>
              <div className="flex space-x-3 mb-3">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{leave?.employeeId?.department?.dep_name}</p>
              </div>
              <div className="flex space-x-3 mb-3">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium">{new Date(leave?.startDate).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-3 mb-3">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium">{new Date(leave?.endDate).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-3 mb-3">
                <p className="text-lg font-bold">
                  {leave?.status === "Pending" ? "Action" : "Status"}
                </p>
                {leave?.status === "Pending" ? (
                  <div className="flex space-x-3">
                    <button
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md w-full sm:w-auto"
                      onClick={() => changeStatus(leave?._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md w-full sm:w-auto"
                      onClick={() => changeStatus(leave?._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium">{leave?.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default HandleLeave;
