const mongoose = require('mongoose')
const User = require('../user')
mongoose.connect('mongodb://localhost/user-auth', { useNewUrlParser: true, useUnifiedTopology: true })

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  users.forEach(user => {
    User.create({
      firstName: user.firstName,
      email: user.email,
      password: user.password
    })
  })
  console.log('mongodb connected!')
})