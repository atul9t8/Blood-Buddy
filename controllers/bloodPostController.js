const express = require("express")
const Post = require("../models/bloodPostModel")

const createPost = async(req, res)=>{
    let details = req.body.details
    let user = req.user._id

    let post = new Post({
        details : details,
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