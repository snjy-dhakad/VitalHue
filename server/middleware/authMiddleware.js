const jwt=require('jsonwebtoken');
require('dotenv').config();
module.exports=function(req,res,next){
    try{
        const token=req.header("Authorization").replace("Bearer ","");
        const decryptedData=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=decryptedData.userId;
        next();
    }
    catch(err){
        return res.send({
            success:false,  
            err:"authmiddleware",
            message:err.message
        });
    }
};

