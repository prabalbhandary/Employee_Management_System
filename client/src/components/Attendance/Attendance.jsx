import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Spinner from "../Spinner";
import { attCols, AttendanceHelper } from "../../utils/AttendanceHeloper";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filAttendance, setFilAttendance] = useState([]);
  const statusChanged = async (status, employeeId) => {
    fetchAttendance();
  };
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://employee-management-system-8n86.onrender.com/api/v1/attendance/get",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        let sno = 1;
        const data = await res?.data?.attendance.map((att) => ({
          employeeId: att?.employeeId?.employeeId,
          sno: sno++,
          department: att?.employeeId?.department?.dep_name,
          name: att?.employeeId?.userId?.name,
          action: (
            <AttendanceHelper
              status={att?.status}
              employeeId={att?.employeeId?.employeeId}
              statusChanged={statusChanged}
            />
          ),
        }));
        setAttendance(data);
        setFilAttendance(data);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFil = (e) => {
    const records = attendance.filter((att) =>
      att?.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilAttendance(records);
  };

  return (
    <>
      {!loading ? (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Attendance</h3>
          </div>
          <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              placeholder="Search by EmpId"
              className="px-4 py-0.5 border"
              onChange={handleFil}
            />
            <p className="text-2xl">
              Mark Employees for{" "}
              <span className="font-bold underline">
                {new Date().toISOString().split("T")[0]}
              </span>
            </p>
            <Link
              to="/admin-dashboard/attendance/attendance-report"
              className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700"
            >
              View Attendace Report
            </Link>
          </div>
          <div className="mt-6">
            <DataTable columns={attCols} data={filAttendance} pagination />
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

export default Attendance;
