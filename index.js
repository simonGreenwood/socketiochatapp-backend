const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const http = require('http')
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})
io.on('connection',socket => {
    socket.on('message', (from,message) => {
        console.log(from,message)
        io.emit('message',from, message);
      })
    socket.on('user connect',(name) => {
      console.log(`User ${name} has connected`)
      io.emit('message','Server',`User ${name} has connected`)
    })
})


const PORT = process.env.PORT || 3001
server.listen(PORT,() => {
    console.log(`App listening on port ${PORT}`)
})