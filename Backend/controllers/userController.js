const userModel = require("../models/userModel");

module.exports.doLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(`doLoginError == ${error}`);
  }
};

module.exports.doSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const userExist = await userModel.findOne({ email: email });
    if (!userExist) {
      const newUser = new userModel({
        fullName,
        email,
        password,
      });
      const registered = await newUser.save();
      if (registered) {
        return res.status(200).json({
          message: "User Registered",
          status: true, 
        });
      }
    } else {
      res.status(409).json({
        message: "User already exist, Try Login",
        status: false,
      });
    }
  } catch (error) {
    console.error(`doSignupError == ${error}`);
  }
};
