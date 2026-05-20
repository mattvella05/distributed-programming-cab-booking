const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    bookingId: {
        type: String,
        required: true
    },

    cabFare: {
        type: Number,
        required: true
    },

    cabType: {
        type: String,
        enum: ["Economic", "Premium", "Executive"],
        required: true
    },

    passengers: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    paidAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Payment", PaymentSchema);