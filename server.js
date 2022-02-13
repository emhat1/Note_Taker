// Note Taker (powered by Express.js)

// Set-up of dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./Develop/db/db")

// Access to public directory
app.use(express.static('public'));