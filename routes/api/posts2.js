const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMid = require('../../middleware/authMid');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET posts/api/posts/:post_id
// @desc    Get post by ID
// @access  Private
router.get('/:id', authMid, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});
