const path = require("path");
const userSchema = require(path.join(process.cwd(), "./src/models/User.js"));
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    // getting the token
    const { token } = req.cookies;

    // if no token found means not login redirect it to login
    if (!token) {
      return res.redirect("/");
    }

    // if we had token THEN VERIFY TOKEN
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    // fing the doctor via id and store
    req.user = await userSchema.findById(decode._id);

    // calling the next
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
