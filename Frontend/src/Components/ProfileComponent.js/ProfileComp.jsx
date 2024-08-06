import "./ProfileComp.css";
import { Button, TextField } from "@mui/material";
import {default_profile_pic} from '../../Constants/Constant'
import React from "react";

function ProfileComp() {
  return (
    <div className="Profile-Container">
      <div className="profile-content">
        <div className="left-section">
          <div className="profile-pic" style={{backgroundImage:`url(${default_profile_pic})`}}></div>
          <Button size="small" variant="outlined">
            Add Image
          </Button>
        </div>
        <div className="right-section">
          <h3 className="title-profile">Profile</h3>
          <TextField
            id="outlined-basic"
            size="small"
            label="Full Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            size="small"
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="outlined-basic"
            size="small"
            label="Password"
            variant="outlined"
            margin="normal"
          />
          <Button

          style={{marginTop:'20px'}}
            variant="contained"
            size="small"
            className="update-btn"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
