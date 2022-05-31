// Functionality: contains the register

// needed constants and libraries
const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send('passed');
    // limit what can be sent and ensure that certain things get through with express validator

    const { name, email, password } = req.body;
    try {
      // mongoose feature: find email
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // create container for user
      user = new User({
        name,
        email,
        password,
      });

      // need salt to encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // put user into database

      // make payload to send in jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      // generate a token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
