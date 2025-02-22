const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
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

const getBookingsByUserId = async (name) => {
    try {
        const bookings = await Booking.find({ user: name }).populate('user', 'name'); // Populates user details
        return bookings;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { Bookings, getBookingsByUserId };
