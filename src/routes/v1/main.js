const express = require("express");
const router = express.Router();
const path = require("path");
const { todo } = require(path.join(process.cwd() , "./src/controllers/v1/main.js"));
router.route("/").get(todo);
module.exports = router;
