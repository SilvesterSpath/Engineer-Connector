const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMid = require('../../middleware/authMid');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [authMid, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password'); // because we are logged in we get the token and inside it is the id and this is all in the 'req' body

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', authMid, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:post_id
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

// @route   DELETE api/posts/:post_id
// @desc    DELETE a post by ID
// @access  Private
router.delete('/:id', authMid, async (req, res) => {
  try {
    // Find post
    const post = await Post.findById(req.params.id);

    // Check for post
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Remove post
    await post.remove();
    res.json({ msg: 'Post deleted...' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post by ID
// @access  Private
router.put('/like/:id', authMid, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post already been liked by THIS user
    if (
      post.likes.filter((i) => i.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Remove a like by ID
// @access  Private
router.put('/unlike/:id', authMid, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post already been liked by THIS user
    if (
      post.likes.filter((i) => i.user.toString() === req.user.id).length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIdx = post.likes
      .map((i) => i.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIdx, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    Create a comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [authMid, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password'); // because we are logged in we get the token and inside it is the id and this is all in the 'req' body
      const post = await Post.findById(req.params.id);

      // because comments are not an actual collection in the database its gonna be an object
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save(); // we don't need to put it in a variable just save it

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    DELETE comment
// @access  Private
router.delete('/comment/:id/:comment_id', authMid, async (req, res) => {
  try {
    // Find post and comment
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find((i) => i.id === req.params.comment_id);

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get remove index
    const removeIdx = post.comments
      .map((i) => i.user.toString())
      .indexOf(req.user.id);

    // Remove comment
    post.comments.splice(removeIdx, 1);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
