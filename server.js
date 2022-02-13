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
app.use(express.urlencoded({extended: true}));

// Setting up page routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// GET and POST requests
app.route("/api/notes")
    // GET the notes from the database
    .get(function (req, res) {
        res.json(database);
    })

    // POST a note to the database
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/Develop/db/db.json");
        let newNote = req.body;

        // Allocate ID number to first note
        let highestId = 99;
        // Identifies note with highest ID number
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {
                highestId = individualNote.id;
            }
        }
        // New note has unique ID assigned
        newNote.id = highestId + 1;
        database.push(newNote)

        // Write to db.json
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
        // Gives back the response 
        res.json(newNote);
});






// Server listening to port
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

