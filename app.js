const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

let campgrounds = 
[
{name: "Golden Trout", img: "http://www.owensvalleyhistory.com/golden_trout/golden_trout_camp01.jpg"},
{name: "Golden Trout", img: "http://www.owensvalleyhistory.com/golden_trout/golden_trout_camp01.jpg"},
{name: "Golden Trout", img: "http://www.owensvalleyhistory.com/golden_trout/golden_trout_camp01.jpg"},
{name: "Golden Trout", img: "http://www.owensvalleyhistory.com/golden_trout/golden_trout_camp01.jpg"},
{name: "Golden Trout", img: "http://www.owensvalleyhistory.com/golden_trout/golden_trout_camp01.jpg"},
{name: "Golden Trout", img: "http://www.owensvalleyhistory.com/golden_trout/golden_trout_camp01.jpg"},
{name: "Golden Trout", img: "http://www.owensvalleyhistory.com/golden_trout/golden_trout_camp01.jpg"}
];

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
  const newCamp = {name: req.body.name, img: req.body.img};
  campgrounds.push(newCamp);
  res.redirect("campgrounds");
})

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.get("/*", function(req, res) {
  res.send("404 not found");
});

app.listen(3000);