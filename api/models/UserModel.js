const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserRole = require('../enums/UserRole');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        requires: [true, 'Name field is required'],
        maxlength: 100
    },
    email:{
        type:String,
        requires: [true, 'Email field is required'],
        unique: true
    },
    username:{
        type:String,
        requires: [true, 'Username field is required'],
        unique: true
    },
    password:{
        type:String,
        requires: [true, 'Password field is required'],
        minlength: 8
    },
    role:{
        type: String,
        enum: UserRole,
        default: UserRole.CUSTOMER
    },
    profile_image:{
        type: String,
        required: false
    },
    phone_number:{
        type: String,
        required: false
    },
    create_data:{
        type: Date,
        default: Date.now
    }
    
})

const User = mongoose.model('User', UserSchema);
module.exports = {User}