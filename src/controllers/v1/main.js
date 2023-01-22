const path = require("path");

const { errorFormatter } = require(path.join(
  process.cwd(),
  "./src/Utils/errorFormatter"
));

const userSchema = require(path.join(process.cwd(), "./src/models/User.js"));
const todoSchema = require(path.join(process.cwd(), "./src/models/Todo.js"));

// RENDER TODO MAIN PAGE
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

// RENDER TODO LIST
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

module.exports.createTodos = async (req, res) => {
  try {
    console.log(req.body);
    const { name, date, category, todoTask } = req.body;

    // create user
    let user = await userSchema.find({ name });

    if (user.length == 0) {
      // create user

      user = await userSchema.create({
        name,
      });
      await user.save();
      return;
    }

    // create the todos
    let todo = await todoSchema.create({
      todoTask,
      date,
      category,
      user: user[0]._id,
    });

    await todo.save();

    console.log(user[0].todoItems);
    user[0].todoItems.push(todo._id);

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Todo Created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
