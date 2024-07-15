const express = require('express');
const Booking = require('../models/Booking');
const Train = require('../models/Train');
const auth = require('../middleware/auth');

const router = express.Router();

// Book Seat
router.post('/book', auth, async (req, res) => {
  try {
    const { train_id, no_of_seats } = req.body;
    const train = await Train.findById(train_id);

    if (!train || train.available_seats < no_of_seats) {
      return res.status(400).json({ message: 'No seats available on this train' });
    }

    const booking = new Booking({
      user: req.user.id,
      train: train_id,
      no_of_seats,
      seat_numbers: Array.from({ length: no_of_seats }, (_, i) => i + 1)
    });

    train.available_seats -= no_of_seats;
    await train.save();
    await booking.save();

    res.status(200).json({ message: 'Seat booked successfully', booking_id: booking._id, seat_numbers: booking.seat_numbers });
  } catch (err) {
    res.status(400).json({ message: 'Failed to book seat', error: err.message });
  }
});

// Get Booking Details
router.get('/details', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('train');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch bookings', error: err.message });
  }
});
module.exports = router;
