import "./AdminDashboard.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import React, { useEffect, useState } from "react";
import axios from "../../../Axios/Axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Search from '../Search/Search'

function AdminDashboard() {
  const navigate = useNavigate()
  const {currentAdmin} = useSelector((state)=>state.admin)
  const [loading,setLoading] = useState(false);
  const [users,setUsers] = useState([]);
  const [hasMore,setHasMore] = useState(false);
  const [page,setPage] = useState(0)
 const limit = 10;
  const [searchTerm,setSearch] = useState('');

  useEffect(()=>{
    //console.log(currentAdmin.admintoken)
    const fetchUsers = async()=>{
      try {
         const response = await axios.get("/admin/get_users", {
          headers: {
            admintoken: currentAdmin.admintoken,
          },
          params:{
            searchTerm, page, limit
          }
        });; 

        if(response){
          setUsers(response.data.users);
          setHasMore(response.data.hasMore);
        }
      } catch (error) {
        console.error('Error fetching users==Dashboard',error);
      }finally{
        setLoading(false);
      }
    }
    fetchUsers();
  },[page,limit,searchTerm,users])

  const handleSearchChange = (searchTerm) => {
    console.log(searchTerm)
    setSearch(searchTerm);
    setPage(0)
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };
  
  const handleEditUser = (id) =>{
    // console.log(id)
    navigate(`/admin/edit_user/${id}`);
  }

  const handleDeleteUser = async (id)=>{
    const confirmDelete = window.confirm('Are you sure deleting user ?');
    if(confirmDelete){
      try {
        const response = await axios.delete(`/admin/delete_user/${id}`,{
          headers:{
            admintoken: currentAdmin.admintoken,
          }
        });
        if(response){
          alert("User deleted from database");
        }
      } catch (error) {
        console.log('deleteUserError',error)
      }
    }
  }

  if(loading){
    return (
      <div className="dashboard" style={{minHeight:'400px'}}>
        <div><h4 style={{textAlign:"center",marginTop:'150px'}}>Loading...</h4></div>
      </div>
    )
  }

  return (
    <>
    <Search handleSearch={handleSearchChange}/>
    <div className="dashboard">
      <h4>Registered Users</h4>

      <table>
        <thead>
          <tr className="table-header">
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length>0 ? (users.map(user=>(
                      <tr key={user._id}>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>
                        <IconButton aria-label="edit" onClick={()=>handleEditUser(user._id)}>
                          <BorderColorIcon color="warning" fontSize="small"/>
                        </IconButton>
                        <IconButton aria-label="delete" onClick={()=>handleDeleteUser(user._id)}>
                          <DeleteIcon color="error" fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
          ))):(
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      {hasMore && !loading && (
        <Button onClick={handleLoadMore} variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Load More
        </Button>
      )}
    </div>
    </>
  );
}

export default AdminDashboard;
