const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const paymentRoutes = require("./routes/paymentRoutes");

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
    res.send("Payment Service Running");
});

app.use("/payments", paymentRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});