const express = require('express');
const crypto = require('crypto');
const APIKey = require('../models/APIKey');
const Freelancer = require('../models/Freelancer');
const cryptoService = require('../services/crypto.service');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { business_name, email } = req.body;
  try {
    let existing = await APIKey.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const rawKey = crypto.randomBytes(32).toString('hex');
    // Using simple storage for demo. In production, hash it using bcrypt
    const apiKeyDoc = new APIKey({
      business_name,
      email,
      api_key: rawKey // Store raw for now just so the user can see it once.
    });
    
    await apiKeyDoc.save();

    res.json({ api_key: rawKey, business_name, message: 'Store this API Key securely.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/verify', async (req, res) => {
  // Normally apiKey should be in headers or query auth.
  const { api_key, token } = req.body;
  
  try {
    const business = await APIKey.findOne({ api_key });
    if (!business) {
      return res.status(401).json({ error: 'Invalid API Key' });
    }

    const decoded = cryptoService.verifyToken(token);
    
    // Fetch fresh report if token is valid
    const freelancer = await Freelancer.findById(decoded.freelancer_id);
    if (!freelancer) {
      return res.status(404).json({ error: 'Data not found for the provided token' });
    }

    res.json({
      valid: true,
      business_recipient: business.business_name,
      report: {
        github_username: freelancer.github_username,
        score: freelancer.score,
        github_data: freelancer.raw_github_data,
        verified_platforms: freelancer.connected_platforms,
        issued_at: decoded.issued_at
      }
    });

  } catch (error) {
    return res.status(400).json({ valid: false, error: 'Invalid or expired token' });
  }
});

module.exports = router;
