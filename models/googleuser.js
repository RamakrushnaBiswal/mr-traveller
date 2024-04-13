const mongoose = require('mongoose');

// Define schema for the users collection
const userSchema = new mongoose.Schema({
  name: String
});

// Define schema for the federated_credentials collection
const federatedCredentialsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  provider: String,
  subject: String
});

// Define User model
const User = mongoose.model('User', userSchema);

// Define FederatedCredentials model
const FederatedCredentials = mongoose.model('FederatedCredentials', federatedCredentialsSchema);

module.exports = { User, FederatedCredentials };