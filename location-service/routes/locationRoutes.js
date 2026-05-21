const express = require("express");
const axios = require("axios");
const Location = require("../models/Location");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Location Routes Working"
    });
});


// ADD LOCATION
router.post("/add", async (req, res) => {

    try {

        const {
            userId,
            locationName,
            address,
            latitude,
            longitude
        } = req.body;

        const newLocation = new Location({
            userId,
            locationName,
            address,
            latitude,
            longitude
        });

        await newLocation.save();

        res.status(201).json({
            message: "Location Added Successfully",
            location: newLocation
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET USER LOCATIONS
router.get("/user/:userId", async (req, res) => {

    try {

        const locations = await Location.find({
            userId: req.params.userId
        });

        res.json(locations);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE LOCATION
router.put("/update/:id", async (req, res) => {

    try {

        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Location Updated",
            location: updatedLocation
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE LOCATION
router.delete("/delete/:id", async (req, res) => {

    try {

        await Location.findByIdAndDelete(req.params.id);

        res.json({
            message: "Location Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// GET WEATHER FORECAST
router.get("/weather/:city", async (req, res) => {

    try {

        const city = req.params.city;

        const response = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=20f32edaeccc4cda8bd141037262105&q=${city}`
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;