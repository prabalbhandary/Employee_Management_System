import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";

const AddEmployee = () => {
  const [formData, setFormData] = useState({});
  const [departments, setDepartments] = useState([]);
  const [imageName, setImageName] = useState("No file chosen");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
      setImageName(files[0] ? files[0].name : "No file chosen");
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const getDepartments = async () => {
      const gDepartments = await fetchDepartments();
      setDepartments(gDepartments);
    };
    getDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    try {
      const res = await axios.post(
        "https://employee-management-system-8n86.onrender.com/api/v1/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin-dashboard/employees");
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
      <h2 className="text-center text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="employeeId"
            placeholder="Enter Employee ID"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <select
            name="gender"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select
            name="maritalStatus"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
          <input
            type="text"
            name="designation"
            placeholder="Enter Designation"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <select
            name="department"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.dep_name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="salary"
            placeholder="Enter Salary"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          <select
            name="role"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
          <div className="flex flex-col items-center">
            <input
              type="file"
              id="profileImage"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <label
              htmlFor="profileImage"
              className="cursor-pointer bg-teal-600 text-white flex items-center gap-2 py-2 px-4 rounded-md hover:bg-teal-700"
            >
              <FiUpload /> Upload Image
            </label>
            <span className="text-sm text-gray-600 mt-2">{imageName}</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 text-white hover:bg-teal-700 font-bold py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
