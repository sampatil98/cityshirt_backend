const {Router}=require("express");
const {instance}=require("../config/payment");

const paymentrouter=Router();

paymentrouter.post("/makepayment",async (req,res)=>{
    try {
        const {amount}=req.body;

        const order= await instance.orders.create({
            amount:amount*100 ,
            currency: "INR",
            receipt: "receipt#1",
            partial_payment: false,
        });

        if(order){
            res.status(201).send({
                isError:false,
                message:"payment success",
                payment_data:order
            })
        }else{
            res.status(400).send({
                isError:true,
                message:error.message
            }) 
        }
        
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
});

module.exports={paymentrouter};