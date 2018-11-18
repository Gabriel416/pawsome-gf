var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var multer = require("multer");
// var upload = multer({ dest: 'public/uploads/' });
var gm = require("gm");
var path = require("path");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});

var upload = multer({ storage: storage });
var mysql = require("mysql");
var petfinder = require("petfinder")("your_key", "your_secret");

var PORT = process.env.PORT || 3000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use("/public", express.static(path.join(__dirname + "/public")));
app.use("/media", express.static(path.join(__dirname + "/media")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection(
  process.env.JAWSDB_URL || {
    port: 3306,
    host: "your_host",
    user: "your_user",
    password: "your_password",
    database: "your_db"
  }
);

connection.connect();

var images = [];

app.get("/", function(req, res, next) {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/survey", function(req, res, next) {
  res.sendFile(path.join(__dirname + "/views/survey.html"));
});

app.post("/results", function(req, res, next) {
  petfinder.findPet(
    req.body.location,
    {
      count: 10,
      animal: "dog",
      sex: req.body.sex,
      age: req.body.age,
      size: req.body.amount,
      breed: req.body.specific
    },
    function(err, pets) {
      if (err) {
        res.sendFile(path.join(__dirname + "/views/error.html"));
      } else {
        console.log(pets);
        res.render("results", { pets: pets });
      }
    }
  );
});

app.get("/quotes", function(req, res, next) {
  connection.query("SELECT * FROM dogs", function(err, data) {
    res.render("quotes", { dogs: data });
  });
});

app.post("/new", upload.any(), function(req, res, next) {
  var file;

  if (req.files[0]) {
    file = req.files[0].filename;
  } else {
    file = null;
  }
  connection.query(
    "INSERT INTO dogs (dog_name, dog_image) VALUES (?, ?)",
    [req.body.dog, file],
    function(err, data) {
      if (err) {
        res.sendFile(path.join(__dirname + "/views/error.html"));
      } else {
        res.redirect("/quotes");
      }
    }
  );
});

app.listen(PORT, function() {
  console.log("Listening on ", PORT);
});
