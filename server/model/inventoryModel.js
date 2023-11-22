const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: true,
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        require: true,
        enum: ["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"]
    },
    quantity: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "true"
    },
    //if inventory id out then hospital will wil;l be set
    //if inventory is "in" then donar will be set
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
            return this.inventoryType === 'out'
        }
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
            return this.inventoryType === "in"
        }
    },
},
    {
        timestamps: true,
    }
);
module.exports=mongoose.model("inventories",inventorySchema);