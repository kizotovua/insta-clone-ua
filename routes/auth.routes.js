const {Router} = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../models/User');

const router = Router();

//api/auth/register
router.post(
  '/register',
  [
    check('name', 'First Name is a required field').not().isEmpty(),
    check('surname', 'Second Name is a required field').not().isEmpty(),
    check('email', 'Email is incorrect').isEmail(),
    check('password', 'Password is only 6 characters long').isLength({ min: 6 })
  ],

  async (req,res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
         const errorText = errors.array().map(e => e.msg);
        return res.status(400).json({
          message: `Registration failed: ${errorText[0]}`,
          errors: errorText
        });
      }
      const { email, password, name, surname, avatar } = req.body;

      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        res.status(400).json({
          message: "Such email has already been registered",
          errors: "Can't register this email, account already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 6);

      const user = new User({
        name:    `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
        surname: `${surname.charAt(0).toUpperCase()}${surname.slice(1)}`,
        username:`${name.toLowerCase()}_${surname.toLowerCase()}`,
        email,
        password: hashedPassword,
        avatar
      });

      await user.save();

      res.status(201).json({
        message: 'New profile has been created'
      });

    } catch (error) {
      res.status(500).json({
        message: `${error.message}`,
        errors: `${error.message}`
      });
    }
  }
);

//api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Please enter correct password')
      .exists()
  ],
  async (req,res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          request: req.body,
          message: 'Authorization error: invalid email or password'
        });
      }

      const { email, password } = await req.body;
      const user = await User.findOne({ email });
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if(!user) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Profile not found',
        });
      }

      if(!isPasswordMatch) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid password'
        });
      }

      const jwtToken = jwt.sign(
        { userID: user.id, },
        config.get('secret-key'),
        { expiresIn: config.get('tokenExpirationTime') }
        );

      res.status(200).json({
        jwtToken,
        id: user.id
      });

    } catch (error) {
      res.status(400).json({
        errors: [validationResult(req), error],
        message: "Profile not found: incorrect email or password"
      })
    }
  }
);

module.exports = router;