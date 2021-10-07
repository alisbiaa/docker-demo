const Post = require("../models/postModel");

exports.getAllPosts = async (req,res,next) => {
    try{
        const posts = await Post.find();
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts
            }
        })
    }catch (e){
        res.status(400).json({
            status: "fail"
        })
    }
};

exports.getOnePost = async (req,res,next) => {
    try{
        const {id} = req.params
        const post = await Post.findById(id);
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    }catch (e){
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.createPost = async (req,res,next) => {
    try{
        const post = await Post.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    }catch (e){
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.updatePost = async (req,res,next) => {
    try{
        const {id} = req.params;
        const post = await Post.findByIdAndUpdate(id,req.body, {
            new : true,
            runValidators:true
        });
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    }catch (e){
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.deletePost = async (req,res,next) => {
    try{
        const {id} = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json({
            status: "success"
        })
    }catch (e){
        res.status(400).json({
            status: "fail"
        })
    }
}

