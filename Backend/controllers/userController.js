const userModel = require("../models/userModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { cloudinary, uploadToCloudinary } = require("../middlewares/cloudinary");
const jwt = require("jsonwebtoken");

module.exports.doLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        status: false,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign(
      { userName: user.fullName, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      status: true,
      message: "User Authenticated",
      userName: user.fullName,
      token,
    });
  } catch (error) {
    console.error(`doLoginError == ${error}`);
  }
};

module.exports.doSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const userExist = await userModel.findOne({ email: email });
    if (!userExist) {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new userModel({
        fullName,
        email,
        password: hashPassword,
      });
      const registered = await newUser.save();
      if (registered) {
        return res.status(201).json({
          message: "User Registered",
          status: true,
        });
      }
    } else {
      return res.status(409).json({
        message: "User already exist, Try Login",
        status: false,
      });
    }
  } catch (error) {
    console.error(`doSignupError == ${error}`);
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Success",
      user: user,
    });
  } catch (error) {
    console.error(`getProfileError == ${error}`);
  }
};

module.exports.doEditProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    let { fullName, email, password } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    if (user.password === password) {
      password = "";
    }
    const hashPassword = !password.length
      ? undefined
      : await bcrypt.hash(password, 12);
    const update = {
      fullName: fullName.length !== 0 ? fullName : undefined,
      email: email.length !== 0 ? email : undefined,
      password: hashPassword,
    };
    const updateUser = await userModel.updateOne(
      { _id: userId },
      { $set: update }
    );
    if (updateUser) {
      return res.status(200).json({
        status: true,
        message: "Success",
      });
    }
  } catch (error) {
    console.error(`DoEditProfileError == ${error}`);
  }
};

module.exports.doUploadImage = async (req, res) => {
  try {
    const { userId } = req.user;
    const result = await uploadToCloudinary(req.file.buffer);
    const url = result.secure_url;
    const update = await userModel.updateOne(
      { _id: userId },
      {
        $set: {
          image: url,
        },
      }
    );
    if (update) {
      return res.json({
        status: true,
        url: url,
      });
    }
  } catch (error) {
    console.error(`DoUploadImageError == ${error}`);
  }
};
