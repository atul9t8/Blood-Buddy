const express = require("express");
const router = express.Router();
const { registration, login, verifyOtp } = require('../controllers/userController')


router.post('/create', registration)
router.post('/login', login)
router.put('/verify', verifyOtp)




module.exports = router