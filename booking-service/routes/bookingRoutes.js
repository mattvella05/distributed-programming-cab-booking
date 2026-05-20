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

router.get("/current/:userId", async (req, res) => {

    try {

        const bookings = await Booking.find({
            userId: req.params.userId,
            status: "current"
        });

        res.status(200).json({
            bookings
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.get("/past/:userId", async (req, res) => {

    try {

        const bookings = await Booking.find({
            userId: req.params.userId,
            status: "past"
        });

        res.status(200).json({
            bookings
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.put("/:bookingId/complete", async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.bookingId);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        booking.status = "past";

        await booking.save();

        res.status(200).json({
            message: "Booking marked as past",
            booking
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;