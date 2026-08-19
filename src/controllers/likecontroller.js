const likemodel=require("../models/likemodel");


async function likecontroller(req,res){
    const postid=req.params.postid;
    const username=req.user.username;

    const isAlreadyLiked=await likemodel.findOne({
        postid:postid,
        username:username
    })
    if(isAlreadyLiked){
        return res.status(400).json({
            message:"you have already liked this post"
        })
    }
    const like=await likemodel.create({
        postid:postid,
        username:username
    })
    res.status(200).json({message:"post liked successfully",like})
}
module.exports={likecontroller}

