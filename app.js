// 載入 express 並建構應用程式伺服
const express = require('express')
const app = express()
const PORT = 3000

const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const User = require('./models/user')
//載入express-session套件
const session = require('express-session')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
//設定session configuration
app.use(session({
  secret: 'hello world',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}))

mongoose.connect('mongodb://localhost/user-auth', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })

// 設定首頁路由
app.get('/', (req, res) => {
  if (req.session.userId) {
    //當登入成功後，session有data id, 返回首頁會繼續保持登入狀態
    User.findById(req.session.userId).lean()
      .then(user => {
        res.render('welcome', { user })
      })
  } else {
    res.redirect('login')
  }
})

//login
app.get('/login', (req, res) => {
  const errorNotice = `Email或Password錯誤`
  if (req.query.state === 'loginError') {
    res.render('login', { errorNotice })
  } else {
    res.render('login')
  }
})

app.post('/login', (req, res) => {
  const info = req.body
  return User.find({ email: info.email, password: info.password })
    .lean()
    .then((users) => {
      if (users.length > 0) {
        //當使用者登入成功後data id會存入session
        req.session.userId = users[0]._id
        res.render('welcome', { user: users[0] })
      } else {
        //登入失敗session清空
        req.session.destroy()
        res.redirect('/login?state=loginError')
      }
    }
    )
    .catch(error => console.log(error))
})

// 設定 port
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})