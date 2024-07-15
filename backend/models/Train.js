const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departure_time: { type: Date, required: true },
  seat_capacity: { type: Number, required: true }
});

const Train = mongoose.model('Train', trainSchema);
module.exports = Train;
