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
 
async function getfolloweraccepted(req,res){
    const followeeusername=req.user.username;
    const followers=await followmodel.find({
        followee:followeeusername,
        status:"accepted"
    })
    res.status(200).json({message:"followers fetched successfully", followers})
}

async function getfollowerpending(req,res){
    const followeeusername=req.user.username;
    const followers=await followmodel.find({
        followee:followeeusername,
        status:"pending"
    })
    res.status(200).json({message:"pending followers fetched successfully", followers})
}

async function getfollowerrejected(req,res){
    const followeeusername=req.user.username;
    const followers=await followmodel.find({
        followee:followeeusername,
        status:"rejected"
    })
    res.status(200).json({message:"rejected followers fetched successfully", followers})
}

//update follow status controller
async function updatefollowstatuscontroller(req,res){
    const followeeusername=req.user.username;
    const followerusername=req.params.username;
    const status=req.body.status;

    const follow=await followmodel.findOneAndUpdate({
        followee:followeeusername,
        follower:followerusername
    }, {
        status:status
    }, {
        new:true
    })
    res.status(200).json({message:"follow status updated successfully", follow})
}

module.exports={followcontroller,unfollowcontroller,getfolloweraccepted,getfollowerpending,getfollowerrejected,updatefollowstatuscontroller}
