import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const empColumns = [
  {
    name: "S.No.",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px"
  },
  {
    name: "Actions",
    selector: (row) => row.action,
    center: "true"
  },
];

export const fetchDepartments = async () => {
    let departments
    try {
      const res = await axios.get(
        "https://employee-management-system-8n86.onrender.com/api/v1/department/get",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        departments = res?.data?.departments
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
    }
    return departments
  };

  export const getEmployees = async (id) => {
    let employees
    try {
      const res = await axios.get(
        `https://employee-management-system-8n86.onrender.com/api/v1/employee/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        employees = res?.data?.employees
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
    }
    return employees
  };

  export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();
    return (
      <div className="flex space-x-3">
        <button
          onClick={() => navigate(`/admin-dashboard/employees/employee/${_id}`)}
          className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white"
        >
          View
        </button>
        <button
          onClick={() => navigate(`/admin-dashboard/employees/employee/edit/${_id}`)}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Edit
        </button>
        <button
        onClick={() => navigate(`/admin-dashboard/employees/employee/salary/${_id}`)}
          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          Salary
        </button>
        <button
        onClick={() => navigate(`/admin-dashboard/employees/employee/leave/${_id}`)}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white"
        >
          Leave
        </button>
      </div>
    );
  };