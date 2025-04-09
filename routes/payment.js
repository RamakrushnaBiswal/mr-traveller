const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // adjust the path to your model
const Razorpay = require('razorpay');
const dotenv=require('dotenv')
dotenv.config()

// Razorpay instance setup
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create-order', async (req, res) => {
  try {
    let { tickets, tourGuide } = req.body;

    tickets = parseInt(tickets);
    const tourGuideSelected = tourGuide === 'on'; // checkbox returns 'on' if selected

    let amount = tickets * 50;
    if (tickets >= 5) {
      amount *= 0.9; // 10% discount
    }
    if (tourGuideSelected) {
      amount += 50;
    }

    const receiptId = `receipt_order_${Math.floor(Math.random() * 10000)}`;

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // in paise
      currency: 'INR',
      receipt: receiptId
    };
    const razorpayOrder = await instance.orders.create(options);

    // Save to DB
    const order = new Order({
      tickets,
      amount,
      tourGuide: tourGuideSelected,
      paymentMethod: 'razorpay', // default or modify if needed
      receiptId
    });

    await order.save();

    // Send order summary or redirect
    res.render('payment-page',{
        key: process.env.RAZORPAY_KEY_ID,
        amount: Math.round(amount * 100),
        orderId: razorpayOrder.id,
        tickets,
        tourGuide: tourGuideSelected
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
});

module.exports = router;
