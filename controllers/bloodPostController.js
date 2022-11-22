const express = require("express")
const Post = require("../models/bloodPostModel")

const createPost = async(req, res)=>{
    // let bloodGroup = req.body.bloodGroup
    // let location = req.body.location
    // let hospital = req.body.hospital
    // let indication = req.body.indication
    let user = req.user._id

    let post = new Post({
        bloodGroup : req.body.bloodGroup,
        bag : req.body.bag,
        date : req.body.date,
        bloodGroup : req.body.bloodGroup,
        location : req.body.location,
        hospital : req.body.hospital,
        indication : req.body.indication,
        user: user
    })

    await post.save()
    res.send(post)
}



const findPost = async(req, res)=>{
    let posts = await Post.find().where("status").equals("0").sort({createdAt : -1}).populate("user")
    if(posts.length > 0){
        res.send(posts)
        console.log(posts.length)
    }else{
        res.send("No post found")
    }
}


const deletePost = async(req, res)=>{
    let postId = req.body.id
    let userId = req.user._id
    let post = await Post.findById(postId).populate("user")
    let postUserId = post.user._id;
    if(userId == postUserId){
        post.status = "1"
        try{
            post.save()
            res.send("Post Removed")
        }
        catch(err){
            res.send(err)
        }
    }else{
        res.send("You cannot delete others post")
    }
    res.send(post)
}



module.exports = {createPost, findPost, deletePost}