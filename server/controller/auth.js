const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const Inventory=require("../model/inventoryModel");
require('dotenv').config();
exports.register = async (req, res) => {
    try {
        //check if the user already exitst
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist)
            return res.send({
                success: false,
                message: "user Already Exist"
            });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const user = new User(req.body);
        await user.save();
        return res.send({
            success: true,
            message: "USer Regisatration successfully"
        });
    }
    catch (err) {
        return res.send({
            success: false,
            data: req.body,
            error: "register errror",
            message: err.message
        });
    }
}


exports.login = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (!userExist)
            return res.send({
                success: false,
                message: "User Not registered"
            });
        //check if user ttype is matching

            if(userExist.userType!==req.body.userType){
                return res.send({
                    success:false,
                    message:`user is not registered as  ${req.body.userType}`
                });
            }
        const validPassword = await bcrypt.compare(req.body.password, userExist.password);
        if (!validPassword)
            return res.send({
                success: false,
                message: "entered wrong password! try again"
            });
        const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.send({
            success: true,
            message: 'User Logged In Successfully',
            data: token
        })
    }
    catch (err) {
        res.send({

            success: false,
            message: err.message
        });
    }
}


exports.currentUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        return res.send({
            success: true,
            message: "user fetched successfully",
            data: user
        });
    }
    catch (err) {
        return res.send({
            success: false,
            message: err.message
        });
    }
}


exports.getAllUniqueDonars=async(req,res)=>{
    try{
        //get all unique donar id from inventory
        const organization=new mongoose.Types.ObjectId(req.body.userId);
        const uniqueDonarIds=await Inventory.distinct("donar",{organization});
        const donars = await User.find(
            { _id: { $in: uniqueDonarIds } },
            { password: 0 } // Exclude the password field
        );
        return res.send({
            success:true,
            message:"donars fetched succeessfully",
            data:donars
        });
    }
    catch(err){
        console.log("getAllUniqueDonars failed");
        return res.send({
            success:false,
            message:err.message
        });
    }
};

exports.getAllUniqueHospitals=async(req,res)=>{
    try{
        //get all unique donar id from inventory
        const organization=new mongoose.Types.ObjectId(req.body.userId);
        const uniqueHospitalIds=await Inventory.distinct("hospital",{organization});
        const hospitals = await User.find(
            { _id: { $in: uniqueHospitalIds } },
            { password: 0 } // Exclude the password field
        ); 
        return res.send({
            success:true,
            message:"Hospital Data fetched succeessfully",
            data:hospitals
        });
    }
    catch(err){
        console.log("getAllUniqueHospital failed");
        return res.send({
            success:false,
            message:err.message
        });
    }
};


//get all unique organisation for donar

exports.getAllUniqueOrganizationForDonar=async(req,res)=>{
    try{
        //get all unique donar id from inventory
        const donar=new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds=await Inventory.distinct("organization",{donar});
        const organization = await User.find(
            { _id: { $in: uniqueOrganizationIds } },
            { password: 0 } // Exclude the password field
        ); 
        return res.send({
            success:true,
            message:"organization Data fetched succeessfully",
            data:organization
        });
    }
    catch(err){
        console.log("getAllUniqueorganizationfor DOnar failed");
        return res.send({
            success:false,
            message:err.message
        });
    }
};

exports.getAllUniqueOrganizationforAHospital=async(req,res)=>{
    try{
        //get all unique donar id from inventory
        const hospital=new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds=await Inventory.distinct("organization",{hospital});
        const organization = await User.find(
            { _id: { $in: uniqueOrganizationIds } },
            { password: 0 } // Exclude the password field
        ); 
        return res.send({
            success:true,
            message:"organization Data fetched succeessfully",
            data:organization
        });
    }
    catch(err){
        console.log("getAllUniqueorganizationfor Hospital failed");
        return res.send({
            success:false,
            message:err.message
        });
    }
};


