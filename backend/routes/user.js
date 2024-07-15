const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });

    await user.save();
    res.status(201).json({ message: 'Account successfully created' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Something went wrong', error: err });
    }
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ status: 'Incorrect username/password provided. Please retry' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'Incorrect username/password provided. Please retry' });
    }

    const token = jwt.sign({ id: user._id }, 'admin', { expiresIn: '1h' });
    res.status(200).json({ status: 'Login successful', token });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
