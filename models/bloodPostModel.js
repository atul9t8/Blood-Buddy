const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = new Schema({
    bloodGroup:{
        type: String,
        required: true
    },
    bag:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    hospital:{
        type: String,
        required: true
    },
    indication:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "0"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


const post = mongoose.model("Post", postSchema)
module.exports = post;