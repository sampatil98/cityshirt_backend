const {Router}=require("express");
const bcrypt=require("bcrypt");
const {UserModel}=require("../model/user.model");
const jwt=require("jsonwebtoken");
const {addtoblacklist}=require("../middleware/blacklisttoken");
const {redisClient}=require("../config/redisdb");
require("dotenv").config();

const userRoute=Router();

userRoute.post("/register",async(req,res)=>{
    const {password,email}=req.body;
    try{
        const user= await UserModel.findOne({email});

        if(user){
          return  res.status(400).send({
            isError:true,
            message:"User already exist please login"});
        }

        bcrypt.hash(password,10,async(err,hash)=>{
            if(hash){
                let newuser= new UserModel({...req.body,password:hash})
                await newuser.save();
                res.status(200).send({
                    isError:false,
                    message:"Account Created Successfully"});
            }else{
                res.status(500).send({
                    isError:true,
                    message:"internal server error.."
                });
            }
        })

        
    }catch(err){
        res.status(400).send({
            isError:true,
            message:err.message
        });
    }
});

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{

                if(result){

                    const token= jwt.sign({userId:user["_id"],username:user.firstname+" "+user.lastname},process.env.secret_token_key);
                    
                    res.status(200).send({
                        isError:false,
                        message:"login successful",
                        token:token,
                        user:user
                    });
                    
                } else {
                    res.status(200).send({
                        isError:true,
                        message:"wrong Password"
                    });
                }
            });
        }else{
            res.status(400).send({
                isError:true,
                message:"User not found please register first"
            });
        }

    }catch(err){
        res.status(400).send({
            isError:true,
            message:err.message
        });
    }
});

userRoute.get("/logout",async(req,res)=>{
    try {
        const token=req.headers.split(" ")[1];

        await addtoblacklist(token);

        res.status(200).send({
            isError:false,
            message:"User Logged Out Successfully"
        });

    } catch (error) {

        res.status(400).send({
           isError:true,
           message:error
        })
    }
});


module.exports={userRoute};