const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const Post = require("../models/post.model");

// Create a new post

exports.createPostController = async (req, res) => {
  try {
    const { text, image } = req.body;
    const userId = req.userId;

    const newPost = new Post({
      text,
      image,
      userId,
    });

    await newPost.save();
    await User.findByIdAndUpdate(userId, {
      $push: { userPost: newPost },
    })

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// Get all posts
exports.getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username name profileImg")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Posts fetched successfully",
      posts,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// following posts

exports.getFollowingPostsController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("following", "posts");
    const followingPosts = await Post.find({ userId: { $in: user.following } })
      .populate("userId", "username name profileImg")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Following posts fetched successfully",
      posts: followingPosts,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// all liked posts
exports.getAllLikedPostsController = async (req, res) => {
  try {
    const userId = req.body;
    const user = await User.findById(userId).populate("likedPost", "posts");
    const likedPosts = await Post.find({ _id: { $in: user.likedPost } })
      .populate("userId", "username profileImg")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Liked posts fetched successfully",
      posts: likedPosts,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// like or unlike a post
exports.likePostController = async (req, res) => {
  try{

    const postId = req.params.id;
    const userId = req.body.userId;

    console.log("PostId=>>>",postId,"UserId=>>>", userId);
    
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.json({
        message: "Post not found",
        success: false,
      });
    }

    if(post.like.includes(userId)){

      await Post.findByIdAndUpdate(postId, {
        $pull: { like: userId },
      })
    await User.findByIdAndUpdate(userId, {
      $pull: { likedPost: postId },
    })
      return res.status(200).json({
        message: "Post unliked successfully",
        success: true,
      });
    } else{
      await Post.findByIdAndUpdate(postId, {
        $push: { like: userId },
      });

      await User.findByIdAndUpdate(userId, {
        $push: { likedPost: postId },
      })

      const notification = await Notification.create({
        from: userId,
        to: post.userId,
        type: "like",
      });
      return res.status(200).json({
        message: "Post liked successfully",
        success: true,
      });
    }
    



  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};


// comment on a post

exports.commentOnPostController = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;

    if (!text) {
      return res.json({
        message: "please type your message",
        success: false,
      });
    }

    const userId = req.userId;
    const user = await User.findById(userId);

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    post.comments.push({
      text,
      UserId: userId,
      name: user.name,
      image: user.profileImg,
      username: user.username,
    });
    await post.save();

    res.status(200).json({
      message: "Comment added successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

//get user posts
exports.getUserPostsController = async (req, res) => {
  try {
    const userId = req.body;
    const posts = await Post.find({ userId })
      .populate("userId", "username profileImg")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "User posts fetched successfully",
      posts,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// delete post
exports.deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    if (post.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this post",
        success: false,
      });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

