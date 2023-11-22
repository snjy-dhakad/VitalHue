const Inventory = require("../model/inventoryModel");
const mongoose = require('mongoose');
// get all blood group total in, total out, available data from inventory

exports.bloodGroupData = async (req, res) => {
    try {

        const allBloodGroup = ["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"];
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const bloodGroupData = [];

       await Promise.all(
            allBloodGroup.map(async (bloodGroup) => {
                const totalIn = await Inventory.aggregate([
                    {
                        $match: {
                            bloodGroup: bloodGroup,
                            inventoryType: "in",
                            organization
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: {
                                $sum: "$quantity"
                            }
                        }
                    }
                ]);
                const totalOut = await Inventory.aggregate([
                    {
                        $match: {
                            bloodGroup: bloodGroup,
                            inventoryType: "out",
                            organization
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: {
                                $sum: "$quantity"
                            }
                        }
                    }
                ]);
                const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
                bloodGroupData.push({
                    bloodGroup,
                    totalIn:totalIn[0]?.total||0,
                    totalOut:totalOut[0]?.total||0,
                    available
                });
            })
        );



        res.send({
            success: true,
            message: "Blood Group Data",
            data: bloodGroupData
        });
    }
    catch (err) {
        return res.send({
            success: false,
            message: err.message,
            err: "bloodGroupData contoller failed"
        });

    }
};