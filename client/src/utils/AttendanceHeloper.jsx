import axios from "axios";
import { toast } from "react-toastify";

export const attCols = [
  {
    name: "S.No.",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
  },
  {
    name: "Actions",
    selector: (row) => row.action,
    center: "true",
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChanged }) => {
  const markEmployee = async (status, employeeId) => {
    try {
        const res = await axios.put(`https://employee-management-system-8n86.onrender.com/api/v1/attendance/update/${employeeId}`, { status }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (res?.data?.success) {
            toast.success(res?.data?.message);
            statusChanged();
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
    <div className="space-y-2 sm:space-y-0 sm:space-x-8 sm:flex sm:justify-start sm:items-center sm:flex-wrap">
      {status === null ? (
        <div className="flex flex-col sm:flex-row sm:space-x-4 sm:w-full">
          <button
            onClick={() => markEmployee("Present", employeeId)}
            className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 w-full sm:w-auto rounded mb-2 sm:mb-0"
          >
            Present
          </button>
          <button
            onClick={() => markEmployee("Absent", employeeId)}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto rounded mb-2 sm:mb-0"
          >
            Absent
          </button>
          <button
            onClick={() => markEmployee("Sick", employeeId)}
            className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 w-full sm:w-auto rounded mb-2 sm:mb-0"
          >
            Sick
          </button>
          <button
            onClick={() => markEmployee("Leave", employeeId)}
            className="px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700 w-full sm:w-auto rounded"
          >
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-2 rounded mx-auto sm:mx-0">{status}</p>
      )}
    </div>
  );
};
