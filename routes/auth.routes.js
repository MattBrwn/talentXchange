const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User.model")

// Middleware to protect routes
// Check if a user is logged in
function checkLoggedInUser(req, res, next) {
  if (req.session.userData) {
    next();
  }
  else {
    res.redirect(
      "/login"
    );
  }
}

/* GET signup page */
router.get(
  "/signup",
  (req, res, next) => {
    // Shows the sign up form to the user
    res.render(
      "auth/signup.hbs"
    );
  }
);

// Handle POST requests to /signup
// when the user submits the data in the sign up form, it will come here
router.post(
  "/signup",
  (req, res, next) => {
    // we use req.body to grab data from the input form
    const { name, email, password } = req.body;
    // validate first
    // checking if the user has entered all three fields
    // we"re missing one important step here
    if (!name.length || !email.length || !password.length) {
      res.render(
        "auth/signup.hbs",
        { msg: "Please enter all fields" }
      );
      return;
    }
    // validate if the user has entered email in the right format ( @ , .)
    // regex that validates an email in javascript
    let re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      res.render(
        "auth/signup.hbs",
        { msg: "Email not in valid format" }
      );
      return;
    }
    // validate password (special character, some numbers, min 6 length)
    // let regexPass = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    // if (!regexPass.test(password)) {
    //     res.render(
    //         "auth/signup.hbs", 
    //         {msg: "Password needs to have special chanracters, some numbers and be 6 characters aatleast"}
    //     );
    //     return;
    // }
    // creating a salt 
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    // Create user
    let user = {
      name,
      email,
      password: hash
    }
    UserModel.create(user)
      .then(
        (user) => {
          req.session.userData = user
          res.redirect(
            "/ownprofile"
          );
        }
      )
      .catch(
        (err) => {
          next(err);
        }
      );
  }
);


/* GET signin page */
router.get(
  "/login",
  (req, res, next) => {
    // Shows the sign in form to the user
    res.render("auth/login.hbs");
  }
);

// handle POST requests when the user submits something in the sign in form
router.post(
  "/login",
  (req, res, next) => {
    const { email, password } = req.body;
    // implement the same set of validations as you did in signup as well
    UserModel.findOne({ email: email })
      .then(
        (result) => {
          // if user exists
          if (result) {
            //check if the entered password matches with that in the DB
            bcrypt.compare(password, result.password)
              .then(
                (isMatching) => {
                  if (isMatching) {
                    // when the user successfully signs up
                    req.session.userData = result;
                    //req.session.areyoutired = false
                    //console.log(result)
                    res.redirect(
                      "/overview"
                    );
                  }
                  else {
                    // when passwords don"t match
                    res.render("auth/login.hbs", { msg: "Passwords dont match" });
                  }
                }
              );
          }
          else {
            // when the user signs in with an email that does not exits
            res.render(
              "auth/login.hbs",
              { msg: "Email does not exist" }
            );
          }
        }
      )
      .catch(
        (err) => {
          next(err);
        }
      );
  }
);

// GET request to handle /ownprofile
router.get(
  "/ownprofile",
  checkLoggedInUser,
  (req, res, next) => {
    let email = req.session.userData.email;
    let name = req.session.userData.name; /// ggf. überflüssig !!!!
    res.render(
      "ownprofile.hbs",
      { email }
    );
  }
);

// handle logout
router.get(
  "/logout",
  (req, res) => {
    req.session.destroy();
    res.redirect(
      "/"
    );
  }
);

module.exports = router;