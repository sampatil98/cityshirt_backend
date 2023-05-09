const jwt=require("jsonwebtoken");

const authentication= (req,res,next)=>{
    let token = req.headers.authorization;
    
    if(token){
        try{
            token=token.split(" ")[1];
            let decode= jwt.verify(token,"sambhaji");
            
            if(decode){
                req.body.userId=decode.userId;
                next();
            }else{
                res.status(200).send({"err":"Please login first 1"});
            }
        }catch(err){
            res.status(400).send({"err":err.message});
        }
    }else{
        res.status(400).send({"err":"Please login first 2"});
    }

}

module.exports={authentication}