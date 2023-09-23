const express=require("express");
const cors=require("cors");
require("dotenv").config();


const connection=require("./config/db");
const {redisClient}=require("./config/redisdb");
const {userRoute}=require("./Routes/user.route");
const {productRouter}=require("./Routes/product.route");
const {cartRouter}=require("./Routes/cart.route");
const {authentication}=require("./middleware/auth.middleware");
const {paymentrouter}=require("./Routes/payment.route");

const app=express();

app.use(express.json());
app.use(cors());


app.use("/user",userRoute);
app.use("/product",productRouter);


app.use(authentication);
app.use("/cart",cartRouter);
app.use("/payment",paymentrouter);

app.listen(process.env.port,async ()=>{
    try{
        await connection;
        console.log("connected to DB");
        await redisClient.connect();
        console.log("connected to Redis database");
        console.log(`server is running at port ${process.env.port}`);
    }catch(err){
        console.log(err);
    }
})