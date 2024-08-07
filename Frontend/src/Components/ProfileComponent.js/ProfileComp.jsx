import "./ProfileComp.css";
import { Button, TextField } from "@mui/material";
import { default_profile_pic } from "../../Constants/Constant";
import React, { useEffect, useState } from "react";
import axios from "../../Axios/Axios";
import {userUpdate} from '../../Redux/user/userSlice';
import { useDispatch, useSelector } from "react-redux";

function ProfileComp() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUserData] = useState({});
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/profile", {
          headers: {
            token: currentUser.token,
          },
        });
        if (response) {
          setUserData(response.data.user);
        }
      } catch (error) {
        setError("Error fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...user,
      [name]: value,
    });
  };

  const handleImageUpload = async () => {
    setLoading(true)
    if (image) {
      const formData = new FormData();
      formData.append("image",image);
      try {
        const response = await axios.patch("/profile/uploadImage", formData, {
          headers: {
            token: currentUser.token,
            "Content-Type":"multipart/form-data",
          },
        });
        if(response){
          setLoading(false)
          const {data} = response;
          setUserData({
            ...user,
            'image':data.url
          })
        }
      } catch (error) {
        console.error("Frontend updateImageProfile== Error", error);
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
    }
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
        const response = await axios.patch("/profile/edit", user, {
          headers: {
            token: currentUser.token,
          },
        });
        if (response) {
          console.log(response);
          dispatch(userUpdate(user.fullName))
          alert("User updated successfully");
        }
      } catch (error) {
        console.error("Frontend updateImageProfile== Error", error);
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="Profile-Container">
      <div className="profile-content">
        <div className="left-section">
          <div
            className="profile-pic"
            style={{
              backgroundImage: `url(${
                user.image ? user.image : default_profile_pic
              })`,
            }}
          ></div>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept=".jpg,.svg,.png,.webp"
          />
          <Button variant="text" size="small" onClick={handleImageUpload}>
            Upload Image
          </Button>
        </div>
        <div className="right-section">
          <h3 className="title-profile">Profile</h3>
          <TextField
            id="outlined-basic-fullName"
            size="small"
            onChange={handleChange}
            name="fullName"
            value={user.fullName}
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
            onChange={handleChange}
            name="email"
            label="Email"
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
            id="outlined-basic-password"
            size="small"
            onChange={handleChange}
            name="password"
            label="Password"
            value={user.password}
            variant="outlined"
            margin="normal"
            type="password"
          />
          {errors.password && (
            <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
              {errors.password}
            </div>
          )}
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            size="small"
            onClick={handleSubmit}
            className="update-btn"
          >
            Update
          </Button>
          {errors.response && (
            <div style={{ fontSize: "small", color: "red", margin: "4px" }}>
              {errors.response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileComp;
