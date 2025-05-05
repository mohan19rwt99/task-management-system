import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs"

export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        const existUser = await UserModel.findOne({email})
        if(existUser){
            return res.status(401).json({success:false,message:"User already register"})
        }

        const hasepassword = await bcryptjs.hashSync(password,10)

        const newUser = new UserModel({
            name,email,password:hasepassword
        })

        await newUser.save()

        res.status(200).json({ success: true, user: newUser ,message:"Successfuly registerd"});
    } catch (error) {
        res.status(500).json({success:false, message:"internal serve"})
        console.log("error", error)   
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(404).json({success:false, message:"Invalid credentials"})
        }

        const isPasswordValid = await bcryptjs.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(404).json({success:false, message:"Invalid credentials"})
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            maxAge:3600000
        })

        res.status(200).json({success:true, message:"Login Successfully", user, token})
    } catch (error) {
        res.status(500).json({success:false, message:"internal serve"})
        console.log("error", error) 
    }
}

export const Logout = async (req, res) => {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: "User logout successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  