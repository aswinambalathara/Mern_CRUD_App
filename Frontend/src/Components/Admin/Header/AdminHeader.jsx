import { Button } from '@mui/material'
import './AdminHeader.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { adminSignOut } from "../../../Redux/admin/adminSlice";
import { Link } from 'react-router-dom';

function AdminHeader() {
  const {currentAdmin} = useSelector(state=>state.admin);
  const dispatch = useDispatch()
  if(currentAdmin) {
    return (
      <div className='admin-Header'>
          <Link to='/admin' style={{textDecoration:'none',color:'white'}}><h3>MERN-CRUD-APP</h3></Link>
          <div>
          <Link to='/admin/create_user'><Button variant="contained" color='primary' size='small' style={{borderRadius:'5px',marginRight:'10px'}}>Create User</Button></Link>
          <Button variant="contained" onClick={()=>dispatch(adminSignOut())} color='error' size='small' style={{borderRadius:'5px'}}>Log out</Button>
          </div>
      </div>
    )
  }else{
    return (
      <div className='admin-Header'>
          <h3>MERN-CRUD-APP</h3>
      </div>
    )
  }
}

export default AdminHeader