const express = require("express");
const authorize = require("../middlewares/authorize");

const router = express.Router();
const { createPost, findPost, deletePost} = require('../controllers/bloodPostController');

router.post('/create', authorize, createPost)
router.post('/delete', authorize, deletePost)
router.get('/', findPost)




module.exports = router