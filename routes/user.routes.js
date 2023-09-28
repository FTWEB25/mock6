const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const UserModel = require("../models/user.model")


const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    const {userName,email,password}=req.body
    try {
        const user=await UserModel.findOne({email:email})
        if(user){
            res.status(200).json({msg:"user already Exist!"})
        }else{
            bcrypt.hash(password, 2, async(err, hash) =>{
                // Store hash in your password DB.
                if(err){
                    res.status(400).json({error:err.message})  
                }else{
                    const newUser= new UserModel({userName:userName,email:email,password:hash})
                    await newUser.save()
                    res.status(200).json({msg:"User Has Been Added Successfully"})
                }
            });
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email:email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result) =>{
                // result == true
                if(result){
                    var token = jwt.sign({ userName:user.userName,userId:user._id }, 'shhhhh');
                    res.status(200).json({msg:"Login Successfull",toke:token})
                }else{
                    res.status(200).json({msg:"Please Check Your Password"})
                }
            });
        }else{
            res.status(200).json({msg:"Please Signup First"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})



module.exports=userRouter