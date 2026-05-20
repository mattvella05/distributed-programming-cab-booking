const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Payment Routes Working"
    });
});

router.post("/calculate", async (req, res) => {

    try {

        const {
            userId,
            bookingId,
            cabFare,
            cabType,
            passengers,
            bookingDateTime,
            discount
        } = req.body;

        if (passengers > 8) {
            return res.status(400).json({
                message: "Bookings with more than 8 passengers are not allowed"
            });
        }

        let cabMultiplier = 1;

        if (cabType === "Premium") {
            cabMultiplier = 1.2;
        }

        if (cabType === "Executive") {
            cabMultiplier = 1.4;
        }

        let daytimeMultiplier = 1;
        const bookingHour = new Date(bookingDateTime).getHours();

        if (bookingHour >= 0 && bookingHour < 8) {
            daytimeMultiplier = 1.2;
        }

        let passengersMultiplier = 1;

        if (passengers >= 5 && passengers <= 8) {
            passengersMultiplier = 2;
        }

        const discountMultiplier = discount || 1;

        const totalPrice =
            cabFare *
            cabMultiplier *
            daytimeMultiplier *
            passengersMultiplier *
            discountMultiplier;

        const newPayment = new Payment({
            userId,
            bookingId,
            cabFare,
            cabType,
            passengers,
            totalPrice
        });

        await newPayment.save();

        res.status(201).json({
            message: "Payment calculated successfully",
            calculation: {
                cabFare,
                cabMultiplier,
                daytimeMultiplier,
                passengersMultiplier,
                discountMultiplier,
                totalPrice
            },
            payment: newPayment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.get("/:paymentId", async (req, res) => {

    try {

        const payment = await Payment.findById(req.params.paymentId);

        if (!payment) {
            return res.status(404).json({
                message: "Payment not found"
            });
        }

        res.status(200).json(payment);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;