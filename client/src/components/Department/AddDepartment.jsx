import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://employee-management-system-y3lq.vercel.app/api/v1/department/add",
        department, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin-dashboard/departments");
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
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl text-center font-bold mb-6">
        Add New Department
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dep_name"
            className="text-sm font-medium text-gray-700"
          >
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            id="dep_name"
            value={department.dep_name}
            onChange={handleChange}
            placeholder="Department Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={department.description}
            onChange={handleChange}
            placeholder="Department Description"
            rows="4"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md block"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
