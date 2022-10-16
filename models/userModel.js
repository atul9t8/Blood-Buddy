const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    mobile:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cPassword:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: "user"

    },
    verified:{
        type: String,
        required: true,
        default: "0"
    }
}, {timestamps:true})

registrationSchema.methods.generateJWT = function(){
    const token = jwt.sign({_id: this._id, mobile: this.mobile, role: this.role}, process.env.KEY)
    return token;
}

const user = mongoose.model("User", registrationSchema)
module.exports = user;