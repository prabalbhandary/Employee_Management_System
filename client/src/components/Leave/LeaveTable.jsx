import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { cols, LeaveButtons } from "../../utils/LeaveHelper";
import Spinner from "../Spinner";

const LeaveTable = () => {
  const [leaves, setLeaves] = useState(null);
  const [filLeaves, setFilLeaves] = useState(null);
  const fetchLeaves = async () => {
    try {
      const res = await axios.get("https://employee-management-system-8n86.onrender.com/api/v1/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.data?.success && res?.data?.leaves?.length > 0) {
        toast.success(res?.data?.message);
        let sno = 1;
        const data = res?.data?.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId,
          name: leave.employeeId?.userId?.name,
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name,
          days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons _id={leave._id} />,
        }));
        setLeaves(data);
        setFilLeaves(data);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(`Error: ${error?.response?.data?.message}`);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  
  const filterByInput = (e) => {
    const data = leaves.filter(leave => leave?.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilLeaves(data);
  }

  const filterByButton = (status) => {
    const data = leaves.filter(leave => leave?.status.toLowerCase().includes(status.toLowerCase()));
    setFilLeaves(data);
  }

  return (
    <>
      {filLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="border px-4 py-0.5"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button onClick={() => filterByButton("Pending")} className="px-4 py-1 text-white bg-teal-600 hover:bg-teal-700 rounded">
                Pending
              </button>
              <button onClick={() => filterByButton("Approved")} className="px-4 py-1 text-white bg-teal-600 hover:bg-teal-700 rounded">
                Approved
              </button>
              <button onClick={() => filterByButton("Rejected")} className="px-4 py-1 text-white bg-teal-600 hover:bg-red-700 rounded">
                Rejected
              </button>
            </div>
          </div>
          <div className="mt-3">
            <DataTable columns={cols} data={filLeaves} pagination />
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

export default LeaveTable;
