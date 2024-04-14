const mongoose = require('mongoose');
const federatedCredentialsSchema = new mongoose.Schema({
  user_id: String,
  provider: String,
  subject: String
});
const FederatedCredentials = mongoose.model('FederatedCredentials', federatedCredentialsSchema);

module.exports = FederatedCredentials ;