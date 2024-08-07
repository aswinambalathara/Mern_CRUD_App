import React from 'react'
import AdminHeader from '../../Components/Admin/Header/AdminHeader'
import Search from '../../Components/Admin/Search/Search'
import AdminDashboard from '../../Components/Admin/Dashboard/AdminDashboard'


function Dashboard() {
  return (
    <>
    <AdminHeader/>
    <Search/>
    <AdminDashboard/>
    </>
  )
}

export default Dashboard