const mongoose = require('mongoose');

// Define schema for the users collection
const userSchema = new mongoose.Schema({
  name: String,
  // email: String  // Add this field
});

// Define schema for the federated_credentials collection
const federatedCredentialsSchema = new mongoose.Schema({
  user_id: String,
  provider: String,
  subject: String
});

// Define User model
const User = mongoose.model('User', userSchema);

// Define FederatedCredentials model
const FederatedCredentials = mongoose.model('FederatedCredentials', federatedCredentialsSchema);

module.exports = { User, FederatedCredentials };