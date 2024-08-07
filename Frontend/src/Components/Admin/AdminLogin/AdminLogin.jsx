import "./AdminLogin.css";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Button, InputAdornment, TextField } from "@mui/material";
function AdminLogin() {
  return (
    <div className="adminLogin-Container">
      <div className="login-content">
        <h3>Admin Login</h3>
        <div className="login-inputs">
          <TextField
            id="outlined-basic"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon  fontSize="small"/>
                </InputAdornment>
              ),
            }}
            label="Email"
            variant="outlined"
            size="small"
            margin="dense"
          />
          <TextField
            id="outlined-basic"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small"/>
                </InputAdornment>
              ),
            }}
            label="Password"
            variant="outlined"
            size="small"
            margin="dense"
          />
        </div>
        <Button className="button" variant="contained">Login</Button>
      </div>
    </div>
  );
}

export default AdminLogin;
