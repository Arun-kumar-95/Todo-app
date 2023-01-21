const express = require("express");
const path = require("path");

const app = require(path.join(process.cwd(), "/src/server/main.js"));

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// require the routes
const mainRoute = require(path.join(process.cwd(), "./src/routes/v1/main.js"));

// Not found
const { notFound } = require(path.join(
  process.cwd(),
  "./src/Utils/notFound.js"
));

// adding middlewares
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// //for parsing the form and use via req.body
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

// setting the view engine
app.set("view engine", "ejs");

//setting the views folder
app.set("views", path.join(__dirname, "./src/views"));
// enable case sensitive routes
app.set("case sensitive routing", true);

//static files

app.use(express.static(path.join(process.cwd(), "./src/assets")));

// using the routes
app.use("/", mainRoute);

app.use(notFound);
