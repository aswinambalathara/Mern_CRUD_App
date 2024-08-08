import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function AdminPrivatePage() {
    const {currentAdmin} = useSelector(state=>state.admin);
    return currentAdmin? <Outlet/> : <Navigate to='/admin/login'/>
}

export default AdminPrivatePage