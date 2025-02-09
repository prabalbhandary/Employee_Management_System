import React from "react";
import { useAuth } from "../../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex w-full items-center justify-between h-12 bg-teal-600 text-white px-5">
      <p>Welcome back, {user && user?.name}</p>
      <button
        className="flex gap-1 px-4 py-1 bg-teal-700 hover:bg-red-800"
        onClick={logout}
      >
        <IoIosLogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
