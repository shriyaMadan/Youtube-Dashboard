var express = require("express");
const CONFIG = require("./config");
var path = require("path");
const google = require("googleapis").google;
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
var http = require("http");
// var helmet = require('helmet');
var app = express();
var port = process.env.PORT || 5000;

var indexRouter = require("./routes/index.js");
require("dotenv").config();
const axios = require("axios").default;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(helmet());
app.use("/", indexRouter);

app.listen(port, () => {
  console.log("listening on", port);
});
