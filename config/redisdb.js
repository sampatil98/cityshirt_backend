const {createClient}=require("redis");
require("dotenv").config();

    const redisClient = createClient({
        password: process.env.redispass,
        socket: {
            host: 'redis-11574.c305.ap-south-1-1.ec2.cloud.redislabs.com',
            port: 11574
        }
    });

module.exports={redisClient}