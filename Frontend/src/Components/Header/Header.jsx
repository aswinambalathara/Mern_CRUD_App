import "./Header.css";
import PersonIcon from '@mui/icons-material/Person';
import React from "react";

function Header() {
  return (
    <div className="Header">
      <h3>MERN-APP</h3>
      <div className="Nav-Right">
        
        <div className="profile">
        <PersonIcon/>
        <p>UserName</p>
        </div>
        <p>LogOut</p>
      </div>
    </div>
  );
}

export default Header;
