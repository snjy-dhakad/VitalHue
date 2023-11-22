const express=require('express');
const router=express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { addInventory,getInventory, getInventoryWithFilters} = require('../controller/inventoryController');

//adding inventory
router.post("/add",authMiddleware,addInventory);
//getting
router.get("/get",authMiddleware,getInventory);
router.post("/filter",authMiddleware,getInventoryWithFilters);


module.exports=router;