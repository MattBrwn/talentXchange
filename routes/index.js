const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index"), {title: "Welcome Users on talentXchange's Website"};
});

module.exports = router;
