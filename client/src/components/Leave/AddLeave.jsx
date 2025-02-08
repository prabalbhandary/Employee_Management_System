import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user?._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave({ ...leave, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/leave/add", leave, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate(`/employee-dashboard/leaves/${user?._id}`);
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
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="leaveType"
              className="block text-sm font-medium text-gray-700"
            >
              Leave Type
            </label>
            <select
              name="leaveType"
              id="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="reason"
                id="reason"
                placeholder="Reason for Leave"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full font-bold px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md"
          >
            Request a Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
