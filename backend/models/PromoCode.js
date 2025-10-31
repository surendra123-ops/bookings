const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderValue: {
    type: Number,
    default: 0
  },
  maxDiscount: {
    type: Number,
    default: null
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Check if promo code is valid
promoCodeSchema.methods.isValid = function() {
  const now = new Date();
  return this.isActive && 
         now >= this.validFrom && 
         now <= this.validUntil &&
         (this.usageLimit === null || this.usedCount < this.usageLimit);
};

// Calculate discount amount
promoCodeSchema.methods.calculateDiscount = function(orderValue) {
  if (!this.isValid() || orderValue < this.minOrderValue) {
    return 0;
  }

  let discount = 0;
  if (this.discountType === 'percentage') {
    discount = (orderValue * this.discountValue) / 100;
  } else {
    discount = this.discountValue;
  }

  if (this.maxDiscount && discount > this.maxDiscount) {
    discount = this.maxDiscount;
  }

  return Math.min(discount, orderValue);
};

module.exports = mongoose.model('PromoCode', promoCodeSchema);
