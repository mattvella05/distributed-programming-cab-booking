const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Customer Service Running");
});

app.listen(3000, () => {
    console.log("Customer Service running on port 3000");
});