const mongoose=require("mongoose");

const productSchema= mongoose.Schema({
    "img":{type:String,require:true},
    "catagory":{type:String,require:true},
    "title":{type:String,require:true},
    "price":{type:Number,require:true},
    "color":{type:String,require:true},
    "rating":{type:Number,require:true}, 
    "desc":{type:String,require:true}, 
    "fit":{type:String,require:true},
    "size":{type:Number,require:true} 
  
});

const ProductModel= mongoose.model("product",productSchema);

module.exports={ProductModel};