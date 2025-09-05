const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewear.js");
const {
  renderSignupForm,
  signup,
  renderLoginForm,
  login,
  logout,
} = require("../controllers/user.js");

router.route("/signup").get(renderSignupForm).post(wrapAsync(signup));

router
  .route("/login")
  .get(renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }), 
    wrapAsync(login)
  );

// logout
router.get("/logout", logout);

module.exports = router;
