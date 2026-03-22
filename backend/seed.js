const mongoose = require('mongoose');
const APIKey = require('./models/APIKey');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/freelanceproof';

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await APIKey.deleteMany({});
  
  const seedKeys = [
    { business_name: 'Raenest', email: 'hello@raenest.com', api_key: 'raenest_mock_key_123' },
    { business_name: 'Paystack', email: 'hello@paystack.com', api_key: 'paystack_mock_key_456' }
  ];

  await APIKey.insertMany(seedKeys);
  console.log('Seeded DB with mock fintech API keys', seedKeys);
  
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
