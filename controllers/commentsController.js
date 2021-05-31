
const Post = require('../models/post');


const createError = require('http-errors');


const mongoose = require('mongoose');


exports.create = (req, res, next) => {
    let data = {
        _id: mongoose.Types.ObjectId(),
        content: req.body.content,
        author: req.user.id
    };
    Post.findById(req.params.postId)
        .then(post => {
            if (!post) throw createError(404);
            post.comments.push(data);
            return post.save();
        })
        .then(post => {
            let comment = post.comments.id(data._id);
            res.json(comment);
        })
        .catch(next);
};