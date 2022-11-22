const express = require("express");
const authorize = require("../middlewares/authorize");

const router = express.Router();
const { greet, registration, login, updateProfile, verifyOtp, doctorList, searchDonor } = require('../controllers/userController')

router.get('/', greet)
router.post('/create', registration)
router.post('/login', login)
router.put('/verify', verifyOtp)
router.put('/update', authorize, updateProfile)
router.get('/doctors', authorize, doctorList)
router.get('/searchBlood', authorize, searchDonor)





module.exports = router