import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const depColumns = [
  {
    name: "S.No.",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Actions",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (confirm) {
      try {
        const res = await axios.delete(
            `http://localhost:5000/api/v1/department/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );          
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          onDepartmentDelete();
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
    }
  };
  return (
    <div className="flex space-x-3">
      <button
        onClick={() =>
          navigate(`/admin-dashboard/departments/department/${_id}`)
        }
        className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(_id)}
        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white"
      >
        Delete
      </button>
    </div>
  );
};
