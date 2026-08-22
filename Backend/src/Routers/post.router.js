const express=require("express");
const postRouter=express.Router();
const controller=require("../controllers/postcontroller");
const multer=require("multer");
const upload=multer({storage:multer.memoryStorage()});
const middleware=require("../middleware/authmiddleware");


postRouter.post("/createpost",middleware.findinguser,upload.single("image_url"),controller.createpost);
postRouter.get("/getallposts",middleware.findinguser,controller.getallposts);
postRouter.get("/getmyposts/:id",middleware.findinguser,controller.getmyposts);

module.exports=postRouter;

