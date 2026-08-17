const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is already taken"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already taken"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    bio:{
        type: String,
        default: ""
    },
    profilePicture:{
        type: String,
        default: ""
    }

});
const userModel=mongoose.model("User", userSchema);
module.exports=userModel;