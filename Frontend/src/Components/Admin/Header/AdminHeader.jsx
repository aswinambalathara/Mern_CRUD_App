import { Button } from '@mui/material'
import './AdminHeader.css'
import React from 'react'

function AdminHeader() {
  return (
    <div className='admin-Header'>
        <h3>MERN-CRUD-APP</h3>
        <div>
        <Button variant="contained" color='primary' size='small' style={{borderRadius:'5px',marginRight:'10px'}}>Create User</Button>
        <Button variant="contained" color='error' size='small' style={{borderRadius:'5px'}}>Log out</Button>
        </div>
    </div>
  )
}

export default AdminHeader