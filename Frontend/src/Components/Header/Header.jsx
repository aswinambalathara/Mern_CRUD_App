import "./Header.css";
import PersonIcon from '@mui/icons-material/Person';
import { Button } from "@mui/material";
import React from "react";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {userSignOut} from '../../Redux/user/userSlice';
import { useDispatch } from "react-redux";

function Header() {
  const {currentUser} = useSelector(state=>state.user);
  const dispatch = useDispatch()
  const handleClick = () =>{
    dispatch(userSignOut())
  }
  return (
    <div className="Header">
      <Link to='/' style={{textDecoration:'none',color:'white'}}><h3>MERN-APP</h3></Link>
      <div className="Nav-Right">
        {currentUser && <Link to='/profile' style={{textDecoration:'none',color:'white'}}><div className="profile">
        <PersonIcon/>
        <p>{currentUser.userName}</p>
        </div></Link>}
      <Button onClick={handleClick} variant="contained" size="small" color="error">Log out</Button>
      </div>
    </div>
  );
}

export default Header;
