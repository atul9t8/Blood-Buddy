const express = require("express");
const mongoose = require("mongoose")
const app = express();
app.use(express.json())
const userRoute = require("./routers/userRouter")

require('dotenv').config()
mongoose.connect(process.env.DB)

app.use('/', userRoute)


port = process.env.PORT || 8088

app.listen(port, ()=> console.log("Listening")) 