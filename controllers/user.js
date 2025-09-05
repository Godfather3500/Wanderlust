const User = require("../models/user.js");

// signup page
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

// signup
module.exports.signup = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// login page
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

// login
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back to Wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// logout
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are Logged out");
    res.redirect("/listings");
  });
};
