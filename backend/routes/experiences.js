const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// GET /api/experiences - Get all experiences
router.get('/', async (req, res) => {
  try {
    const { search, location } = req.query;
    let query = { isActive: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const experiences = await Experience.find(query)
      .select('title location description price image availableDates')
      .sort({ createdAt: -1 });

    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Error fetching experiences' });
  }
});

// GET /api/experiences/:id - Get experience details
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ message: 'Error fetching experience' });
  }
});

// GET /api/experiences/:id/availability - Get availability for specific date
router.get('/:id/availability', async (req, res) => {
  try {
    const { date } = req.query;
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const selectedDate = experience.availableDates.find(d => d.date === date);
    
    if (!selectedDate) {
      return res.json({ timeSlots: [] });
    }

    res.json({ timeSlots: selectedDate.timeSlots });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ message: 'Error fetching availability' });
  }
});

module.exports = router;
