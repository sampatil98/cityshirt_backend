const {Router}=require("express");
const bcrypt=require("bcrypt");
const {UserModel}=require("../model/user.model");
const jwt=require("jsonwebtoken");

const userRoute=Router();

userRoute.post("/register",async(req,res)=>{
    const {password,email}=req.body;
    try{
        const user= await UserModel.findOne({email});
        if(user){
            res.status(400).send({"msg":"User already exist please login"});
        }else{

        
        bcrypt.hash(password,10,async(err,hash)=>{
            if(hash){
                let newuser= new UserModel({...req.body,password:hash})
                await newuser.save();
                res.status(200).send({"msg":"User Added"});
            }else{
                res.status(400).send({"msg":err.message});
            }
        })

        }
    }catch(err){
        res.status(400).send({"msg":err.message});
    }
});

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token= jwt.sign({userId:user["_id"],username:user.firstname+" "+user.lastname},"sambhaji");
                    res.status(200).send({"msg":"login successful","token":token,"user":user.firstname});
                    
                } else {
                    res.status(200).send({"msg":"wrong Password"});
                }
            });
        }else{
            res.status(200).send({"msg":"User not found please register first"})
        }

    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={userRoute};