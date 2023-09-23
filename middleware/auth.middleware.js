const jwt=require("jsonwebtoken");
const {redisClient}=require("../config/redisdb");
require("dotenv").config();

const authentication= async (req,res,next)=>{
    
    let token = req.headers.authorization;
    
    if(token){
        try{
            token=token.split(" ")[1];

            // first check if tocken is blacklisted or not 

            const isblacklisted= await redisClient.get(token);
            if(isblacklisted){
                return res.status(400).send({
                    isError:true,
                    message:"token Expired please login..!"
                })
            }

            // verifying token
            let decode= jwt.verify(token,process.env.secret_token_key);
            
            if(decode){

                // attaching userid to req.body
                req.body.userId=decode.userId;
                next();
            }else{
                res.status(200).send({
                    isError:true,
                    err:"Please login first 1"
                });
            }
        }catch(err){
            res.status(400).send({
                isError:true,
                err:err.message});
        }
    }else{
        res.status(400).send({"err":"Please login first 2"});
    }

}

module.exports={authentication}