const {Router} = require('express');
const mongoose = require('mongoose');
const auth = require('../middlerware/auth.middleware');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { cloudinary } = require('../utils/cloudinary');


const router = Router();

// api/profiles
router.get('/', auth, async (req,res) => {
  try {
    const users = await User.find();
    res.json({
      data: users.map(user => user.id),
      message: 'all profiles IDs'
    });

  } catch (error) {
    res.status(500).json({
      message: "Can't get profiles: Something went wrong"
    });
  }
})

//api/profiles/queryById
router.post('/queryById', auth, async (req,res) => {
  try {
    const { query } = req.body;
    const  mongoIDs = query.split(',').map(id => new mongoose.Types.ObjectId(id));
    const users = await User.find({'_id': { $in: mongoIDs } });
    const responseArr = [...users].map(user => {
    const { id, name, surname, username, avatar, following, follows } = user;

      return {
        id,
        name: `${name} ${surname}`,
        username,
        avatar,
        following,
        follows,
      }
    });

    res.json(responseArr);

  } catch (error) {
    res.status(500).json({
      message: "Can't get profiles: Something went wrong",
      errors: error.message
    });
  }
})

//api/profiles/:id
  router.get('/:id',auth, async (req, res) => {
    try {
      const profileId = req.params.id;
      const profile = await User.findById(profileId),
      { following,follows,name,surname,username,avatar } = profile;

      res.json({
        name: `${name} ${surname}`,
        username,
        avatar,
        following,
        follows,
      });

    } catch (error) {
      res.status(500).json({
        message: "Can't get profile: Something went wrong",
        errors: error.message
      });
    }
});

//api/profiles/:id/avatar
router.put('/:id/avatar',auth, async (req, res) => {
  try {
    const { avatar: newAvatar } = req.body;
    const profileId = req.params.id;
    const profile = await User.findById(profileId);

    profile.avatar = newAvatar;

    await profile.save();

    res.send({
      message: 'avatar updated'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Avatar update failed',
      errors: error.message
    });
  }

});
//api/profiles/:id/subscribe
router.put('/:id/subscribe',auth, async (req, res) => {
  try {
    const followerID = req.params.id;
    const { followingID } = req.body;

    const followerProfile = await User.findById(followerID);
    const followingProfile = await User.findById(followingID);

    const alreadyFollowing = followerProfile.following.some(id => id == followingID);

    if(!alreadyFollowing) {

      followerProfile.following.push(followingID);
      followingProfile.follows.push(followerID);

      await followerProfile.save();
      await followingProfile.save();

      res.send({
        message: `${followerProfile.username} (you) now follows ${followingProfile.username}`
      });

    } else {
      throw new Error(`${followerProfile.username} is already following ${followingProfile.username}`)
    }

  } catch (error) {
    res.status(400).json({
      errors: error.message
    });
  }
});
//api/profiles/:id/unsubscribe
router.delete('/:id/unsubscribe',auth, async (req, res) => {
  try {
    const followerID = req.params.id;
    const { followingID } = req.body;

    const followerProfile = await User.findById(followerID);
    const followingProfile = await User.findById(followingID);

    const alreadyFollowing = followerProfile.following.some(id => id == followingID);

    if(alreadyFollowing) {

      const followingIndex = followerProfile.following.indexOf(followingID);
      const followerIndex = followingProfile.follows.indexOf(followerID);

      followerProfile.following.splice(followingIndex,1);
      followingProfile.follows.splice(followerIndex,1);

      await followerProfile.save();
      await followingProfile.save();

      res.send({
        message: `${followerProfile.username} (you) stopped following ${followingProfile.username}`
      });

    } else {
      throw new Error(`${followerProfile.username} has already unsubscribed ${followingProfile.username}`);
    }

  } catch (error) {
    res.status(400).json({
      message: "Can't delete post, something went wrong",
      errors: error.message
    });
  }
});

router.delete('/removeAccount',auth, async (req, res) => {

  const { profileID, cloudinaryIDs } = req.body;

  try {
    await User.deleteOne({'_id': profileID});
    await Post.deleteMany({ authorID: profileID });
    await Comment.deleteMany({ userID: profileID });

    const imageRemovalStatus = cloudinary.api.delete_resources([...cloudinaryIDs],
      (error, result) => result);

    res.json({
      message: `Profile :${profileID} has been removed`,
      cloudinaryResponse: imageRemovalStatus
    })
  } catch (error) {
    res.status(500).json({
      message: "Can't delete profile: Something went wrong",
      errors: error.message
    });
  }
});


module.exports = router;
