const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Resturant = require('../../models/Resturant');
// const changeAtIndex = function(index, replacement) {
//   return (
//     this.substr(0, index) +
//     replacement +
//     this.substr(index + replacement.length)
//   );
// };
// @route    POST api/resturants
// @desc     Create a resturant
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('text', 'Text is required')
        .not()
        .isEmpty(),
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
    try {
      const newResturant = new Resturant({
        name: req.body.name,
        text: req.body.text,
        location: req.body.location,
        avatar: req.body.avatar
      });
      const resturant = await newResturant.save();
      res.json(resturant);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/resturants
// @desc     Get all resturants
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const resturants = await Resturant.find().sort({ date: -1 });
    res.json(resturants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/resturants/:id
// @desc     Get resturant by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const resturant = await Resturant.findById(req.params.id);
    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !resturant) {
      return res.status(404).json({ msg: 'Resturant not found' });
    }
    res.json(resturant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    Resturant api/resturants/review/:id
// @desc     review a resturant
// @access   Private
router.post(
  '/review/:id',
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const resturant = await Resturant.findById(req.params.id);
      const tempReview = {
        bathroom: req.body.bathroom,
        staff: req.body.staff,
        cleanliness: req.body.cleanliness,
        drive_thru: req.body.drive_thru,
        delivery: req.body.delivery,
        food: req.body.food
      };
      const newReview = {
        review: tempReview,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      resturant.reviews.unshift(newReview);
      const newProfileReview = {
        review: tempReview,
        name: resturant.name
      };
      const profile = await Profile.findOne({ user: req.user.id });
      profile.reviews.unshift(newProfileReview);
      await profile.save();
      await resturant.save();
      res.json(resturant.reviews);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/resturants/review/:id/:review_id
// @desc     Delete review
// @access   Private
router.delete('/review/:id/:review_id', auth, async (req, res) => {
  try {
    const resturant = await Resturant.findById(req.params.id);
    // Pull out review
    const review = resturant.reviews.find(
      review => review.id === req.params.review_id
    );
    // Make sure review exists
    if (!review) {
      return res.status(404).json({ msg: 'Review does not exist' });
    }
    // Check user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    // Get remove index
    const removeIndex = resturant.reviews
      .map(review => review.id)
      .indexOf(req.params.review_id);

    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index in profile reviews and since the id of review in profile is +1 so we change it by adding 1
    const len = req.params.review_id.length;
    const numtoadd = req.params.review_id.charCodeAt(len - 1) + 1;
    const newStr =
      req.params.review_id.substr(0, len - 1) + String.fromCharCode(numtoadd);

    const profileRemoveIndex = profile.reviews
      .map(review => review.id)
      .indexOf(newStr);
    profile.reviews.splice(profileRemoveIndex, 1);
    resturant.reviews.splice(removeIndex, 1);
    await profile.save();
    await resturant.save();
    res.json(resturant.reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
