import "./CreateUser.css";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../Axios/Axios";
import { useSelector } from "react-redux";

function CreateUser() {
  const navigate = useNavigate()
  const {currentAdmin} = useSelector((state)=>state.admin)
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const validateForm = () => {
    const errors = {};
    if (!user.fullName) {
      errors.fullName = "This field is required";
    }

    if (!user.email) {
      errors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Invalid Email";
    }

    if (!user.password) {
      errors.password = "This field is required";
    } else if (user.password.length < 6) {
      errors.password = "Password must be minimum 6 characters";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const createUserErrors = validateForm();
    if (Object.keys(createUserErrors).length === 0) {
      setErrors({});
      try {
        const response = await axios.post("/admin/create_user", user,{
          headers: {
            admintoken: currentAdmin.admintoken,
          },
        });
        if (response) {
          alert('user added')
          navigate('/admin');
        }
      } catch (error) {
        console.error("Frontend addUser== Error", error);
        const { response } = error;
        if (response && response.data && response.data.message) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            response: response.data.message,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            response: "An unexpected error occurred.",
          }));
        }
      }
    } else {
      setErrors(createUserErrors);
    }
  };
  return (
    <div className="create-user-container">
      <div className="user-content">
        <h3>Create User</h3>
        <div className="create-inputs">
          <TextField
            style={{
              width: "400px",
            }}
            id="outlined-basic"
            name="fullName"
            onChange={handleChange}
            value={user.fullName}
            size="small"
            label="Full Name"
            variant="outlined"
            margin="normal"
          />
          {errors.fullName && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.fullName}
                </div>
              )}
          <TextField
            id="outlined-basic"
            size="small"
            name="email"
            onChange={handleChange}
            value={user.email}
            label="Email"
            variant="outlined"
            margin="normal"
          />
          {errors.email && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.email}
                </div>
              )}
          <TextField
            id="outlined-basic"
            size="small"
            name="password"
            onChange={handleChange}
            value={user.password}
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />{errors.password && (
            <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
              {errors.password}
            </div>
          )}
        </div>
        <Button
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
          variant="contained"
          size="small"
          className="add-btn"
        >
          Add User
        </Button>
        {errors.response && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.response}
                </div>
              )}
      </div>
    </div>
  );
}

export default CreateUser;
