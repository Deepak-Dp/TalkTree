const express = require('express')
const { userRegisterController, userLoginController, userLogoutController,
     getUserDataController,suggestedUsersController, followUserController, 
     updateUserDataController,
     getOtherUserDataController,
     getAllUser,
     searchUsercontroller,
     
     } = require('../controllers/user.controller');
const { authMiddleware } = require('../config/auth');
const uploadImageController = require('../controllers/uploadImage.controller');
const { likePostController } = require('../controllers/post.Controller');



const Routes = express.Router()

Routes.post('/register', userRegisterController);
Routes.post('/login', userLoginController);
Routes.get("/logout",authMiddleware,userLogoutController) 
Routes.get('/Profile', authMiddleware, getUserDataController)
Routes.get('/suggested-users', authMiddleware,suggestedUsersController)
Routes.post('/follow', authMiddleware, followUserController)

Routes.post('/image-upload', uploadImageController)

Routes.get('/getAllUser', authMiddleware, getAllUser)

Routes.get('/otherUser/:id', getOtherUserDataController)



Routes.put("/updateUser", authMiddleware, updateUserDataController)

 Routes.post("/like-post/:id", authMiddleware, likePostController)

Routes.get('/check-auth', authMiddleware, (req, res)=>{
    const user = req.userId;

    console.log(user);
    return res.json({
        success: true,
        message: "User authenticated",
        user
    })
    
})


Routes.get('/search', searchUsercontroller)


module.exports = Routes