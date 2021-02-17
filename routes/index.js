const RequestModel = require("../models/Request.model");
const UserModel = require("../models/User.model");

const router = require("express").Router();
let allTalents = ['private tutoring', 'removal', 'gardening', 'household/housekeeping', 'office'];

/* GET HOME PAGE */
router.get("/", (req, res, next) => {
  res.render("index"), {title: "Welcome Users on talentXchange's Website"};
});



/* GET OWN PROFILE PAGE */
router.get("/ownprofile/", (req, res, next) => {
  //edit/save profileƒ
  //let name = req.params.name
  let userid = req.session.userData._id
  UserModel.findById(userid) 
    .then((user) => {
      console.log(user.talents)
      let name = user.name // what is when talents is not defined
      let talents = user.talents // what is when talents is not defined
      let description = user.description // what is when talents is not defined
      res.render('ownprofile.hbs', {name, talents, description})
    })
    .catch((err) => connsole.log(err)); 
});


/* POST OWN PROFILE PAGE */
router.post("/ownprofile/", (req, res, next) => {
  //edit/save profile
  //let name = req.params.name
  const {talents, description} = req.body
  let userid = req.session.userData._id
  // console.log(description);

  UserModel.findByIdAndUpdate(userid, {talents, description})
  .then((user) => {
    res.redirect('overview')
  })
  // UserModel.findByIdAndupdate({name, email, password: hash})
  .catch((err) => connsole.log(err)); 
  
});



/* GET USER PROFILE PAGE */
router.get("/userprofile/:id", (req, res, next) => {
  //user profile
const {id} = req.params
UserModel.findById(id)
  .then((user) => {
    res.render('userprofile.hbs', {user})
  })
  .catch((err) => connsole.log(err)); 
});

router.post("/userprofile/:id", (req, res, next) => {
  const {id} = req.params
  let userid = req.session.userData._id
  const {message} = req.body


  UserModel.findById(id)
    .then((requester) => {
      let talent = requester.talents// Gardening
      let request = {
        requested: id,
        searcher: userid,
        message: message,
        requested_talent: talent
      }

        RequestModel.create(request)
          .then(() => {
            res.redirect('/overview')
          })
          .catch((err) => connsole.log(err)); 
            })
  
});




/* GET OVERVIEW PAGE */
router.get("/overview", (req, res) => {
  //protected page 
  let name = req.session.userData.name
  // 1. Find all requests for the logged in user
  // Grab from RequestModel
  let userId = req.session.userData._id

  RequestModel.find({searcher: userId })
    .populate('requested')
    .then((myRequests) => {
      // results1 is all the users you as a user have requested for
      RequestModel.find({requested: userId })
        .populate('searcher')
        .then((foreignRequests) => {
            // results 2 is all the users that reuested for you as a talent
              res.render('overview.hbs', {name, myRequests, foreignRequests})
        })
        .catch((err) => connsole.log(err)); 
    })

  // console.log(name)
  
});


/* GET RESULTS PAGE */
router.get("/results/:talent", (req, res, next) => {
  //protected page
  let userid = req.session.userData._id
  let searchtalent = req.params.talent
  UserModel.find()
    .then((user) => {
      let result = []
      for (let i=0; i<user.length; i++) {
        let talent = user[i].talents
        if (talent === searchtalent) {
          result.push(user[i]);
        } 
      }      
      console.log(result);
      res.render('results.hbs', {result, searchtalent})
    })
    .catch((err) => console.log(err)); 
});

router.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/")
});


module.exports = router;
