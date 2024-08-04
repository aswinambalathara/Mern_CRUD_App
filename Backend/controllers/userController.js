const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require('../middlewares/cloudinary');


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

    return res.status(200).json({
      status: true,
      message: "User Authenticated",
      data : user
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
    const userId = req.params;
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
    });
  } catch (error) {
    console.error(`getProfileError == ${error}`);
  }
};

module.exports.doEditProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, email, password } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    const hashPassword = !password.length
      ? undefined
      : await bcrypt.hash(password, 12);
    const update = {
      fullName: fullName.length !== 0 ? fullName : undefined,
      email: email.length !== 0 ? email : undefined,
      password: hashPassword,
    };
    const updateUser = await userModel.updateOne({ _id: userId }, {$set:update});
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

module.exports.doUploadImage = async (req,res) => {
  try {
    const { userId } = req.params;
  } catch (error) {
    console.error(`DoEditProfileError == ${error}`);
  }
}
