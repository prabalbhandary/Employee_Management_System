import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);

  const handleFilChange = (e) => {
    setDateFilter(e.target.value);
    setSkip(0);
  };

  const fetchAttendanceReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const res = await axios.get(
        `https://employee-management-system-8n86.onrender.com/api/v1/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        if (skip === 0) {
          setReport(res?.data?.groupData);
        } else {
          setReport([...report, ...res?.data?.groupData]);
        }
      }
      setLoading(false);
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

  useEffect(() => {
    fetchAttendanceReport();
  }, [skip, dateFilter]);

  const handleLoadMore = () => {
    setSkip(skip + limit);
  };

  return (
    <div className="min-h-screen p-5 sm:p-10 bg-white">
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>
      <div className="flex flex-col sm:flex-row items-center mt-4 space-x-0 sm:space-x-4">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Filter By Date: </h2>
        <input
          type="date"
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
          onChange={handleFilChange}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        Object.entries(report).map(([date, record]) => (
          <div key={date} className="mt-4 border-b">
            <h2 className="text-xl font-semibold">{date}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full" border="1" cellPadding="10">
                <thead>
                  <tr>
                    <th className="px-4 py-2">S.No</th>
                    <th className="px-4 py-2">Employee ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((data, i) => (
                    <tr key={data.employeeId}>
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">{data.employeeId}</td>
                      <td className="px-4 py-2">{data.employeeName}</td>
                      <td className="px-4 py-2">{data.departmentName}</td>
                      <td className="px-4 py-2">{data.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
      <button
        onClick={handleLoadMore}
        className="mt-4 px-4 py-2 border bg-gray-100 hover:bg-gray-200 text-black font-semibold rounded w-full sm:w-auto"
      >
        Load More
      </button>
    </div>
  );
};

export default AttendanceReport;
