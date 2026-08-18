const express=require("express")
const app=express();
const authRouter=require("./Routers/auth.router");
const postRouter=require("./Routers/post.router");
const followRouter=require("./Routers/User.follow");
const cookieParser=require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/api/follow",followRouter);


module.exports=app;
