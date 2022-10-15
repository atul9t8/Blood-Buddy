const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
    mobile : {
        type : String,
        require: true
    },
    otp : {
        type: String,
        require: true
    },
    createdAt:{ type: Date, default: Date.now, index:{expires: 120}}
})

let otp = mongoose.model("otp", otpSchema);
module.exports = otp;