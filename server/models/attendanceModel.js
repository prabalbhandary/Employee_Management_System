import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Leave", "Sick"],
        default: null
    }
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;