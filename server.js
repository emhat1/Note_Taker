// Note Taker (powered by Express.js)

// Set-up of dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./Develop/db/db")

// Creating the server with Express and creating a listening port
const app = express();
const PORT = process.env.PORT || 3000;

// Access to public directory
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

