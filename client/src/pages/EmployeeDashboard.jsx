import React from 'react'
import {Outlet} from "react-router-dom"
import EmployeeSidebar from '../components/EmployeeDashboard/EmployeeSidebar'
import Navbar from '../components/Dashboard/Navbar'

const EmployeeDashboard = () => {
  return (
    <div className='flex'>
        <EmployeeSidebar />
        <div className='flex-1 ml-64 bg-gray-100 h-screen'>
            <Navbar />
            <Outlet />
        </div>
    </div>
  )
}

export default EmployeeDashboard