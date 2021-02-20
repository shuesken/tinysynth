const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const port = process.env.PORT || 4001
const index = require('./routes/index')

const app = express()
app.use(index)

const cors = require('cors')
const corsOptions = {
  origin: true // allow all
}
app.use(cors(corsOptions))

const server = http.createServer(app)

const io = socketIo(server)

// default hash of current state
let hash = 'eyJicG0iOjEyMCwidHJhY2tzIjpbeyJpZCI6MSwibmFtZSI6ImhpaGF0LXJlc28iLCJ2b2wiOjAuNCwibXV0ZWQiOmZhbHNlLCJiZWF0cyI6IjAwMDAwMDAwMDAwMDAwMDAifSx7ImlkIjoyLCJuYW1lIjoiaGloYXQtcGxhaW4iLCJ2b2wiOjAuNCwibXV0ZWQiOmZhbHNlLCJiZWF0cyI6IjAwMDAwMDAwMDAwMDAwMDAifSx7ImlkIjozLCJuYW1lIjoic25hcmUtdmlueWwwMSIsInZvbCI6MC45LCJtdXRlZCI6ZmFsc2UsImJlYXRzIjoiMDAwMDAwMDAwMDAwMDAwMCJ9LHsiaWQiOjQsIm5hbWUiOiJraWNrLWVsZWN0cm8wMSIsInZvbCI6MC44LCJtdXRlZCI6ZmFsc2UsImJlYXRzIjoiMDAwMDAwMDAwMDAwMDAwMCJ9XX0='

io.on('connection', socket => {
  console.log('New client connected')

  socket.on('disconnect', () => console.log('Client disconnected'))
  socket.on('addTrack', () => {
    console.log('addTrack')
    socket.broadcast.emit('addTrack')
  })
  socket.on('deleteTrack', id => {
    console.log('deleteTrack', id)
    socket.broadcast.emit('deleteTrack', id)
  })
  socket.on('updateBpm', bpm => {
    console.log('updateBpm', bpm)
    socket.broadcast.emit('updateBpm', bpm)
  })
  socket.on('setTrackVolume', data => {
    console.log('setTrackVolume', data)
    socket.broadcast.emit('setTrackVolume', data)
  })
  socket.on('toggleTrackBeat', data => {
    console.log('toggleTrackBeat', data)
    socket.broadcast.emit('toggleTrackBeat', data)
  })
  socket.on('muteTrack', id => {
    console.log('muteTrack', id)
    socket.broadcast.emit('muteTrack', id)
  })
  socket.on('clearTrack', id => {
    console.log('clearTrack', id)
    socket.broadcast.emit('clearTrack', id)
  })
  socket.on('updateTrackSample', data => {
    console.log('updateTrackSample', data)
    socket.broadcast.emit('updateTrackSample', data)
  })
  socket.on('updateHash', newHash => {
    hash = newHash
  })
  socket.on('getHash', () => {
    socket.emit('hash', hash)
  })
})

server.listen(port, () => console.log(`Listening on port ${port} ...`))
