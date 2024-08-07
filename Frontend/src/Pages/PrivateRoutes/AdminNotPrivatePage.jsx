import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AdminNotPrivatePage() {
    const {currentAdmin} = useSelector(state=>state.admin);
  return !currentAdmin? <Outlet/> : <Navigate to='/admin'/>
}

export default AdminNotPrivatePage