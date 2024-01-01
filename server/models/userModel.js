import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please Enter the user Name"],

    },
    email: {
        type: String,
        required: [true, "please Enter the user email"],
        unique: true,

    },
    password: {
        type: String,
        required: [true, "please Enter the user password"],
    },
    userImage: {
        type: String,
        required: [true, "please Enter the user password"],
    },

    role: {
        type: Number,
        default: 0,
        // required: [true, "please Enter role"],
    },
    // role: {
    //     type: String,
    //     default: "user"
    //     // required: [true, "please Enter role"],
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,


});




const User = mongoose.model('User', userSchema);

export default User;