var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var stringifyFile;

app.use(bodyParser.json());

app.get("/getNote", function(req, res) {
    console.log("old note");
    fs.readFile("./test.json", "utf-8", function(err, data) {
        if (err) throw err;
        stringifyFile = data;
        res.send(data);
    });
});

app.post("/updateNote/:note", function(req, res) {
    console.log("new note");
    fs.readFile("./test.json", "utf-8", function(err, data) {
        if (err) throw err;
        stringifyFile = data + req.params.note;
        fs.writeFile("./test.json", stringifyFile, function(err) {
            if (err) throw error;
            res.send(stringifyFile);
            console.log("File updated");
        });
    });
});

app.listen(3000);
app.use(function(req, res, next) {
    res.status(404).send("Sorry we cannot find what you want!");
});
