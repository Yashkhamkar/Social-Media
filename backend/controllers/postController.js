const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
  const newPost = await Post.create({ ...req.body, owner: req.user._id });
  const user = await User.findById(req.user._id);
  user.posts.push(newPost._id);
  await user.save();
  const other = newPost._doc;
  res.status(201).json({ other });
};
const likeunlike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const liked = post.likes.some((like) => like.equals(req.user._id));

    if (liked) {
      post.likes.pull(req.user._id);
      await post.save();
      return res.status(200).json({ message: "Post unliked" });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      return res.status(200).json({ message: "Post liked" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    await post.deleteOne();
    const user = await User.findById(req.user._id);
    user.posts.pull(req.params.id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getPostsOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({ owner: { $in: user.following } });
    res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    let commentIndex = -1;
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = index;
      }
    });
    console.log(post.comments);
    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
      await post.save();
      return res.status(200).json({ message: "Comment updated" });
    } else {
      await post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      await post.save();
      return res.status(200).json({ message: "Comment added" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.owner.toString() === req.user._id.toString()) {
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.userId.toString()) {
          post.comments.pull(item._id);
        }
      });
      await post.save();
      return res.status(200).json({ message: "Selected comment deleted" });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          post.comments.pull(item._id);
        }
      });
      await post.save();
      return res.status(200).json({ message: "Your comment deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createPost,
  likeunlike,
  deletePost,
  getPostsOfFollowing,
  addComment,
};
