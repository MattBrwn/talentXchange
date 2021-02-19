const RequestModel = require("../models/Request.model");
const UserModel = require("../models/User.model");

const router = require("express").Router();

/* GET HOME PAGE */
router.get(
  "/",
  (req, res, next) => {
    res.render(
      "index.hbs",
      {
        title: "Welcome Users on talentXchange Website"
      }
    );
  }
);

/* GET OWN PROFILE PAGE */
router.get(
  "/ownprofile/",
  (req, res, next) => {
    // edit/save profile
    // let name = req.params.name
    let userId = req.session.userData._id;
    UserModel.findById(userId)
      .then(
        (user) => {
          let name = user.name; 
          let talents = user.talents; // what is when talents is not defined
          let description = user.description;
          res.render(
            "ownprofile.hbs",
            { name, talents, description }
          );
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }
);

/* POST OWN PROFILE PAGE */
router.post(
  "/ownprofile/",
  (req, res, next) => {
    // let name = req.params.name ggf. überflüssig !!!!!
    let userId = req.session.userData._id;
    const { talents, description } = req.body;
    let userRequirements = {
      talents,
      description
    };
    UserModel.findByIdAndUpdate(userId, userRequirements)
      .then(
        (user) => {
          res.redirect(
            "/overview"
          );
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }
);

/* GET USER PROFILE PAGE */
router.get(
  "/userprofile/:id",
  (req, res, next) => {
    const { id } = req.params;
    UserModel.findById(id)
      .then(
        (user) => {
          res.render(
            "userprofile.hbs",
            { user }
          );
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }
);

// POST userprofile page
router.post(
  "/userprofile/:id",
  (req, res, next) => {
    const { id } = req.params;
    let userId = req.session.userData._id;
    const { message } = req.body;
    UserModel.findById(id)
      .then(
        (requester) => {
          let talent = requester.talents;
          let request = {
            requested: id,
            searcher: userId,
            message: message,
            requested_talent: talent
          };
          RequestModel.create(request)
            .then(
              () => {
                res.redirect(
                  "/overview"
                );
              }
            )
            .catch(
              (err) => {
                console.log(err);
              }
            );
        }
      )
  }
);

/* GET OVERVIEW PAGE */
router.get(
  "/overview",
  (req, res) => {
    let name = req.session.userData.name;
    let talent = req.session.userData.talents;
    // 1. Find all requests for the logged in user
    // Grab from RequestModel
    let userId = req.session.userData._id;
    RequestModel.find({ searcher: userId })
      .populate("requested")
      .then(
        (myRequests) => {
          // results1 is all the users you as a user have requested for
          RequestModel.find({ requested: userId })
            .populate("searcher")
            .then(
              (foreignRequests) => {
                // results 2 is all the users that reuested for you as a talent
                res.render(
                  "overview.hbs",
                  {
                    name,
                    myRequests,
                    foreignRequests,
                    talent
                  }
                )
              }
            )
            .catch(
              (err) => {
                console.log(err);
              }
            );
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }
);

/* GET DELETE PAGE */
router.get(
  "/delete",
  (req, res, next) => {
    let userId = req.session.userData._id;
    UserModel.findByIdAndDelete(userId)
      .then(
        (user) => {
          res.redirect(
            "/"
          );
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }
);

/* GET RESULTS PAGE */
router.get(
  "/results/:talent",
  (req, res, next) => {
    let userId = req.session.userData._id; // ggf. überflüssig !!!!!
    let searchtalent = req.params.talent;
    UserModel.find()
      .then(
        (user) => {
          let result = [];
          for (let i = 0; i < user.length; i++) {
            let talent = user[i].talents;
            if (talent === searchtalent) {
              result.push(user[i]);
            }
          }
          res.render(
            "results.hbs",
            {
              result, searchtalent
            }
          );
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }
);

module.exports = router;