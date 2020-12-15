const {Router} = require('express');
const auth = require('../middlerware/auth.middleware');
const Comment = require('../models/Comment');

const router = Router();

// api/comments
router.post('/', auth, async (req,res) => {
  try {
    const comments = await Comment.find({postID: req.body.postID});
    res.json(comments);

  } catch (error) {
    res.status(500).json({
      message: "Can't get comments: Something went wrong",
      errors: error.message,
    });
  }
});

// api/comments/post
router.post('/post', auth, async (req,res) => {
  try {
    const comment = new Comment({...req.body});
    await comment.save();

    res.status(201).json({
      message: "New comment has been posted",
    })

  } catch (error) {
    res.status(500).json({
      message: "Can't post comment: Something went wrong",
      errors: error.message,
    });
  }
});

//api/comments/remove
router.delete('/remove',auth, async (req, res) => {

  const { commentID } = req.body;

  try {
    await Comment.deleteOne({'_id': commentID});
    res.json({
      message: `Posted comment:${commentID} has been removed`
    })
  } catch (error) {
    res.status(500).json({
      message: "Can't delete post: Something went wrong",
      errors: error.message
    });
  }
});

module.exports = router;
