import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../Spinner";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios(
          "http://localhost:5000/api/v1/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success(summary?.data?.message);
        setSummary(summary?.data);
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
    fetchSummary();
  }, []);

  return (
    <>
      {summary ? (
        <div className="p-6">
          <h3 className="text-2xl font-bold text-center">Dashboard Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SummaryCard
              icon={<FaUsers />}
              text={"Total Employees"}
              number={summary?.totalEmployees}
              color={"bg-teal-600"}
            />
            <SummaryCard
              icon={<FaBuilding />}
              text={"Total Departments"}
              number={summary?.totalDepartments}
              color={"bg-yellow-600"}
            />
            <SummaryCard
              icon={<FaMoneyBillWave />}
              text={"Monthly Pay"}
              number={summary?.totalSalary}
              color={"bg-red-600"}
            />
          </div>
          <div className="mt-12">
            <h4 className="text-center text-2xl font-bold">Leave Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <SummaryCard
                icon={<FaFileAlt />}
                text={"Leave Applied"}
                number={summary?.leaveSummary?.appliedFor}
                color={"bg-teal-600"}
              />
              <SummaryCard
                icon={<FaCheckCircle />}
                text={"Leave Approved"}
                number={summary?.leaveSummary?.approved}
                color={"bg-green-600"}
              />
              <SummaryCard
                icon={<FaHourglassHalf />}
                text={"Leave Pending"}
                number={summary?.leaveSummary?.pending}
                color={"bg-yellow-600"}
              />
              <SummaryCard
                icon={<FaTimesCircle />}
                text={"Leave Rejected"}
                number={summary?.leaveSummary?.rejected}
                color={"bg-red-600"}
              />
            </div>
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

export default AdminSummary;
