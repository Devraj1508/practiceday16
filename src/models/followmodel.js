const mongoose=require("mongoose")


const followSchema=new mongoose.Schema({
    follower:{
        type:String,
        required:[true,"follower id is required"]
    },
    followee:{
        type:String,
        required:[true,"followee id is required"],
    }
},{
    timestamps:true
}
)
const followmodel= mongoose.model("follow",followSchema);

module.exports=followmodel;