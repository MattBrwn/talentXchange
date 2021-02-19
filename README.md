# Project Name
talentXchange

## Description

talentXchange is a platform to offer and search for services in a nonprofit way.
 
## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
**homepage** - As a user I want to be able to access the homepage so that I see what the app is about.  “Sign Up”- button  
**Header** for all pages drop-down-menue for search of talents and for user (Log-In/Log-Out/Edit/Delete). Link to Homepage.
**sign up** - sign up.
**login** - to be able to log in on the webpage so that I can get back to my account (after sign up was successful).
**search results** - link to show (other) user.
**user profil**-  (others) with opportunity to send message for request.
**own profil**-  with button to “save changes”.
**request status**- list of requests with status (pending).  


## Backlog

List of other features outside of the MVPs scope

- exchange of messages
- upload profile picture
- create logo


## ROUTES:

- GET / 
  - renders the homepage

- GET /auth/signup
  - redirects to signup/ if user logged in
  - renders the signup form 
- POST /auth/signup
  - redirects to own profile / if user logged in
  - body:
    - username
    - email
    - password

- GET /auth/login
  - redirects to login / if user logged in
  - renders the login form
- POST /auth/login
  - redirects to overview / if user logged in
  - body:
    - email
    - password

- POST /auth/logout
  - redirects to home/index
  - body: (empty)

- GET /ownprofile
  - renders ownprofile (form to edit/change profile)
- POST /ownprofile 
  - redirects to overview
  - body: 
    - talents
    - description

- GET /userprofile/:id
  - renders user profile
  - option to send message
- POST /userprofile/:id/ 
  - redirects to overview
  - create request

- GET /overview
  - renders to overview
  - display requests

- GET /delete
  - redirects to home/index

- GET /results
  - renders to results
  - displays user, which fits search for talent



## Models

Models:

Users-Model
Request-Model


## Links

### Kanban-Board
https://docs.google.com/document/d/16fhEgIYyw7nU6bwfe7tQPKYRoL6PbPT_oQ7d2tkMo4E/edit?usp=sharing


### Git
The url to your repository and to your deployed project
[Repository Link](https://github.com/MattBrwn/talentXchange)
[Deploy Link](https://talentxchange.herokuapp.com/)

### Slides

The url to your presentation slides
[Slides Link](https://docs.google.com/presentation/d/1-vZDkPIz9YRhDFOT526WCyF3zDnIdr8xgYRXqHH5szY/edit?usp=sharing)
[wireframes] (https://docs.google.com/drawings/d/1V7kjmmZ97r4U1Fn3PuQh6A4acFe3j3YfWxXE3OVXQSs/edit?usp=sharing)
