import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { IoIosLogOut } from 'react-icons/io'

const Navbar = () => {
  const { user, logout } = useAuth()
  return (
    <div className="flex items-center justify-between h-12 bg-teal-600 text-white px-4 sm:px-5">
      <p className="text-sm sm:text-base">
        Welcome back, {user && user?.name}
      </p>
      <button
        className="flex items-center gap-2 px-3 py-1 text-sm bg-teal-700 hover:bg-red-800 rounded"
        onClick={logout}
      >
        <IoIosLogOut size={20} />
        <span className="hidden sm:block">Logout</span>
      </button>
    </div>
  )
}

export default Navbar
