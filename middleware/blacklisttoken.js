const {redisClient}=require("../config/redisdb");

const addtoblacklist= async (token)=>{
    // setting in blacklist 
    await redisClient.set(token,true,"EX",2*60, function (err, result) {
        if (err) {
          console.log('Error setting value in Redis Cloud:');
        } else {
          console.log('Value set in Redis Cloud:', result);
        }
      });

};

module.exports={addtoblacklist};

