const express = require('express');
const { authMiddleware } = require('../config/auth');
const { createPostController, getAllPostsController, getFollowingPostsController, getAllLikedPostsController, commentOnPostController, getUserPostsController, deletePostController, likePostController } = require('../controllers/post.Controller');

const Routes = express.Router();



Routes.post('/create-post', authMiddleware, createPostController);
Routes.get('/all-posts', authMiddleware, getAllPostsController );
Routes.get('/following-posts', authMiddleware, getFollowingPostsController);
Routes.post('/like-post/:id', likePostController )



Routes.get('/getAll-likedPosts',  getAllLikedPostsController );

Routes.post('/comment/:id', authMiddleware, commentOnPostController)
Routes.get('/getUser-Posts',  getUserPostsController)
Routes.delete('/delete-post/:id', authMiddleware,  deletePostController)




module.exports = Routes;