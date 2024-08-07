import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function UserPrivatePage() {
    const {currentUser} = useSelector(state=>state.user)
  return currentUser? <Outlet/> : <Navigate to='login'/>
}

export default UserPrivatePage