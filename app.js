var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

// Create the server
var app = express();

// Use parser in our app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/static", express.static('public'))


// setting themplate
app.set("view engine", "pug");



// Adding routes
const mainRoute = require("./routes");
const cardRoute = require('./routes/card')

app.use(mainRoute);
app.use("/cards", cardRoute)

app.use((req, res, next) => {
  const err = new Error("Not Found!");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.err = err;
  res.status(err.status);
  console.log("status :", res.locals.err.status);
  res.render("err");
});

app.listen(4000, () => {
  console.log("The app is running on localhost:4000");
});
