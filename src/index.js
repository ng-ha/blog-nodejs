// CommonJS
const path = require("path");
const express = require("express");
const handlebars = require("express-handlebars");
const morgan = require("morgan");

// import path from "path";
// import express from "express";
// import handlebars from "express-handlebars";
// import morgan from "morgan";
// dùng import khi thêm "type": "module" trong package.json => ES module

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "/public")));

// HTTP logger
app.use(morgan("dev"));

// Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

// c1:
// app.set("views", "./src/resources/views");
// c2:
app.set("views", path.join(__dirname, "/resources/views"));

// route
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/news", (req, res) => {
  res.render("news");
});

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
