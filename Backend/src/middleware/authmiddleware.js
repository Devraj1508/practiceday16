const jwt=require("jsonwebtoken");
async function findinguser(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
    }catch(err){
         console.log("JWT ERROR:", err.message);
        return res.status(401).json({message:"Invalid token"});
    }
    req.user=decoded;
    next();
}

module.exports={findinguser};