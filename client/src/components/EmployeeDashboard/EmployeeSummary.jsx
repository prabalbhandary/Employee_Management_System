import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const EmployeeSummary = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-xl md:text-2xl font-bold text-center mb-4">Dashboard Overview</h3>
      <div className="flex items-center bg-white rounded shadow-md p-4 md:p-6">
        <div
          className="text-4xl md:text-5xl flex justify-center items-center bg-teal-600 text-white rounded-full w-12 h-12 md:w-16 md:h-16"
        >
          <FaUser />
        </div>
        <div className="pl-4">
          <p className="text-base md:text-lg font-semibold">Welcome Back,</p>
          <p className="text-lg md:text-xl font-bold">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
