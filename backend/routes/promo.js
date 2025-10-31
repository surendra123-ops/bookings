const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const PromoCode = require('../models/PromoCode');

// POST /api/promo/validate - Validate promo code
router.post('/validate', [
  body('code').trim().notEmpty().withMessage('Promo code is required'),
  body('orderValue').isNumeric().withMessage('Order value must be a number')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code, orderValue } = req.body;

    const promoCode = await PromoCode.findOne({ code: code.toUpperCase() });

    if (!promoCode) {
      return res.json({ 
        valid: false, 
        message: 'Invalid promo code' 
      });
    }

    if (!promoCode.isValid()) {
      return res.json({ 
        valid: false, 
        message: 'Promo code has expired or is no longer valid' 
      });
    }

    if (orderValue < promoCode.minOrderValue) {
      return res.json({ 
        valid: false, 
        message: `Minimum order value of ₹${promoCode.minOrderValue} required` 
      });
    }

    const discount = promoCode.calculateDiscount(orderValue);

    res.json({
      valid: true,
      discount,
      promoCode: {
        code: promoCode.code,
        description: promoCode.description,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue
      }
    });

  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({ message: 'Error validating promo code' });
  }
});

// GET /api/promo - Get all active promo codes (for admin)
router.get('/', async (req, res) => {
  try {
    const promoCodes = await PromoCode.find({ isActive: true })
      .select('code description discountType discountValue minOrderValue validUntil usageLimit usedCount')
      .sort({ createdAt: -1 });

    res.json(promoCodes);
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    res.status(500).json({ message: 'Error fetching promo codes' });
  }
});

module.exports = router;
