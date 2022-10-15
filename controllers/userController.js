// const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/userModel");
const Otp = require("../models/otpModel");
const bcrypt = require("bcrypt");

const registration = async (req, res)=>{
    let mobile = req.body.mobile;
    let exist = await User.find({mobile:mobile})
    if (exist.length > 0) {
        res.send("An account with this mobile aready exists")
    }
    else{
        let randomNum = Math.floor(Math.random() * 1000000);
        console.log(randomNum);

        let password = req.body.password;
        let cPassword = req.body.cPassword;

        if(password === cPassword){
            bcrypt.hash(password, 10, (err, hash)=>{
                password = hash;
                let user = new User({
                    mobile : mobile,
                    password : password
                })
                    try {
                        user.save()
                        const token = user.generateJWT()
                        bcrypt.hash(randomNum, 10, (err, hash)=>{
                            let otp = hash;
                            console.log(hash)
                            let otpObj = new Otp({
                                mobile : mobile,
                                otp : "89898"
                            })
                            otpObj.save()
                            console.log('otp saved')
                        })
                        res.send(token)
                    } catch (error) {
                        res.send(error)
                    }
                
            });
        }else{
            res.send("Password and Confirm Password doesn't match!")
        }
    }
}
const checkOtp = async(req, res)=>{

}


const login = async (req,res)=>{
    email = req.body.mobile;
    password = req.body.password;

    const user = await User.findOne({mobile:mobile})
    if(user !== null){
        const checkPass = await bcrypt.compare(password, user.password)
        if(checkPass == true){
            const token = user.generateJWT()
            console.log(token)
        }else{
            res.send("Invalid email or password")
        }
    }else{
        res.send("Invalid email or password")
    }
}

module.exports = { registration, login }