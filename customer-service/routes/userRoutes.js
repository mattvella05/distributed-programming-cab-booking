const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "User Routes Working"
    });
});

router.post("/register", async (req, res) => {

    try {

        const { firstName, surname, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = new User({
            firstName,
            surname,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;