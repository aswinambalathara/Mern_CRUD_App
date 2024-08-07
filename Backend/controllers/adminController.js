const adminModel = require("../models/adminModel");
const jwt = require('jsonwebtoken');
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
    const adminToken = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      status: true,
      message: "Admin Authenticated",
      admintoken:adminToken,
    });
  } catch (error) {
    console.error(`doAdminLoginError == ${error}`);
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    let { page, limit, searchTerm } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const skip = (page - 1) * limit;
    const searchFilter = searchTerm
      ? {
          $or: [
            { fullName: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const users = await userModel.find(searchFilter).skip(skip).limit(limit).exec();
    const totalCount = await userModel.countDocuments(searchFilter).exec();

    return res.status(200).json({
      status: true,
      users: users,
      hasMore: skip + limit < totalCount,
    });
  } catch (error) {
    console.error(`getUsersError == ${error}`);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.doCreateUser = async (req,res) =>{
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
        console.error(`createUserError == ${error}`);
    }
}

module.exports.doAdminEditUser = async (req,res) =>{
    try {
      const {id} = req.params
      let { fullName, email, password } = req.body;
      const user = await userModel.findById(id);
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
        { _id: id },
        { $set: update }
      );
      if (updateUser) {
        return res.status(200).json({
          status: true,
          message: "Success",
        });
      }
    } catch (error) {
        console.error(`adminEditUserError == ${error}`);
    }
}

  module.exports.doDeleteUser = async (req,res) =>{
      try {
          const {id} = req.params;
          const deleteResult = await userModel.deleteOne({_id:id});
          if(deleteResult.deletedCount === 0){
            return res.status(404).json({
              status:false,
              message:"User Not found"
            });
          }

          return res.json({
            status:true,
            message:'User deleted'
          });
      } catch (error) {
          console.error(`deleteUserError == ${error}`);
      }
  }

module.exports.doSearchUser = async (req,res) =>{
    try {
        const {searchTerm} = req.query;

        const users = await userModel.find({
          $or:[
            {name:{$regex:searchTerm,$options:'i'}},
            {email:{$regex:searchTerm,$options:'i'}}
          ]
        });

        if(users.length === 0){
          return res.status(404).json({
            status:false,
            message:"No users found"
          })
        }

        return res.json({ status: true, users });
    } catch (error) {
        console.error(`searchUserError == ${error}`);
    }
}

module.exports.doGetUser = async (req,res) =>{
  try {
    const { id } = req.params;
    const user = await userModel.findOne({_id:id});
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
    console.error(`getAdminUserError == ${error}`);
  }
}