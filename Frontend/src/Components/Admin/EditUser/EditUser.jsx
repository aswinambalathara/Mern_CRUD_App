import { Button, TextField } from '@mui/material';
import React from 'react'

function EditUser() {
    return (
        <div className="create-user-container">
          <div className="user-content">
            <h3>Edit User</h3>
            <div className="create-inputs">
            <TextField
            style={{
                width:"400px"
            }}
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
            </div>
            <Button
              style={{ marginTop: "20px" }}
              variant="contained"
              size="small"
              className="add-btn"
            >
              Edit User
            </Button>
          </div>
        </div>
      );
}

export default EditUser