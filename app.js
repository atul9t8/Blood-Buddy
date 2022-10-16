const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();
app.use(express.json())
const userRoute = require("./routers/userRouter")

app.use(cors())
require('dotenv').config()
mongoose.connect(process.env.DB)

app.use('/', userRoute)


port = process.env.PORT || 8088

app.listen(port, ()=> console.log("Listening")) 