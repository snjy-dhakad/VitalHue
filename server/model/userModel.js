const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        enum: ['donar', 'organization', 'admin', 'hospital']
    },
    name: {
        type: String,
        required: function () {
            if (this.userType == 'admin' || this.userType == 'donor')
                return true;
            else
                return false;
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            if (this.userType == 'hospital')
                return true;
            else
                return false;
        }
    },
    organizationName: {
        type: String,
        required: function () {
            if (this.userType == 'organization')
                return true;
            else
                return false;
        }
    },
    website: {
        type: String,
        required: function () {
            if (this.userType == 'hospital' || this.userType == 'organization')
                return true;
            else
                return false;
        }
    },
    owner: {
        type: String,
        required: function () {
            if (this.userType == 'hospital' || this.userType == 'organization')
                return true;
            else
                return false;
        }
    },
    address: {
        type: String,
        required: function () {
            if (this.userType == 'hospital' || this.userType == 'organization')
                return true;
            else
                return false;
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);