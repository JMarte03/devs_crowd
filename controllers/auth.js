// For now these controllers serve the login.ejs and signup.ejs (no authentication has been implemented)
// controllers/auth.js
const User = require("../models/User");
const passport = require("passport");
const validator = require("validator");

module.exports = {
  // GET SIGNUP
  getSignup: (req, res) => {
    if (req.user) {
      return res.redirect("/profile");
    }
    res.render("signup.ejs", {
      title: 'Create Account'
    });
  },

  // GET LOGIN
  getLogin: (req, res) => {
    if (req.user) {
      return res.redirect("/profile");
    }
    res.render("login.ejs");
  },

  // POST SIGNUP
  postSignup: async (req, res, next) => {
    try {
      const validationErrors = [];
      if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });
      if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push({
          msg: "Password must be at least 8 characters long",
        });
      if (req.body.password !== req.body.confirmPassword)
        validationErrors.push({ msg: "Passwords do not match" });
  
      if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("../signup");
      }
  
      req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
      });
  
      // Check for existing user
      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { userName: req.body.userName }],
      });
  
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
  
      // Create and save new user
      const user = new User({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });
  
      await user.save();
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/profile");
      });
    } catch (err) {
      console.error("Error in signup:", err);
      next(err);
    }
  },

  // POST LOGIN
  postLogin: (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });
  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/login");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });
  
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", info);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in." });
        res.redirect(req.session.returnTo || "/profile");
      });
    })(req, res, next);
  },

  // LOGOUT
  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      } // Handle error if any
      req.session.destroy((err) => {
        if (err) {
          console.log(
            "Error : Failed to destroy the session during logout.",
            err
          );
          return next(err);
        }
        req.user = null;
        res.redirect("/");
      });
    });
  },

  // GOOGLE AUTHENTICATION
  
  // signup
  signupGoogle: passport.authenticate("google", { scope: ["profile", "email"] }),
  // login
  loginGoogle: passport.authenticate("google", {
    failureRedirect: "/login", // Redirect to login on failure
    successRedirect: "/profile", // Redirect to profile on success
  }),

};


