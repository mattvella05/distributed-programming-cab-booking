const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Booking Routes Working"
    });
});

router.post("/create", async (req, res) => {

    try {

        const {
            userId,
            startingLocation,
            endingLocation,
            bookingDateTime,
            passengers,
            cabType
        } = req.body;

        const newBooking = new Booking({
            userId,
            startingLocation,
            endingLocation,
            bookingDateTime,
            passengers,
            cabType
        });

        await newBooking.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking: newBooking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;