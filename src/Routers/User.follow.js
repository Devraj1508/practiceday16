const express=require("express")
const {findinguser}=require("../middleware/authmiddleware")
const controller=require("../controllers/followcontroler")



const followRouter=express.Router();




followRouter.post("/follow/:username",findinguser,controller.followcontroller);
followRouter.delete("/unfollow/:username",findinguser,controller.unfollowcontroller);

module.exports=followRouter;