const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/promo', require('./routes/promo'));

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
