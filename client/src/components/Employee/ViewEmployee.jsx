import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `https://employee-management-system-8n86.onrender.com/api/v1/employee/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          setEmployee(res?.data?.employee);
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
    fetchEmployee();
  }, []);
  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={employee?.userId?.profileImage}
                alt="Profile"
                className="rounded-full border w-72"
              />
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{employee?.userId?.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee Id:</p>
                <p className="font-medium">{employee?.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Date of Birth:</p>
                <p className="font-medium">
                  {new Date(employee?.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{employee?.gender}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{employee?.department?.dep_name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Maritial Status:</p>
                <p className="font-medium">{employee?.maritalStatus}</p>
              </div>
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

export default ViewEmployee;
