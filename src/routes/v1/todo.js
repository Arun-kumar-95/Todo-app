const express = require("express");
const router = express.Router();
const path = require("path");

const { isAuthenticated } = require(path.join(
  process.cwd(),
  "./src/middlewares/auth.js"
));

const { todoList, updateTodo, updateHandler, deleteTodo } = require(path.join(
  process.cwd(),
  "./src/controllers/v1/todo.js"
));

const { logout} = require(path.join(
  process.cwd(),
  "./src/controllers/v1/main.js"
));

router.route("/alltodos").get(isAuthenticated, todoList).post(logout);
router
  .route("/alltodos/:id")
  .get(isAuthenticated)
  .post(isAuthenticated, deleteTodo);
router
  .route("/update/:id")
  .get(isAuthenticated, updateTodo)
  .post(updateHandler);

module.exports = router;
