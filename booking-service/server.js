const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    res.send("Booking Service Running");
});

app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});