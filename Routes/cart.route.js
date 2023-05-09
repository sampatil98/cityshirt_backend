const {Router}=require("express");
const {CartModel}=require("../model/cart.model");

const cartRouter=Router();


cartRouter.post("/add",async(req,res)=>{
    // console.log(req.body);
   try{
    const cartdata= new CartModel(req.body);
    // console.log(cartdata);
    await cartdata.save();
    res.status(200).send({"msg":"Added to Cart"});

   }catch(err){
    res.status(400).send({"err":err.message});
   }
});

cartRouter.get("/",async(req,res)=>{
    const {userId}=req.body;
    try{
        let data= await CartModel.find({userId});
        res.status(200).send({"data":data});

    }catch(err){
        res.status(400).send({"err":err.msg});
    }
});

cartRouter.delete("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        let data= await CartModel.findByIdAndDelete(id);
        res.status(200).send({"msg":" deleted successfully"});

    }catch(err){
        res.status(400).send({"err":err.msg});
    }

})

module.exports={cartRouter};