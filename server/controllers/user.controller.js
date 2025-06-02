const User = require("../models/user.model");
const Notification = require("../models/notification.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.userRegisterController = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.json({
        message: "Provide all details",
      });
    }

    // check email is valid or not
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        message: "Please provide a valid email address",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email: email });
    const sameUsername = await User.findOne({ username: username });

    if (sameUsername) {
      return res.json({
        message: "Please enter uniqe User name",
        success: false,
      });
    }

    if (existingUser) {
      return res.json({
        message: " Already register user with this email",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const payload = {
      username: username,
      name: name,
      email: email,
      password: hashPassword,
    };

    const newUser = new User(payload);
    const save = await newUser.save();

    return res.status(200).json({
      message: "user register successfully",
      data: save,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//user login

exports.userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        message: "please provide all details",
        success: false,
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        message: "User not define",
        success: false,
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.json({
        message: "Invalid password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, { expiresIn: "1d" })
      .json({
        message: `Welcome back ${user.name}`,
        data: user,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

//logout user

exports.userLogoutController = async (req, res) => {
  try {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
      message: "user logout successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

// get user data
exports.getUserDataController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -__v -email -forgot_password_otp -forgot_password_expiry"
    ).populate("userPost")
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "user data",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

//followOr unfollow user

exports.followUserController = async (req, res) => {
  try {
    const { followId } = req.body;

    if (!followId) {
      return res.status(400).json({
        message: "please provide user id",
        success: false,
      });
    }

    const user = await User.findById(req.userId);
    const followUser = await User.findById(followId);

    if (!user || !followUser) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    // check if already following

    const isFollowing = user.following.includes(followId);

    if (isFollowing) {
      //unfollow user
      await user.updateOne({ $pull: { following: followId } });
      await followUser.updateOne({ $pull: { followers: req.userId } });

      return res.status(200).json({
        message: "user unfollowed successfully",
        success: true,
      });
    } else {
      //follow user

      await user.updateOne({ $push: { following: followId } });
      await followUser.updateOne({ $push: { followers: req.userId } });

      const notification = await Notification.create({
        from: req.userId,
        to: followId,
        type: "follow",
      });

      return res.status(200).json({
        message: "user followed successfully",
        success: true,
        data: notification,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

// get suggested users

exports.suggestedUsersController = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -__v");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    const following = user.following;

    const suggestedUsers = await User.find({
      _id: { $nin: [...following, req.userId] },
    })
      .limit(10)
      .select("-password -email -forgot_password_otp -forgot_password_expiry");
    return res.status(200).json({
      message: "suggested users",
      data: suggestedUsers,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

// update user data

exports.updateUserDataController = async (req, res) => {
  try {
    const { name, username, profileImg, coverImg, bio, link } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        username: username || user.username,

        profileImg: profileImg || user.profileImg,
        coverImg: coverImg || user.coverImg,
        bio: bio || user.bio,
        link: link || user.link,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        message: "user data not updated",
        success: false,
      });
    }

    return res.status(201).json({
      message: "user data updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

// get other user data
exports.getOtherUserDataController = async (req, res) => {
  try {
    const id = req.params.id;

   console.log("id++>>", id);
   
    if (!id) {
      return res.status(400).json({
        message: "please provide user id",
        success: false,
      });
    }

    const user = await User.findById(id).select(
      "-password -__v -email -forgot_password_otp -forgot_password_expiry"
    ).populate("userPost");
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "user data",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};



exports.getAllUser = async (req, res) => {
  try {
    const suggestedUsers = await User.find({
      _id: { $nin: [req.userId] },
    }).select("-password -email -forgot_password_otp -forgot_password_expiry");

    return res.status(200).json({
      message: "suggested users",
      data: suggestedUsers,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

exports.searchUsercontroller = async (req, res) => {
  try {
      const {text} = req.body;
    
    

    if (!text) {
      return res.json({
        message: "please fill search area",
        success: false,
      });
    }
    
  const searchUser = await User.find({
    name:{
      $regex : text, $options: 'i'
    }
  })


   
  
  
  return res.status(201).json({
    message: 'user search successfully',
    data: searchUser,
    success: true
   })


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};
