const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = Schema({
    fullName : {
        type : String,
        required : true
    },

    email:{
        type:String,
        required : true,
        unique:true
    },

    password :{
        type:String,
        required : true
    },

    image:{
        type:String
    }
});

module.exports = mongoose.model('user',userSchema);