const mongoose = require('mongoose');
const federatedCredentialsSchema = new mongoose.Schema({
  provider: String,
  subject: String
});
const FederatedCredentials = mongoose.model('FederatedCredentials', federatedCredentialsSchema);

module.exports = FederatedCredentials ;