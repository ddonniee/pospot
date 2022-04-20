const express = require("express");
const cors = require("cors");
require('dotenv').config();
var app = express();

var bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ msg : "bad choice!!"})
});

require("./routes/route.js")(app);

app.listen(8088, function() {
    console.log("server Start!!!")
})

