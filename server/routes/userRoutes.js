const express=require('express');
const router=express.Router();

const {register,login,currentUser,getAllUniqueDonars, getAllUniqueHospitals, getAllUniqueOrganizationForDonar, getAllUniqueOrganizationforAHospital}=require("../controller/auth");
const authMiddleware = require('../middleware/authMiddleware');
//authentication and authorization
router.post("/register",register);
router.post("/login",login)
router.get("/get-current-user",authMiddleware,currentUser);
router.get("/get-all-donars",authMiddleware,getAllUniqueDonars);
router.get("/get-all-hospitals",authMiddleware,getAllUniqueHospitals);
router.get("/get-all-organizations-of-a-donar",authMiddleware,getAllUniqueOrganizationForDonar);
router.get("/get-all-organizations-of-a-hospital",authMiddleware,getAllUniqueOrganizationforAHospital);

module.exports=router;