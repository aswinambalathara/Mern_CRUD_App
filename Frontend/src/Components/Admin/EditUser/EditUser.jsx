import { Button, TextField } from "@mui/material";
import axios from "../../../Axios/Axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditUser() {
  const {currentAdmin} = useSelector(state =>state.admin);
  const { userId } = useParams();
  const [user, setUser] = useState({
    fullName:'',
    email:'',
    password:''
  });
  const [errors,setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`admin/get_user/${userId}`,{
          headers: {
            admintoken: currentAdmin.admintoken,
          },
        });
        if(response){
          setUser(response.data.user)
        }
      } catch (err) {
        setError("Error fetching user details ==editUser", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

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
  const handleSubmit = async () => {
    const updateErrors = validateForm();
    if (Object.keys(updateErrors).length === 0) {
      setErrors({});
      try {
        const response = await axios.patch(`/admin/edit_user/${userId}`,user, {
          headers: {
            admintoken: currentAdmin.admintoken,
          },
        });
        if (response) {
          console.log(response);
          alert("User updated successfully");
        }
      } catch (error) {
        console.error("Frontend updateUser == Error", error);
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
      setErrors(updateErrors);
    }
  };
  return (
    <div className="create-user-container">
      <div className="user-content">
        <h3>Edit User</h3>
        <div className="create-inputs">
          <TextField
            style={{
              width: "400px",
            }}
            name="fullName"
            onChange={handleChange}
            value={user.fullName}
            id="outlined-basic-fullName"
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
            id="outlined-basic-email"
            size="small"
            label="Email"
            name="email"
            onChange={handleChange}
            value={user.email}
            variant="outlined"
            margin="normal"
          />
          {errors.email && (
            <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
              {errors.email}
            </div>
          )}
          <TextField
            name="password"
            onChange={handleChange}
            value={user.password}
            id="outlined-basic-password"
            size="small"
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
          />
        </div>
        {errors.password && (
            <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
              {errors.password}
            </div>
          )}
        <Button
        onClick={handleSubmit}
          style={{ marginTop: "20px" }}
          variant="contained"
          size="small"
          className="add-btn"
        >
          Edit User
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

export default EditUser;
