const express = require('express');
const githubService = require('../services/github.service');
const { calculateScore } = require('../services/scoring.service');
const Freelancer = require('../models/Freelancer');
const cryptoService = require('../services/crypto.service');
const router = express.Router();

router.get('/github', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user,repo`;
  res.redirect(url);
});

router.get('/github/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const accessToken = await githubService.getAccessToken(code);
    const githubData = await githubService.fetchUserData(accessToken);
    
    const score = calculateScore(githubData.raw_github_data);
    
    let freelancer = await Freelancer.findOne({ github_id: githubData.github_id });
    
    if (freelancer) {
      freelancer.raw_github_data = githubData.raw_github_data;
      freelancer.score = score;
    } else {
      freelancer = new Freelancer({
        github_username: githubData.github_username,
        github_id: githubData.github_id,
        avatar_url: githubData.avatar_url,
        raw_github_data: githubData.raw_github_data,
        score
      });
    }

    // Generate Verification Token
    const tokenPayload = {
      freelancer_id: freelancer._id,
      github_username: freelancer.github_username,
      score: freelancer.score.overall,
      issued_at: new Date()
    };
    
    const jwtToken = cryptoService.generateToken(tokenPayload);
    freelancer.verification_token = jwtToken;
    freelancer.token_expires_at = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days
    
    await freelancer.save();

    // Redirect to frontend dashboard with ID
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/dashboard?id=${freelancer._id}`);
  } catch (error) {
    console.error('OAuth Error', error);
    res.status(500).json({ error: 'OAuth Failed' });
  }
});

module.exports = router;
