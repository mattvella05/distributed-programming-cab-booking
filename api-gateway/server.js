const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const CUSTOMER_SERVICE_URL = "http://localhost:3000";
const BOOKING_SERVICE_URL = "http://localhost:3001";
const PAYMENT_SERVICE_URL = "http://localhost:3002";
const LOCATION_SERVICE_URL = "http://localhost:3003";

app.get("/", (req, res) => {
    res.json({
        message: "API Gateway Running"
    });
});

app.use("/api/users", async (req, res) => {

    try {
        const response = await axios({
            method: req.method,
            url: `${CUSTOMER_SERVICE_URL}/users${req.url}`,
            data: req.body
        });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || error.message
        });
    }

});

app.use("/api/bookings", async (req, res) => {

    try {
        const response = await axios({
            method: req.method,
            url: `${BOOKING_SERVICE_URL}/bookings${req.url}`,
            data: req.body
        });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || error.message
        });
    }

});

app.use("/api/payments", async (req, res) => {

    try {
        const response = await axios({
            method: req.method,
            url: `${PAYMENT_SERVICE_URL}/payments${req.url}`,
            data: req.body
        });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || error.message
        });
    }

});

app.use("/api/locations", async (req, res) => {

    try {
        const response = await axios({
            method: req.method,
            url: `${LOCATION_SERVICE_URL}/locations${req.url}`,
            data: req.body
        });

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || error.message
        });
    }

});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});