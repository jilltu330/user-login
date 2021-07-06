// 載入 express 並建構應用程式伺服
const express = require('express')
const app = express()
const PORT = 3000

// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定 port
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})