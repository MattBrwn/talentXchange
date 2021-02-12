# Project Name
talentXchange

## Description

talentXchange is a platform to offer and search for services in a nonprofit way.
 
## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
**homepage** - As a user I want to be able to access the homepage so that I see what the app is about and header for Log-In/Log-Out/delete-button,  (Logo) and “Sign Up”- button and  “Learn more”-button -> “search results” page. Header (for all pages drop-down-menue for search)
**sign up** - sign up.
**login** - to be able to log in on the webpage so that I can get back to my account (after sign up was successful) / editing/changing profil.
**search results** - link to show (other) user.
**user profil**-  (others) with opportunity to send message for request.
**own profil**-  with button to “save”.
**profil status**- status (pending/active/denied) of other’s and own requests.  


## Backlog

List of other features outside of the MVPs scope

User profile:
- messaging
- upload profile picture
- create logo


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

Models:

Users-Model
user = {
firstName: String,
lastName: String,
email: {
type: String,
required: true,
unique: true
},
password: String,
talents: {
type: [String], -> s. below
required: true
},
description: String
}


Requests-Model
Request = {
requested: {
type: Schema.User.ObjectId, ref: “user”
},
searcher: {
type: Schema.User.ObjectId, ref: “user”
}
status: [“pending”, “active”, “deny”] 
request_date: Date,
message: String,

}

requested_talent: String



## Links

### Kanban-Board

https://docs.google.com/document/d/16fhEgIYyw7nU6bwfe7tQPKYRoL6PbPT_oQ7d2tkMo4E/edit?usp=sharing


### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/MattBrwn/talentXchange)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
[wireframes] (https://docs.google.com/drawings/d/1V7kjmmZ97r4U1Fn3PuQh6A4acFe3j3YfWxXE3OVXQSs/edit?usp=sharing)
[Kanban-Board] (https://docs.google.com/document/d/16fhEgIYyw7nU6bwfe7tQPKYRoL6PbPT_oQ7d2tkMo4E/edit?usp=sharing)
