const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  availableSlots: {
    type: Number,
    required: true,
    min: 0
  },
  maxSlots: {
    type: Number,
    required: true,
    min: 1
  }
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  images: [String],
  availableDates: [{
    date: {
      type: String,
      required: true
    },
    timeSlots: [timeSlotSchema]
  }],
  about: {
    type: String,
    default: ''
  },
  minimumAge: {
    type: Number,
    default: 10
  },
  duration: {
    type: String,
    default: '2-3 hours'
  },
  includes: [String],
  requirements: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);
