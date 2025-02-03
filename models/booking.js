const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    slot:{
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
}); 

const Bookings = mongoose.model('Booking', bookingSchema);

module.exports = Bookings