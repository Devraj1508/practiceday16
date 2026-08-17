const express=require("express");
const authRouter=express.Router();
const controller=require("../controllers/usercontroller");

//Register user
authRouter.post("/register",controller.registeruser);
//Login user
authRouter.post("/login",controller.loginuser);

module.exports=authRouter;