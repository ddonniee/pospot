const express = require("express");
const cors = require("cors");
require('dotenv').config();
var app = express();
app.use('/pospotLog_uploads', express.static(__dirname + '/pospotLog_uploads'));

var bodyParser = require('body-parser');

// 미들웨어 추가
app.use(cors({
    origin: true,
    credentials: true
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ msg : "bad choice!!"})
});

require("./routes/route.js")(app);

app.listen(8088, function() {
    console.log("server Start!!!")
})





