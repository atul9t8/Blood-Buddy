const express = require("express");
const axios = require('axios');
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const Otp = require("../models/otpModel");
const Post = require("../models/bloodPostModel");




const greet = async(req, res)=>{
    res.send("Welcome Home")
}


const registration = async (req, res)=>{
    let fullName = req.body.name;
    let mobile = req.body.mobile;
    let exist = await User.find({mobile:mobile})
    if (exist.length > 0) {
        // if(exist[0].verified == 0){
        //     let randomNum = Math.floor(Math.random() * 1000000);
        //     let otpObj = new Otp({
        //         mobile : mobile,
        //         otp : randomNum
        //     })
        //     try {
        //         const greenwebsms = new URLSearchParams();
        //         greenwebsms.append('token', process.env.SMSTOKEN);
        //         greenwebsms.append('to', mobile);
        //         greenwebsms.append('message', `Your BloodBuddy OTP is ${randomNum}. Expires in 2 minute. `);
        //         axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {
        //             res.send("OTP send to your mobile number.");
        //         });
        //         otpObj.save()
        //     } catch (error) {
        //         res.send(error)
        //     }
        // } else{
            res.send("An account with this mobile aready exists")
        // }
    }
    else{
        let randomNumReference = Math.floor(Math.random() * 100);

        let splitName = fullName.split(' ')[0];
        let referenceCode = splitName.concat(randomNumReference);

        let password = req.body.password;
        let cPassword = req.body.cPassword;
        if(password === cPassword){
            bcrypt.hash(password, 10, (err, hash)=>{
                password = hash;
                if(req.body.role){
                    if(req.body.role == "doctor"){
                        let user = new User({
                            fullName: fullName,
                            mobile : mobile,
                            password : password,
                            role: "doctor",
                            specializedIn: req.body.specializedIn,
                            doctorLocation : req.body.doctorLocation,
                            doctorDistrict : req.body.doctorDistrict,
                            referenceCode: referenceCode
                        })
                        // let randomNum = Math.floor(Math.random() * 1000000);
        
                        // let otpObj = new Otp({
                        //     mobile : mobile,
                        //     otp : randomNum
                        // })
                        try {
                            // const greenwebsms = new URLSearchParams();
                            // greenwebsms.append('token', process.env.SMSTOKEN);
                            // greenwebsms.append('to', mobile);
                            // greenwebsms.append('message', `Your BloodBuddy OTP is ${randomNum}. Expires in 2 minute. `);
                            // axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {
                            //     console.log(response.data);
                            // });
                            // otpObj.save()
        
                            user.save()
                            const token = user.generateJWT()
                            // console.log('otp saved')
                            res.send(token)
                        } catch (error) {
                            res.send(error)
                        }
                    }
                }else{
                    let user = new User({
                        fullName: fullName,
                        mobile : mobile,
                        password : password,
                        referenceCode: referenceCode
                    })
                    // let randomNum = Math.floor(Math.random() * 1000000);
    
                    // let otpObj = new Otp({
                    //     mobile : mobile,
                    //     otp : randomNum
                    // })
                    try {
                        // const greenwebsms = new URLSearchParams();
                        // greenwebsms.append('token', process.env.SMSTOKEN);
                        // greenwebsms.append('to', mobile);
                        // greenwebsms.append('message', `Your BloodBuddy OTP is ${randomNum}. Expires in 2 minute. `);
                        // axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {
                        //     console.log(response.data);
                        // });
                        // otpObj.save()
    
                        user.save()
                        const token = user.generateJWT()
                        // console.log('otp saved')
                        res.send(token)
                    } catch (error) {
                        res.send(error)
                    }
                }
            });
        }else{
            res.send("Password and Confirm Password doesn't match!")
        }
    }
}



const verifyOtp = async(req, res)=>{
    let mobile = req.body.mobile;
    let otp = req.body.otp;
    let exist = await Otp.find({mobile:mobile})
    if(exist.length > 0){
        if(exist[exist.length - 1].otp == otp){
        let user = await User.findOne({mobile:mobile})
        user.verified = "1"
        try{
            user.save()
            res.send("Mobile number verified")
        }catch(err){
            res.send(err)
        }
        }else{
            res.send("Invalid OTP!")
        }
    }else{
        res.send("Your OTP is expired. Please try again!")
    }
}



const login = async (req,res)=>{
    mobile = req.body.mobile;
    password = req.body.password;
    const user = await User.findOne({mobile:mobile})
    if(user !== null){
        // if(user.verified == 0){
        //     let randomNum = Math.floor(Math.random() * 1000000);
        //     let otpObj = new Otp({
        //         mobile : mobile,
        //         otp : randomNum
        //     })
        //     try {
        //         const greenwebsms = new URLSearchParams();
        //         greenwebsms.append('token', process.env.SMSTOKEN);
        //         greenwebsms.append('to', mobile);
        //         greenwebsms.append('message', `Your BloodBuddy OTP is ${randomNum}. Expires in 2 minute. `);
        //         axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {
        //         console.log("OTP send to your mobile number.");
        //         });
        //         otpObj.save()
        //         res.send("OTP send to your mobile number. Please verify to login.")
        //     } catch (error) {
        //         res.send(error)
        //     }
        // }else{
            const checkPass = await bcrypt.compare(password, user.password)
            if(checkPass == true){
                const token = user.generateJWT()
                res.send(token)
            }else{
                res.send("Invalid email or password")
            }
        // }
    }else{
        res.send("Invalid email or password")
    }
}



const updateProfile = async (req, res)=>{
    let id = req.user._id
    const user = await User.findOne({_id:id})
    user.bloodGroup = req.body.bloodGroup
    user.workPlace = req.body.workPlace
    user.educationInstitution = req.body.educationInstitution
    user.gender = req.body.gender
    user.location = req.body.location
    user.weight = req.body.weight
    
    try {
        user.save()
        res.send(user)
    } catch (error) {
        res.send(error)
    }               
}


const doctorList = async(req, res)=>{
    let doctors = await User.find({role: "doctor"});
    res.send(doctors)
}


const searchDonor = async(req, res)=>{
    let bloodGroup = req.body.bloodGroup
    let searchedBloodDonorList = await User.find({bloodGroup: bloodGroup});
    res.send(searchedBloodDonorList)
}


module.exports = { greet, registration, updateProfile, login, verifyOtp, doctorList, searchDonor }