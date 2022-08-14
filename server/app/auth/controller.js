const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { getToken } = require("../../utils");
const config = require("../config");
const User = require("../user/model");

// SHOW USER
const me = (req, res) => {
  if (!req.user) {
    res.json({
      error: 1,
      message: "You're not logged in or token expired",
    });
  }

  res.json(req.user);
};

// REGISTER NEW USER
const register = async (req, res, next) => {
  const payload = req.body;
  try {
    let user = new User(payload);
    await user.save();

    return res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        details: err.errors,
      });
    }

    next(err);
  }
};

// USER LOGIN WITH PASSPORTJS
const login = async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({
        error: 1,
        message: "Email or password is incorrect",
      });
    }

    // GENERATE TOKEN
    let signed = jwt.sign(user, config.secretkey);

    await User.findByIdAndUpdate(user._id, { $push: { token: signed } });

    return res.json({
      message: "Login successful",
      user,
      token: signed,
    });
  })(req, res, next);
};

// USER LOGOUT
const logout = async (req, res) => {
  let token = getToken(req);

  // UPDATE TOKEN
  let user = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false });

  if (!token || !user) {
    res.json({
      error: 1,
      message: "User not found",
    });
  }

  return res.json({
    error: 0,
    message: "Logout successful",
  });
};

// PASSPORTJS STRATEGY
const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select("-__v -createdAt -updatedAt -cart_items -token");

    if (!user) return done();

    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());
      return done(null, userWithoutPassword);
    }
  } catch (err) {
    done(err, null);
  }

  done();
};

module.exports = {
  me,
  register,
  login,
  logout,
  localStrategy,
};
