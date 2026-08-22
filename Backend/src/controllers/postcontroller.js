const postmodel=require("../models/postmodel");
const Imagekit=require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});
async function createpost(req,res){

    
    const userId=req.user.id;

    const file = await client.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'result',
  folder:'day16-insta-clone-images'
}); 

    const newpost=await postmodel.create({
        caption:req.body.caption,
        image_url:file.url,
        user:userId
    });
    
    res.status(201).json({message:"Post created",post:newpost});
}

async function getallposts(req,res){
    const userId=req.user.id;


    const post=await postmodel.find({user:userId});
    // if(!post){
    //     return res.status(404).json({message:"No posts found"});
    // }
    
    
    res.status(200).json({message:"Posts found",post:post});
}

async function getmyposts(req,res){
    const postid=req.params.id;
    const userId=req.user.id;
     console.log("POST ID:",postid);
    console.log("USER ID:",userId);

    const post=await postmodel.findById(postid);
    if(!post){
        return res.status(404).json({message:"Post not found"});
    }
    const isvaliduser=post.user.toString()===userId.toString();
    if(!isvaliduser){
        return res.status(401).json({message:"Unauthorized"});
    }
    res.status(200).json({message:"Post found",post:post});
}

module.exports={createpost,getallposts,getmyposts};
