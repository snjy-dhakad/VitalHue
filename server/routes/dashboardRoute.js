const router=require("express").Router();

const {bloodGroupData}=require("../controller/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/blood-groups-data",authMiddleware,bloodGroupData);

module.exports=router;