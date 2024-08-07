import "./AdminDashboard.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import React from "react";

function AdminDashboard() {
  return (
    <div className="dashboard">
      <h4>Registered Users</h4>

      <table>
        <tr className="table-header">
          <th>Full Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        <tr>
          <td>Aswin Nair T M</td>
          <td>aswinnairtm@gmail.com</td>
          <td>
            <IconButton aria-label="delete">
              <BorderColorIcon color="warning" fontSize="small"/>
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon color="error" fontSize="small"/>
            </IconButton>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default AdminDashboard;
