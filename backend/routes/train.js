// const express = require('express');
// const jwt = require('jsonwebtoken');
// const Train = require('../models/Train');
// const User = require('../models/User');

// const router = express.Router();

// // Middleware to verify JWT and check if user is admin
// const verifyAdmin = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, 'admin'); // Use your JWT secret
//     const user = await User.findById(decoded.id);

//     if (!user || !user.isAdmin) {
//       throw new Error();
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(403).json({ message: 'Access denied' });
//   }
// };

// // Add Train (only for admins)
// router.post('/addTrain', verifyAdmin, async (req, res) => {
//   try {
//     const { train_number, name, source, destination, departure_time, seat_capacity } = req.body;

//     const newTrain = new Train({
//       train_number,
//       name,
//       source,
//       destination,
//       departure_time,
//       seat_capacity
//     });

//     await newTrain.save();
//     res.status(201).json({ message: 'Train successfully added' });
//   } catch (err) {
//     res.status(500).json({ message: 'Something went wrong', error: err });
//   }
// });

// module.exports = router;


const express = require('express');
const Train = require('../models/Train');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/addTrain', async (req, res) => {
  try {
    const { train_number, name, source, destination, departure_time, seat_capacity } = req.body;

    const newTrain = new Train({
      train_number,
      name,
      source,
      destination,
      departure_time,
      seat_capacity
    });

    await newTrain.save();
    res.status(201).json({ message: 'Train successfully added' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error);
    res.status(500).json({ message: 'Failed to fetch trains', error: error.message });
  }
});

module.exports = router;
