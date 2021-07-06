// 載入 express 並建構應用程式伺服
const express = require('express')
const app = express()
const PORT = 3000

const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/user-auth', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

// 設定 port
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})