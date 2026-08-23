const express=require("express")
const app=express();
const authRouter=require("./Routers/auth.router");
const postRouter=require("./Routers/post.router");
const followRouter=require("./Routers/User.follow");
const likeRouter=require("./Routers/User.like");
const cookieParser=require("cookie-parser");
const cors=require("cors");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/api/follow",followRouter);

app.use("/api/like",likeRouter);


module.exports=app;
        