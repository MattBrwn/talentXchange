// Iteration #1
const mongoose = require('mongoose')
const { getMaxListeners } = require('../app.js')

// first check if our db is connected
require('../configs/db.config.js')

// require the model

const UserModel = require('../models/User.model.js')

// insert into the model
// inserting many documents
UserModel.insertMany( [
    { name: 'Olivia Newton', email: 'olivianew@gmx.com', password: '1234567', talents:'gardening' },
    { name: 'Peter Cetera', email: 'petecet@blub.de', password: '2345678', talents: ['office task', 'repair (mech.)'] },
    { name: 'Eric Clapton', email: 'ericClapton@gbla.fr', password: '3456789', talents: ['shopping aid', 'car cleaning', 'elderly mentoring']}
  ])
    .then(() => {
        console.log('Data seeded')
        // always close the connection after seeding
        // please make sure you require mongoose at the top of the file
        mongoose.connection.close()
    })
    .catch((error) => {
        console.log('Data seeding went wrong!', error)
    })