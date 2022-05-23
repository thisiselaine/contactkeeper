// Functionality: contains the register

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// get request
// post request
// put request
// delete request
// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    // validation from express-validator
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check(
      'password',
      'please enter a password with six or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');
    // limit what can be sent and ensure that certain things get through with express validator
  }
);

module.exports = router;
