const { default: mongoose } = require("mongoose");
const Inventory = require("../model/inventoryModel");
const User = require("../model/userModel");

exports.addInventory = async (req, res) => {
    try {

        //valiadate email
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            throw new Error("Invalid Email");
        if (req.body.inventoryType === 'in' && user.userType !== "donar") {
            throw new Error("This email is not registed as Donar");
        }
        if (req.body.inventoryType === 'out' && user.userType !== "hospital")
            throw new Error("This email is not registered as a Hospital");
        //check if inventory is available 
        if (req.body.inventoryType === "out") {
            const requestedGroup = req.body.bloodGroup;
            const requestedQuantity = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.body.userId);

            const totalInOfRequestedGroup = await Inventory.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "in",
                        bloodGroup: requestedGroup
                    }
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: {
                            $sum: "$quantity"
                        }
                    }
                }
            ]);

            const totalIn = totalInOfRequestedGroup[0]?.total || 0;
            const totalOutOfRequestedGroup = await Inventory.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: "out",
                        bloodGroup: requestedGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: {
                            $sum: "$quantity"
                        }
                    }
                }
            ]);
            console.log(totalOutOfRequestedGroup);
            const totalOut = totalOutOfRequestedGroup[0]?.total || 0;
            const availableQuantityOfRequestedGroup = totalIn - totalOut;
            if (availableQuantityOfRequestedGroup < requestedQuantity)
            throw new Error(`only ${availableQuantityOfRequestedGroup} units of ${requestedGroup.toUpperCase()} is available`);

            req.body.hospital = user._id;
        } else {
            req.body.donar = user._id;
        }

        //add inventory
        const inventory = new Inventory(req.body);
        await inventory.save();
        return res.send({
            success: true,
            message: "Inventory added Successfully"
        });
    }
    catch (err) {
        return res.send({
            data: req.body,
            success: false,
            message: err.message,
            problem: "addInventory fail"
        });
    }
};

exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find({ organization: req.body.userId }).sort({createdAt:-1}).populate("donar").populate("hospital");
        return res.send({
            success: true,
            data: inventory
        });
    }
    catch (err) {
        return res.send({
            success: false,
            message: err.message,
            problem: "problem in getInventory"
        })
    }
};



exports.getInventoryWithFilters = async (req, res) => {
    try {
       
        delete req.body.userId;//if fails then remove this statement and pass req.find.filters in find function
        console.log(req.body);
        const inventory = await Inventory.find(req.body.filters).limit(req.body.limit||10).sort({createdAt:-1}).populate("donar").populate("hospital").populate("organization");
        return res.send({
            success: true,
            data: inventory
        });
    }
    catch (err) {
        return res.send({
            success: false,
            message: err.message,
            problem: "problem in getInventory"
        })
    }
};

