// Note Taker (powered by Express.js)

// Set-up of dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./Develop/db/db")

// Creating the server with Express and setting the port
const app = express();
const PORT = process.env.PORT || 3000;

// Access to public directory
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));







// Server listening to port
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

