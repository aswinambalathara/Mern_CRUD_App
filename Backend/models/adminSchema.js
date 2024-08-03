const mongoose = require('mongoose');

const Schema = mongoose.Schema

const adminSchema = Schema({

    email:{
        type:String,
        required : true,
        unique:true
    },

    password :{
        type:String,
        required : true
    },
});

module.exports = mongoose.model('admin',adminSchema);