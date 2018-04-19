var express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  // Get the old data from cookies => state http request to save piece of data into browser
  var name = req.cookies.username;
  if (name) {
    res.render("index", { name });
  } else {
    res.redirect("/hello");
  }
});



routes.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  res.redirect("/hello");
});

routes.get("/hello", (req, res) => {
  res.render("hello");
});

routes.post("/hello", (req, res) => {
  // Add username to cookies
  res.cookie("username", req.body.username);
  res.redirect("/");
});

module.exports = routes;
