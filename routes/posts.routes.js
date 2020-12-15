const {Router} = require('express');
const auth = require('../middlerware/auth.middleware');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const router = Router();

// api/posts
router.get('/', auth, async (req,res) => {
  try {
    const posts = await Post.find({authorID: req.user.userID});
    res.json(posts);

  } catch (error) {
    res.status(500).json({
      message: "Can't get posts: Something went wrong"
    });
  }
})

//api/posts/:id
router.get('/:id',auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.json(post);

  } catch (error) {
    res.status(500).json({
      message: "Can't get post: Something went wrong",
      errors: error.message
    });
  }
});


// api/posts/queryByAuthorsID
router.post('/queryByAuthorsID', auth, async (req,res) => {
  try {
    const { query } = req.body,
    posts = await Post.find({authorID: query});
    const ids = await [...posts].map(post => post._id);
    const allComments = await Comment.find({postID: { $in: ids } });
    const response = [...posts].map(post => {

      const comments = [...allComments]
        .map(c => {
        if(c.postID == post.id) {
          return c
        }
      })
        .filter(el => el != null);

      const { _id, authorID, imgURL, caption, date, likes } = post;
      return  {_id, authorID, imgURL, caption, date, likes, comments}

    }).reverse();

    res.json(response)

  } catch (error) {
    res.status(500).json({
      message: "Can't get posts: Something went wrong",
      errors: error.message
    });
  }
})

// api/posts/queryByAuthorsID/partial
router.post('/queryByAuthorsID/partial', auth, async (req,res) => {
  try {
    const { query, start, quantity } = req.body,
    posts = await Post.find({authorID: query});
    const postsSelected = [...posts].slice(start,start + quantity)
    const ids = await [...postsSelected].map(post => post._id);
    const allComments = await Comment.find({postID: { $in: ids } });

    const response = [...postsSelected].map(post => {
      const comments = [...allComments]
        .map(c => {
          if(c.postID == post.id) {
            return c
          }
        })
        .filter(el => el != null);

      const { _id, authorID, imgURL, caption, date, likes } = post;
      return  {_id, authorID, imgURL, caption, date, likes, comments}

    }).reverse();

    res.json(response)

  } catch (error) {
    res.status(500).json({
      message: "Can't get posts: Something went wrong",
      errors: error.message
    });
  }
})


//api/posts/create
router.post('/create',auth, async (req, res) => {

  try {
    const post = new Post({ ...req.body })
    await post.save();

    res.status(201).json({
      message: "new post has been created",
      postData: {...post}
    })

  } catch (error) {
    res.status(500).json({
      message: "Can't save post: Something went wrong",
      errors: error.message
    });
  }
});

//api/posts/remove
router.delete('/remove',auth, async (req, res) => {

  const { postID } = req.body;

  try {
    await Post.deleteOne({'_id': postID});
    res.json({
      message: `post id:${postID} has been removed`
    })
  } catch (error) {
    res.status(500).json({
      message: "Can't delete post: Something went wrong",
      errors: error.message
    });
  }
});


//api/posts/:id/likes
router.put('/:id/likes',auth, async (req, res) => {

  const { userID, dislike } = req.body;
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    const { likes } = post;

    if(!dislike) {
     likes.push(userID);

   } else if(likes.length) {
     likes.splice(likes.indexOf(userID),1);
   }
    await post.save();

    res.json({
      message: `${userID} likes ${post._id}`
    })

  } catch (error) {
    res.status(500).json({
      message: "can't put like: Something went wrong",
      errors: error.message
    });
  }
});

module.exports = router;
