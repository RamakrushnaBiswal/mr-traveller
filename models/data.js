const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const sharedUuid = uuidv4();

const dataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    departuredate: {
        type: String,
        required: true
    },
    returndate: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        enum: ['kashmir', 'puri', 'siridi', 'varanasi', 'mumbai', 'sikkim', 'tirupati', 'similipal'],
        required: true
    },
    package: {
        type: String,
        enum: ['bronze', 'silver', 'gold', 'platinum'],
        required: true
    },
    uuid: {
        type: String,
        unique: true,
        default: sharedUuid,
        required: true
    }
});


const Data = mongoose.model('Data', dataSchema);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true,
        default: sharedUuid,
        unique: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { Data, User };