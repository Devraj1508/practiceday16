const express=require("express")
const {findinguser}=require("../middleware/authmiddleware")
const controller=require("../controllers/followcontroler")

console.log("🔥 ROUTER LOADED");
console.log("findinguser:", typeof findinguser);
console.log("controller:", typeof controller);


const followRouter=express.Router();




followRouter.post("/follow/:username",findinguser,controller);


module.exports=followRouter;