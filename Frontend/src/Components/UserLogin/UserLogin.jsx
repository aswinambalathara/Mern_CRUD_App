import axios from "../../Axios/Axios";
import "./userLogin.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {signInSuccess} from '../../Redux/user/userSlice';
import { useDispatch } from "react-redux";

function UserLogin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const validateForm = () => {
    const errors = {};

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginErrors = validateForm();
    if (Object.keys(loginErrors).length === 0) {
      setErrors({});
      try {
        const response = await axios.post("/login", user);
        if (response) {
			const {data} = response
			//console.log(data)
			dispatch(signInSuccess(data))
          navigate("/",{replace:true});
        }
      } catch (error) {
        console.error("Frontend Login== Error", error);
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
      setErrors(loginErrors);
    }
  };

  return (
    <div className="userLoginContainer">
      <div className="screen-login">
        <div className="screen__content">
          <div className="title">
            <h4>MERN-CRUD_APP</h4>
            <h4>Login</h4>
          </div>
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                onChange={handleChange}
                name="email"
                value={user.email}
                className="login__input"
                placeholder="Email"
              />
			  {errors.email && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.email}
                </div>
              )}
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                name="password"
                className="login__input"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
              />
			  {errors.password && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.password}
                </div>
              )}
            </div>
            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
			{errors.response && (
              <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                {errors.response}
              </div>
            )}
          </form>

          <div className="signup-tag">
            <p>Don't have an accout</p>
            <Link to="/signup">Sign UP</Link>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
