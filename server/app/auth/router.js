const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const controller = require("./controller");

// PASSPORTJS LOCAL STRATEGY
passport.use(new LocalStrategy({ usernameField: "email" }, controller.localStrategy));

// SHOW USER
router.get("/me", controller.me);

// REGISTER NEW USER
router.post("/register", controller.register);

// USER LOGIN
router.post("/login", controller.login);

// USER LOGOUT
router.post("/logout", controller.logout);

module.exports = router;
