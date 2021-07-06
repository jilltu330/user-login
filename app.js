// 載入 express 並建構應用程式伺服
const express = require('express')
const app = express()
const PORT = 3000

const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const User = require('./models/user')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/user-auth', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })

// 設定首頁路由
app.get('/', (req, res) => {
  const errorNotice = `Email或Password錯誤`
  console.log(req.query)
  if (req.query.state === 'loginError') {
    res.render('index', { errorNotice })
  } else {
    res.render('index')
  }
})

//login
app.post('/login', (req, res) => {
  const info = req.body
  return User.find({ email: info.email, password: info.password })
    .lean()
    .then((users) => {
      if (users.length > 0) {
        res.render('welcome', { user: users[0] })
      } else {
        res.redirect('/?state=loginError')
      }
    }
    )
    .catch(error => console.log(error))
})

// 設定 port
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})