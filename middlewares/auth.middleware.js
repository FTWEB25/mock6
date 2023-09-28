const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1]
    if(token){
        var decoded = jwt.verify(token, 'shhhhh');
        if(decoded){
            req.userName=decoded.userName
            req.userId=decoded.userId
            next()
        }else{
            res.status(200).json({msg:"Not authorised"})
        }
    }else{
        res.status(200).json({msg:"Plese Login First"})
    }
}


module.exports=auth