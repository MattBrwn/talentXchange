const router = require("express").Router();

/* GET HOME PAGE */
router.get("/", (req, res, next) => {
  res.render("index"), {title: "Welcome Users on talentXchange's Website"};
});



/* GET OWN PROFILE PAGE */
router.get("/ownprofile", (req, res, next) => {
  //edit/save profile
  res.render('ownprofile.hbs')
});

/* GET USER PROFILE PAGE */
router.get("/userprofile", (req, res, next) => {
  //user profile
  res.render('userprofile.hbs')
});


/* GET OVERVIEW PAGE */
router.get("/overview", (req, res, next) => {
  //protected page 
  res.render('overview.hbs')
});


/* GET RESULTS PAGE */
router.get("/results", (req, res, next) => {
  //protected page
  res.render('results.hbs')
});

module.exports = router;
