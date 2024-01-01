
import User from "../models/userModel.js";
import orderModel from "../models/orderModels.js";
import crypto from "crypto";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

import bcryptjs from 'bcryptjs';

// register user

export const registerUser = async (req, res) => {

    try {

        const { name, email, password, userImage } = req.body;
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ error: "email is Required" });
        }
        if (!password) {
            return res.send({ error: "password is Required" });
        }
        if (!userImage) {
            return res.send({ error: "userImage is Required" });
        }

        //check user
        const exisitingUser = await User.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new User({
            name,
            email,
            password: hashedPassword,
            userImage,
        }).save();

        res.status(201).json({
            status: "success",
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });

    }

};




// login user

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        //check user

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                userImage: user.userImage,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};



// Forgot Password

export const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Emai is required" });
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" });
        }
        //check
        const user = await User.findOne({ email });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email",
            });
        }
        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};



//update profile

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,

            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

//orders

export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "+photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//all orders

export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "+photo")
            .populate("buyer", "name")
            .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status

export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};



//update user


export const updateUserController = async (req, res) => {
    try {
        const { name, email, role, userImage } = req.body;
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, role, userImage },
            { new: true }
        );
        res.status(200).send({
            success: true,
            messsage: "user Updated Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating user",
        });
    }
};



// get all user


export const UserControlller = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({
            success: true,
            message: "All user List",
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all user",
        });
    }
};



// single user

export const singleUserController = async (req, res) => {
    try {
        const user = await User.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get Single user SUccessfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single user",
        });
    }
};



//delete user


export const deleteUserCOntroller = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting User",
            error,
        });
    }
};
