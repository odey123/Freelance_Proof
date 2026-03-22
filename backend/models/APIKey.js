const mongoose = require('mongoose');

const APIKeySchema = new mongoose.Schema({
  business_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  api_key: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('APIKey', APIKeySchema);
