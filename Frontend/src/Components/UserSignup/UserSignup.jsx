import "./UserSignup.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Axios/Axios";

function UserSignup() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [confirmPass, setConfirmPass] = useState("");
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
    }else if(user.password.length < 6){
      errors.password = "Password must be minimum 6 characters";
    }

    if (!confirmPass) {
      errors.confirmPass = "This field is required";
    } else if (user.password !== confirmPass) {
      errors.confirmPass = "Password doesn't match";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpErrors = validateForm();
    if (Object.keys(signUpErrors).length === 0) {
      setErrors({});
      try {
        const response = await axios.post("/signup", user);
        if (response) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Frontend SignUp== Error", error);
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
      setErrors(signUpErrors);
    }
  };

  return (
    <div className="userSignupContainer">
      <div className="screen">
        <div className="screen__content_signup">
          <div className="title">
            <h4>MERN-CRUD_APP</h4>
            <h4>Sign UP</h4>
          </div>
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                value={user.fullName}
                className="login__input"
                placeholder="Full Name"
              />
              {errors.fullName && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.fullName}
                </div>
              )}
            </div>

            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                name="email"
                onChange={handleChange}
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
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
              {errors.password && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.password}
                </div>
              )}
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
                type="password"
                className="login__input"
                placeholder="Confirm Password"
              />
              {errors.confirmPass && (
                <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                  {errors.confirmPass}
                </div>
              )}
            </div>
            <button className="button login__submit">
              <span className="button__text">Sign UP Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            {errors.response && (
              <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
                {errors.response}
              </div>
            )}
          </form>

          <div className="signup-tag">
            <p>Already have and account?</p>
            <Link to='/login'>Login</Link>
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

export default UserSignup;
