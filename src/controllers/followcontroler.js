console.log("🔥 FOLLOW CONTROLLER FILE LOADED");
const followmodel=require("../models/followmodel")
const usermodel=require("../models/usermodel")


async function followcontroller(req,res){


     const followerusername=req.user.username;
     const followeeusername=req.params.username;

    if(followerusername===followeeusername){
        return res.status(400).json({
            message:"you cannot follow yourself"
        })
    }
    const isAlreadyfollow=await followmodel.findOne({
        follower:followerusername,
        followee:followeeusername
    })
    if(isAlreadyfollow){
        return res.status(400).json({
            message:"you are already following this user"
        })
    }
    const isUserExist=await usermodel.findOne({
        username:followeeusername
    })
    if(!isUserExist){
        return res.status(404).json({
            message:"user not found"
        })
    }
     const follow=await followmodel.create({
        follower:followerusername,
        followee:followeeusername
     })
     res.status(200).json({message:"followed successfully",follow})
    }

//unfollow controller
async function unfollowcontroller(req,res){
    const followerusername=req.user.username;
    const followeeusername=req.params.username;

    const follow=await followmodel.findOneAndDelete({
        follower:followerusername,
        followee:followeeusername
    })
    if(!follow){
        return res.status(404).json({
            message:"you are not following this user"
        })
    }
    res.status(200).json({message:"unfollowed successfully",follow})
}
module.exports={followcontroller,unfollowcontroller}
