const express = require("express");
const router = express.Router();
const path = require("path");
const { renderLogin, login, renderRegister, register } = require(path.join(
  process.cwd(),
  "./src/controllers/v1/main.js"
));

const { todo, createTodo } = require(path.join(
  process.cwd(),
  "./src/controllers/v1/todo.js"
));
const { isAuthenticated } = require(path.join(
  process.cwd(),
  "./src/middlewares/auth.js"
));

router.route("/").get(renderLogin).post(login);
router.route("/register").get(renderRegister).post(register);
router.route("/todo").get(isAuthenticated, todo).post(createTodo);

module.exports = router;
