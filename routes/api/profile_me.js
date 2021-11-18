const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const authMid = require('../../middleware/authMid');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile_me
// @desc    Get all profiles
// @access  Private
router.get('/', authMid, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
