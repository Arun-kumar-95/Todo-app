const path = require("path");

const { errorFormatter } = require(path.join(
  process.cwd(),
  "./src/Utils/errorFormatter"
));

module.exports.todo = async (req, res) => {
  try {
    return res.render("index", { title: "Todo app" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

module.exports.todoList = async (req, res) => {
  try {
    return res.render("todos", { title: "Todo list" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};
