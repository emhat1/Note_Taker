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

// GET notes
app.get("/api/notes", function (err, res) {
    try {
        createNoteData = fs.readFileSync("/Develop/db/db.json", "utf8");
        console.log("Successful server contact!");
        createNoteData = JSON.parse(createNoteData);
    } catch (err) {
        console.log("\n error (catch err app.get):");
        console.log(err);
    }
    res.json(createNoteData);
});

// POST notes
app.post("/api/notes", function (req, res) {
    try {
        createNoteData = fs.readFileSync("./Develop/db/db.json", "utf8");
        console.log(createNoteData);
        createNoteData = JSON.parse(createNoteData);
        req.body.id = createNoteData.length;
        createNoteData.push(req.body);
        createNoteData = JSON.stringify(createNoteData);
        fs.writeFile("./db/db.json", createNoteData, "utf8", function (err) {
            if (err) throw err;
        });
  
        res.json(JSON.parse(createNoteData));
    } catch (err) {
        throw err;
        console.error(err);
    }
});
  






// Server listening to port
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

