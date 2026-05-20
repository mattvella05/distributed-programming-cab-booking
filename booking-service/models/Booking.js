const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    startingLocation: {
        type: String,
        required: true
    },

    endingLocation: {
        type: String,
        required: true
    },

    bookingDateTime: {
        type: Date,
        required: true
    },

    passengers: {
        type: Number,
        required: true
    },

    cabType: {
        type: String,
        enum: ["Economic", "Premium", "Executive"],
        required: true
    },

    status: {
        type: String,
        enum: ["current", "past"],
        default: "current"
    }
});

module.exports = mongoose.model("Booking", BookingSchema);