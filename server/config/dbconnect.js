const mongoose=require('mongoose');
require('dotenv').config();
const dbconnect=()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("DB Connection Successfully Established"))
    .catch((err)=>{
        console.log("DB connection Failure");
        console.error(err);
    })
}
module.exports=dbconnect;