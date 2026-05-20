const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const locationRoutes = require("./routes/locationRoutes");

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
    res.send("Location Service Running");
});

app.use("/locations", locationRoutes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`Location Service running on port ${PORT}`);
});