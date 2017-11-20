// import passport
const passport = require("passport");
// import mongoose 
const mongoose = require("mongoose");
const User = mongoose.model("User");
// import crypto to generate the hashes
const Crypto = require("crypto");


// the login controller
exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed to login",
  successRedirect: "/",
  successFlash: "You're now logged in!"
});

// logout middleware
exports.logout = (req, res) => {
  // do the logout
  req.logout();
  // show a flash to the user
  req.flash("success", "We hope to see you soon! ❤️");
  // redirect them back to the homepage
  res.redirect("/");
}

// check if the user is logged in
exports.isLoggedIn = (req, res, next) => {
  if(req.user) {
    next();
    return;
  }
  req.flash("error", "You must login First!");
  res.redirect("/login");
};

// forgot password controller 
exports.forgot = async (req, res) => {
  // check that the user's email exists
  const user = await User.findOne({email: req.body.email});
  console.log("Found a user with info:", user);
  // if there was no user, flash that info 
  if (!user) {
    // send a vague message to avoid revealing personal info about the account holders
    req.flash("success", "An email has been sent to that user's account!");
  }
  // else if there was a valid user 
  user.pwdResetToken = Crypto.randomBytes(20).toString("hex");
  console.log("password will expire in 1 hour: ", Date.now() + (60 * 60 * 1000));
};