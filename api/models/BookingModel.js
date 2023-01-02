const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer',
        required: [true, 'Customer field is required!']
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service',
        required: [true, 'Service field is required!']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'payment_done', 'completed'],
        required: [true, 'Status field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = { Booking }