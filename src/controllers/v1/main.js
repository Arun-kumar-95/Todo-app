const path = require("path");

const { errorFormatter } = require(path.join(
  process.cwd(),
  "./src/Utils/errorFormatter.js"
));

const userSchema = require(path.join(process.cwd(), "./src/models/User.js"));

// RENDER LOGIN PAGE
module.exports.renderLogin = async (req, res) => {
  try {
    return res.render("index", { title: "Login" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// RENDER Register PAGE
module.exports.renderRegister = async (req, res) => {
  try {
    return res.render("register", { title: "Register" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

//  LOGIN USER
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userSchema.findOne({ email }).select("+password");
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    // match the password
    const isMathch = await user.matchPassword(password);

    if (!isMathch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    // geneteate a token

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Login Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

// REGISTER
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userSchema.findOne({ email });

    if (user) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
      });
    }

    //  create a user

    user = await userSchema.create({
      name,
      email,
      password,
    });

    await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    const { isLoggedOut } = req.body;

    if (isLoggedOut) {
      let options = {
        expires: new Date(Date.now()),
        httpOnly: true,
      };

      return res.status(200).cookie("token", null, options).json({
        success: true,
        message: "You are logged out",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: errorFormatter(err.message),
    });
  }
};
