console.log("🔥 FOLLOW CONTROLLER FILE LOADED");
const followmodel=require("../models/followmodel")
const usermodel=require("../models/usermodel")


async function followcontroller(req,res){


     const followerusername=req.user.username;
     const followeeusername=req.params.username;

    //  const follower=await usermodel.findById(followerid)

    //  if(!follower){
    //     return res.status(401).json({
    //         message:"follower not exist"
    //     })
    //  }
    //    const followerusername=follower.username;
    if(followerusername===followeeusername){
        return res.status(400).json({
            message:"you cannot follow yourself"
        })
    }
     const follow=await followmodel.create({
        follower:followerusername,
        followee:followeeusername
     })
     res.status(200).json({message:"followed successfully",follow})
    }
module.exports=followcontroller