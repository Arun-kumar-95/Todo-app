const express = require("express");
const router = express.Router();
const path = require("path");
const { todo, todoList, createTodos } = require(path.join(
  process.cwd(),
  "./src/controllers/v1/main.js"
));
router.route("/").get(todo).post(createTodos);
router.route("/todos").get(todoList);
module.exports = router;
