import { useNavigate } from "react-router-dom"

export const cols = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width: "120px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px"
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "140px"
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "170px"
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "80px"
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "120px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"
    }
]

export const LeaveButtons = ({_id}) => {
    const navigate = useNavigate()
    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/leave/${id}`)
    }
    return (
        <button className="px-4 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded" onClick={() => handleView(_id)}>View</button>
    )
}