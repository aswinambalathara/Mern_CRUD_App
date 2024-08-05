const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
require("dotenv").config();

module.exports.doAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({
        status: false,
        message: "Invalid Password",
      });
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      status: true,
      message: "Admin Authenticated",
      token,
    });
  } catch (error) {
    console.error(`doAdminLoginError == ${error}`);
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const skip = (page - 1) * limit;
    const users = await userModel.find().skip(skip).limit(limit).exec();
    const totalCount = await userModel.countDocuments().exec();

    return res.status(200).json({
      status: true,
      users: users,
      hasMore: skip + limit < totalCount,
    });
  } catch (error) {
    console.error(`getUsersError == ${error}`);
  }
};

module.exports.doCreateUser = async (req,res) =>{
    try {
        
    } catch (error) {
        console.error(`createUserError == ${error}`);
    }
}

module.exports.doAdminEditUser = async (req,res) =>{
    try {
        
    } catch (error) {
        console.error(`adminEditUserError == ${error}`);
    }
}

module.exports.doDeleteUser = async (req,res) =>{
    try {
        
    } catch (error) {
        console.error(`deleteUserError == ${error}`);
    }
}

module.exports.doSearchUser = async (req,res) =>{
    try {
        
    } catch (error) {
        console.error(`searchUserError == ${error}`);
    }
}