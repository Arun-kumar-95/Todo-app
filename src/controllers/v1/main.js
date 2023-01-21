module.exports.todo = async (req, res) => {
  try {
    return res.render("index", { title: "Todo app" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
