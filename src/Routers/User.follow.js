const express=require("express")
const {findinguser}=require("../middleware/authmiddleware")
const controller=require("../controllers/followcontroler")



const followRouter=express.Router();




followRouter.post("/follow/:username",findinguser,controller.followcontroller);
followRouter.delete("/unfollow/:username",findinguser,controller.unfollowcontroller);
followRouter.get("/followers",findinguser,controller.getfolloweraccepted);
followRouter.get("/pending-followers",findinguser,controller.getfollowerpending);
followRouter.get("/rejected-followers",findinguser,controller.getfollowerrejected);
followRouter.put("/update-follow-status/:username",findinguser,controller.updatefollowstatuscontroller);
module.exports=followRouter;