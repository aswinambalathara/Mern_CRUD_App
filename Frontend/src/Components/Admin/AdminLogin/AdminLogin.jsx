import "./AdminLogin.css";
import axios from "../../../Axios/Axios";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signAdminInSuccess } from "../../../Redux/admin/adminSlice";
function AdminLogin() {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateForm = () => {
    const errors = {};

    if (!admin.email) {
      errors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(admin.email)) {
      errors.email = "Invalid Email";
    }

    if (!admin.password) {
      errors.password = "This field is required";
    } else if (admin.password.length < 6) {
      errors.password = "Password must be minimum 6 characters";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const adminLoginErrors = validateForm();
    if (Object.keys(adminLoginErrors).length === 0) {
      setErrors({});
      try {
        const response = await axios.post("/admin/login", admin);
        if (response) {
          const { data } = response;
          //console.log(data)
          dispatch(signAdminInSuccess(data));
          navigate("/admin", { replace: true });
        }
      } catch (error) {
        console.error("Frontend AdminLogin== Error", error);
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
      setErrors(adminLoginErrors);
    }
  };

  return (
    <div className="adminLogin-Container">
      <div className="login-content">
        <h3>Admin Login</h3>
        <div className="login-inputs">
          <TextField
            id="outlined-basic-email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            value={admin.email}
            name="email"
            onChange={handleChange}
            label="Email"
            variant="outlined"
            size="small"
            margin="dense"
          />
          {errors.email && (
            <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
              {errors.email}
            </div>
          )}
          <TextField
            id="outlined-basic-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            value={admin.password}
            name="password"
            type="password"
            onChange={handleChange}
            label="Password"
            variant="outlined"
            size="small"
            margin="dense"
          />
          {errors.password && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.password}
                </div>
              )}
        </div>
        <Button onClick={handleSubmit} className="button" variant="contained">
          Login
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

export default AdminLogin;
