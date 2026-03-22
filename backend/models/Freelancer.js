const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
  github_username: { type: String, required: true, unique: true },
  github_id: { type: String, required: true, unique: true },
  avatar_url: { type: String },
  connected_platforms: { type: [String], default: ['github'] },
  raw_github_data: {
    repos: { type: Array, default: [] },
    total_commits: { type: Number, default: 0 },
    languages: { type: Object, default: {} },
    account_age_years: { type: Number, default: 0 },
    weekly_activity: { type: Array, default: [] }
  },
  score: {
    overall: { type: Number, default: 0 },
    consistency: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    diversity: { type: Number, default: 0 },
    activity: { type: Number, default: 0 }
  },
  verification_token: { type: String },
  token_expires_at: { type: Date },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Freelancer', FreelancerSchema);
