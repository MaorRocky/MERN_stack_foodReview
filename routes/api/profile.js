const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc   Get current user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/profile/
// @desc   Create or update a user profile
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('location', 'Location is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { location, bio, facebook, instagram } = req.body;
    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (facebook) profileFields.facebook = facebook;
    if (instagram) profileFields.instagram = instagram;
    //Build social object
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/profile/
// @desc   Get all profiles
// @access public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user @todo this we might dont need
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/reviews
// @desc     Add review to the profile
// @access   Private
router.put(
  '/reviews',
  [
    auth,
    [
      check('bathroom', 'bathroom is required')
        .not()
        .isEmpty(),
      check('staff', 'staff is required')
        .not()
        .isEmpty(),
      check('cleanliness', 'cleanliness is required')
        .not()
        .isEmpty(),
      check('drive_thru', 'Drive thruogh is required')
        .not()
        .isEmpty(),
      check('delivery', 'delivery is required')
        .not()
        .isEmpty(),
      check('food', 'Food quality is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const tempReview = {
        bathroom: req.body.bathroom,
        staff: req.body.staff,
        cleanliness: req.body.cleanliness,
        drive_thru: req.body.drive_thru,
        delivery: req.body.delivery,
        food: req.body.food
      };

      try {
        const profile = await Profile.findOne({ user: req.user.id });
        const resturant = await Resturant.findById(req.params.id).name;
        const newReview = { tempReview, resturant };
        profile.reviews.unshift(newReview);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    } catch (err) {
      console.error(err.message);
    }
  }
);

// @route    DELETE api/profile/reviews/:review_id
// @desc     Delete a review from a profile
// @access   Private
router.delete('/reviews/:review_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const reviewIds = foundProfile.reviews.map(rev => rev._id.toString());
    // if i dont add .toString() it returns this weird mongoose coreArray and the ids are somehow objects and it still deletes anyway even if you put /review/5
    const removeIndex = reviewIds.indexOf(req.params.review_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      // theses console logs helped me figure it out
      console.log('revIds', reviewIds);
      console.log('req.params', req.params);
      console.log('removed', reviewIds.indexOf(req.params.review_id));
      foundProfile.reviews.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route  POST api/profile/searchName
// @desc   Get profile by name
// @access public

router.post('/searchName', async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    const profile = await Profile.find({ user: user }).populate('user', [
      'name',
      'avatar'
    ]);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/searchLocation', async (req, res) => {
  try {
    const profile = await Profile.find(req.body).populate('user', [
      'name',
      'avatar'
    ]);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
