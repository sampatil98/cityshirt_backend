const {Router}=require("express");
const {CartModel}=require("../model/cart.model");

const cartRouter=Router();


cartRouter.post("/add",async(req,res)=>{
    
   try{
    const {id,userId}=req.body;
    const ispresent=await CartModel.findOne({id,userId});
    
    if(ispresent){
     return res.status(400).send({
            isError:true,
            message:"Already present"
        });
    }

    
    const cartdata= new CartModel(req.body);
    
    await cartdata.save();
    res.status(200).send({
        isError:false,
        message:"Added to Cart"
    });

   }catch(err){
    res.status(400).send({
        isError:true,
        error:err.message
    });
   }
});

cartRouter.get("/",async(req,res)=>{
    const {userId}=req.body;
    console.log(userId);
    try{
        let data= await CartModel.find({userId});
        res.status(200).send({"data":data});

    }catch(err){
        res.status(400).send({"err":err.msg});
    }
});

cartRouter.delete("/:id",async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    try{
        let data= await CartModel.findByIdAndDelete(id);
        res.status(200).send({
            isError:false,
            message:" deleted successfully"
        });

    }catch(err){
        res.status(400).send({
            isError:true,
            message:err.msg
        });
    }

})

module.exports={cartRouter};