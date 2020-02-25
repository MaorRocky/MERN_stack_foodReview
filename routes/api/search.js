const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Resturant = require('../../models/Resturant');

// @route    POST api/search
// @desc     Get one resturant
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const resturant = await Resturant.find(req.body);
    res.json(resturant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/search/location
// @desc     Get restutrans via location
// @access   Private
router.post('/location', auth, async (req, res) => {
  try {
    const resturant = await Resturant.find(req.body);
    res.json(resturant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
