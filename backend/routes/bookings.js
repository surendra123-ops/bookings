const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

// POST /api/bookings - Create a new booking
router.post('/', [
  body('experienceId').isMongoId().withMessage('Valid experience ID required'),
  body('customerName').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('customerEmail').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('selectedDate').notEmpty().withMessage('Date is required'),
  body('selectedTime').notEmpty().withMessage('Time is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('promoCode').optional().trim()
], async (req, res) => {
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      experienceId,
      customerName,
      customerEmail,
      selectedDate,
      selectedTime,
      quantity,
      promoCode
    } = req.body;

    // Get experience details (for pricing info)
    const experience = await Experience.findById(experienceId).session(session);
    if (!experience) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Atomically decrement availableSlots to prevent double-booking
    const decResult = await Experience.updateOne(
      { _id: experienceId },
      { $inc: { 'availableDates.$[d].timeSlots.$[t].availableSlots': -quantity } },
      {
        arrayFilters: [
          { 'd.date': selectedDate },
          { 't.time': selectedTime, 't.availableSlots': { $gte: quantity } }
        ],
        session
      }
    );
    if (decResult.modifiedCount !== 1) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Selected time slot not available or insufficient slots' });
    }

    // Calculate pricing
    const basePrice = experience.price;
    const subtotal = basePrice * quantity;
    const taxes = Math.round(subtotal * 0.05); // 5% tax
    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const PromoCode = require('../models/PromoCode');
      const promo = await PromoCode.findOne({ code: promoCode.toUpperCase() }).session(session);
      if (promo && promo.isValid()) {
        discount = promo.calculateDiscount(subtotal);
        promo.usedCount += 1;
        await promo.save({ session });
      }
    }

    const total = subtotal + taxes - discount;

    // Create booking
    const booking = new Booking({
      experienceId,
      experienceTitle: experience.title,
      customerName,
      customerEmail,
      selectedDate,
      selectedTime,
      quantity,
      basePrice,
      subtotal,
      taxes,
      discount,
      promoCode: promoCode || '',
      total,
      status: 'confirmed',
      paymentStatus: 'completed'
    });

    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        referenceId: booking.referenceId,
        experienceTitle: booking.experienceTitle,
        customerName: booking.customerName,
        selectedDate: booking.selectedDate,
        selectedTime: booking.selectedTime,
        quantity: booking.quantity,
        total: booking.total,
        status: booking.status
      }
    });

  } catch (error) {
    await session.abortTransaction().catch(() => {});
    session.endSession();
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// GET /api/bookings/:referenceId - Get booking by reference ID
router.get('/:referenceId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ referenceId: req.params.referenceId });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Error fetching booking' });
  }
});

module.exports = router;
