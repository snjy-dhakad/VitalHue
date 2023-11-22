const express=require("express");
const userRoutes=require("./routes/userRoutes")
const inventoryRoutes=require("./routes/inventoryRoutes");
const dashboardRoutes=require("./routes/dashboardRoute");
const app=express();
app.use(express.json());
const dbconnect=require("./config/dbconnect");
require("dotenv").config();
app.use('/api/user',userRoutes);
app.use('/api/inventory',inventoryRoutes);
app.use('/api/dashboard',dashboardRoutes);
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server running at: ${PORT}`);
})
dbconnect();
 