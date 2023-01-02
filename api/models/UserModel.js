const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserRole = require('../enums/UserRole');

const Schema = mongoose.Schema;

const SALT = 10;

const UserSchema = new Schema({
    name:{
        type:String,
        required: [true, 'Name field is required'],
        maxlength: 100
    },
    email:{
        type:String,
        required: [true, 'Email field is required'],
        unique: true
    },
    username:{
        type:String,
        required: [true, 'Username field is required'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'Password field is required'],
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


// Saving user data
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        //checking if password field is available and modified
        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err)
        
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// For comparing the users entered password with database duing login 
UserSchema.methods.comparePassword = function (candidatePassword, callBack) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callBack(err);
        callBack(null, isMatch);
    });
};

// For generating token when loggedin
UserSchema.methods.generateToken = function (callBack) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRETE);
    
    callBack(null, token);
};

// Validating token for auth routes middleware
UserSchema.statics.findByToken = function (token, callBack) {
    jwt.verify(token, process.env.SECRETE, function (err, decode) {
        // This decode must give user_id if token is valid .ie decode = user_id
        User.findById(decode, function(err, user) {
            if (err) {
                res.json({status: false, data: "Invalid User ID"});
            }

            callBack(null, user);
        });
    });
};


const User = mongoose.model('User', UserSchema);
module.exports = {User}