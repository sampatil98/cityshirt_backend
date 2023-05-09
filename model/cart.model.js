const mongoose=require("mongoose");

const cartSchema = mongoose.Schema({
    "img":{type:String,require:true},
    "catagory":{type:String,require:true},
    "title":{type:String,require:true},
    "price":{type:Number,require:true},
    "color":{type:String,require:true},
    "rating":{type:Number,require:true}, 
    "desc":{type:String,require:true}, 
    "fit":{type:String,require:true},
    "size":{type:Number,require:true},
    "quantity":{type:Number,require:true},
    "userId":{type:String,require:true}
});

const CartModel = mongoose.model("cart_data",cartSchema);


module.exports={CartModel};