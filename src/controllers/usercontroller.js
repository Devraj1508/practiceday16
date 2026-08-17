const usermodel=require("../models/usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

async function registeruser(req,res){
    const {username,email,password,bio,profilePicture}=req.body;

    const hashedPassword=await bcrypt.hash(password,10);

    const existinguser=await usermodel.findOne({$or:[{username},{email}]});

    if(existinguser){
        return res.status(400).json({message:"Username or email already exists"});
    }
    const newuser=await usermodel.create({
        username,
        email,
        password:hashedPassword,
        bio,
        profilePicture
    })
    const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token);
    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:newuser._id,
            username:newuser.username,
            email:newuser.email,
            bio:newuser.bio,
            profilePicture:newuser.profilePicture
        }
    })

}

//login user
async function loginuser(req,res){
    const {username,email,password}=req.body;

    const user=await usermodel.findOne({$or:[{username},{email}]});

    if(!user){
        return res.status(400).json({message:"Invalid username or email"});
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid password"});
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token);
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            bio:user.bio,
            profilePicture:user.profilePicture
        }
    });
}
module.exports={registeruser,loginuser};