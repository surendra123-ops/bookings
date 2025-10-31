const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  experienceTitle: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  selectedDate: {
    type: String,
    required: true
  },
  selectedTime: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  basePrice: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  taxes: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  promoCode: {
    type: String,
    default: ''
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },
  referenceId: {
    type: String,
    unique: true,
    default: function() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  }
}, {
  timestamps: true
});

// Keep a safeguard to ensure referenceId exists
bookingSchema.pre('save', function(next) {
  if (!this.referenceId) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.referenceId = result;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
