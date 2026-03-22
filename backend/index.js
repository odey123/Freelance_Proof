require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const freelancerRoutes = require('./routes/freelancer.routes');
const businessRoutes = require('./routes/business.routes');
const cryptoService = require('./services/crypto.service');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize RSA Keys
cryptoService.initKeys();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/freelancer', freelancerRoutes);
app.use('/api/business', businessRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/freelanceproof';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
