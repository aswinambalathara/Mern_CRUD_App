const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
module.exports.doAdminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
    } catch (error) {
        console.error(`doAdminLoginError == ${error}`);
    }
}