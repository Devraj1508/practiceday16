const express=require("express");
const likeRouter=express.Router();
const controller=require("../controllers/likecontroller");
const {findinguser}=require("../middleware/authmiddleware");

likeRouter.post("/:postid",findinguser,controller.likecontroller)
likeRouter.delete("/unlike/:postid",findinguser,controller.unlikecontroller)

module.exports=likeRouter;