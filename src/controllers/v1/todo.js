const path = require("path");
const userSchema = require(path.join(process.cwd(), "./src/models/User"));
const todoSchema = require(path.join(process.cwd(), "./src/models/Todo"));

const { errorFormatter } = require(path.join(
  process.cwd(),
  "./src/Utils/errorFormatter"
));

// RENDER TODO MAIN PAGE

module.exports.todo = async (req, res) => {
  try {
    return res.render("todo", { title: "Todo app", user: req.user });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// create todo
module.exports.createTodo = async (req, res) => {
  try {
    const { _id, todoTask, date, category } = req.body;

    // find the user based on name
    let user = await userSchema.findById({ _id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // if user exists then create a todo
    let todo = await todoSchema.create({
      todoTask,
      date,
      category,
      user: user._id,
    });

    await todo.save();
    user.todoItems.push(todo._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Todo Added Successfully",
    });
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
    let todos = await todoSchema.find({ user: req.user.id });
    return res.render("alltodos", { title: "Todo list", todos });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// UPDATE TODO
module.exports.updateTodo = async (req, res) => {
  try {
    const _id = req.params.id;
    let todo = await todoSchema.findById(_id);
    let todos = await todoSchema.find({ user: req.user.id });

    return res.render("updateTodo", {
      title: "Update todo",
      user: req.user,
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

//  update handler

module.exports.updateHandler = async (req, res) => {
  try {
    const { _id, todoTask, category, isCompleted, date } = req.body;

    let todo = await todoSchema.findById({ _id });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Invalid Parameters",
      });
    }

    if (!isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Select Todo Status",
      });
    }
    await todoSchema.updateOne(
      { _id },
      {
        $set: {
          todoTask,
          date,
          category,
          isCompleted,
        },
      },
      {
        new: true,
        runvalidator: true,
        upsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Todo Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// delete todo
module.exports.deleteTodo = async (req, res) => {
  try {
    const _id = req.body._id;

    let todo = await todoSchema.findById({ _id });

    let user = await userSchema.findById({ _id: req.user._id });

    if (!todo || !user) {
      return res.stat(404).json({
        success: false,
        message: "Invalid parameters",
      });
    }

    // remov ethe todo from user todo lists
    await userSchema
      .findById({ _id: req.user._id })
      .updateOne({}, { $pull: { todoItems: _id } }, { multi: true });

    // delete the todos
    await todoSchema.findByIdAndDelete({ _id });
    return res.status(200).json({
      success: true,
      message: "One Todo Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};


