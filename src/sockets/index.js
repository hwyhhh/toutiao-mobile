const express = require('express')
const app = express()
const port = 3000

const server = app.listen(8082)
const io = require('socket.io').listen(server)
io.on('connection', (socket) => {
  console.log('socket 连接成功')
  // 接收信息
  socket.on('message', (data) => {
    console.log(data)
    // 广播信息
    socket.broadcast.emit('gbmsg', data)
    // io.emit('allMsg', '欢迎你')
  })
})

app.get('/', (req, res) => res.send('hello world'))

app.listen(port, () => console.log(`example port ${port}`))
