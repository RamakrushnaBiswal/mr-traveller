const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tickets: { type: Number, required: true },
  amount: { type: Number, required: true },
  tourGuide: { type: Boolean, default: false },
  paymentMethod: { type: String, required: true },
  receiptId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);