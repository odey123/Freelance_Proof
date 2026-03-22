const express = require('express');
const Freelancer = require('../models/Freelancer');
const cryptoService = require('../services/crypto.service');

const router = express.Router();

router.get('/score', async (req, res) => {
  // Normally this would use a session or jwt token sent from the frontend to identify the user
  // For demo purposes, we will take the ID from the query param
  const { id } = req.query;
  
  try {
    const freelancer = await Freelancer.findById(id);
    if (!freelancer) {
      return res.status(404).json({ error: 'Freelancer not found' });
    }
    
    res.json(freelancer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/regenerate', async (req, res) => {
  const { id } = req.body;
  try {
    const freelancer = await Freelancer.findById(id);
    if (!freelancer) {
      return res.status(404).json({ error: 'Freelancer not found' });
    }

    const tokenPayload = {
      freelancer_id: freelancer._id,
      github_username: freelancer.github_username,
      score: freelancer.score.overall,
      issued_at: new Date()
    };
    
    const jwtToken = cryptoService.generateToken(tokenPayload);
    freelancer.verification_token = jwtToken;
    freelancer.token_expires_at = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    
    await freelancer.save();
    
    res.json({ token: freelancer.verification_token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
