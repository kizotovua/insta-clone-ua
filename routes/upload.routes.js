const { Router } = require('express');
const { cloudinary } = require('../utils/cloudinary');

const router = Router();

//api/upload
router.post('/', async (req,res) => {

  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'insta_clone'
    });
    console.log(uploadedResponse);
    res.status(200).json({
      message: 'image uploaded',
      data: uploadedResponse
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'something went wrong',
      errors: e.message
    });
  }
});

//api/upload/avatars
router.post('/avatars', async (req,res) => {

  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'insta_clone_avatars'
    });

    res.status(200).json({
      message: 'image uploaded',
      data: uploadedResponse
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'something went wrong',
      errors: e.message
    });
  }
});


//api/upload/posts
router.post('/posts', async (req,res) => {

  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'insta_clone_posts'
    });

    res.status(200).json({
      message: 'image uploaded',
      data: uploadedResponse
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'something went wrong',
      errors: e.message
    });
  }
});


module.exports = router;

