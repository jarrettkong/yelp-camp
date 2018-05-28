const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose") 

mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const campgroundSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
  res.render("home");
});

// INDEX
app.get("/campgrounds", function(req, res) {
  // get campgrounds from MongoDB
    Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log("error found");
      console.log(err);
    } else {
      res.render("index", {campgrounds: campgrounds}); // campgrounds variable from callback function
    }
  });
});

// CREATE
app.post("/campgrounds", function(req, res) {
  const newCampground = {
    name: req.body.name, 
    img: req.body.img,
    description: req.body.description
  };
  // create new campground and add to DB
  Campground.create(newCampground, function(err, campground) {
    if(err) {
      console.log("error found");
      console.log(err);
    } else {
      console.log("added campground");
    }
  });  
  res.redirect("/campgrounds"); // reload /campgrounds page with GET request
});

// NEW
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// SHOW
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: campground}); // pass in found campground
    }
  });
});

app.get("/*", function(req, res) {
  res.send("page not found");
});

app.listen(3000);