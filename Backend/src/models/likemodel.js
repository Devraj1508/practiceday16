const mongoose=require("mongoose");

//Like Schema
const likeSchema=new mongoose.Schema({
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"post id is required"]
    },
    username:{
        type:String,
        required:[true,"username is required"]
    }
},{
    timestamps:true
})
likeSchema.index({postid:1,username:1},{unique:true})

const likemodel=mongoose.model("like",likeSchema);
module.exports=likemodel;