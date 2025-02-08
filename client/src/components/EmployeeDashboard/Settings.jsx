import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [setting, setSetting] = useState({
    userId: user?._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await axios.put("https://employee-management-system-y3lq.vercel.app/api/v1/setting/change-password", setting, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if(res?.data?.success){
          toast.success(res?.data?.message);
          navigate(user?.role === "admin" ? "/admin-dashboard" : "/employee-dashboard");
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
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl text-center font-bold mb-6">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="oldPassword"
            className="text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="Enter your old password"
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
