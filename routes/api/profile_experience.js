const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const authMid = require('../../middleware/authMid');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   PUT api/profile_experience
// @desc    Add experience
// @access  Private
router.put(
  '/',
  [
    authMid,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull data from req.body
    const { title, company, location, from, to, current, description } =
      req.body;

    console.log('req.body: ', req.body);

    // Create experiences object
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    // Now let's deal with mongoDB
    try {
      const profiles = await Profile.find().populate('user', [
        'name',
        'avatar',
      ]);

      const profile = await profiles.filter(
        (i) => String(i.user._id) === req.user.id
      );

      profile[0].experience.unshift(newExp);

      await profile[0].save();

      res.json(profile[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
