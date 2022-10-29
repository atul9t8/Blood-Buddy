const express = require("express");
const authorize = require("../middlewares/authorize");

const router = express.Router();
const { greet, registration, login, updateProfile, verifyOtp } = require('../controllers/userController')

router.get('/', greet)
router.post('/create', registration)
router.post('/login', login)
router.put('/verify', verifyOtp)
router.put('/update', authorize, updateProfile)




module.exports = router