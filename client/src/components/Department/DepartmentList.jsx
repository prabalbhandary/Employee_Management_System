import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { depColumns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../Spinner";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const res = await axios.get(
        "https://employee-management-system-y3lq.vercel.app/api/v1/department/get",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        let sno = 1;
        const data = await res?.data?.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              _id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));
        setDepartments(data);
        setFilteredData(data);
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
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filteredDep = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(records);
  };
  return (
    <>
      {depLoading ? (
        <Spinner />
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search by Dep Name"
              className="px-4 py-0.5 border"
              onChange={filteredDep}
            />
            <Link
              to="/admin-dashboard/departments/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={depColumns} data={filteredData} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
