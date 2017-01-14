const express = require('express');
const app = express();
const server = require('http').Server(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
server.listen(2000);
console.log('server started');

const SOCKET_LIST = {};
const PLAYER_LIST = {};
let waitingPlayer;
let pack;

const Player = require('./client/javascripts/player');
const io = require('socket.io')(server, {});

io.sockets.on('connection', socket => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
  socket.on('newGame', () => {
    if (waitingPlayer){
      let player = new Player(2, socket.id);
      PLAYER_LIST[socket.id] = player;
      notify(waitingPlayer, socket);
      waitingPlayer = null;
    } else {
      waitingPlayer = socket;
      let player = new Player(1, socket.id)
      PLAYER_LIST[socket.id] = player;
      socket.emit('msg', 'waiting for another player');
    }
    socket.on('typedForward', data => {
      if (data.inputId === 'forward'){
        let player = PLAYER_LIST[socket.id];
        player.typingForward = data.state;
        player.wpm = data.wpm;
      } else if (data.inputId === 'backward') {
        player.typingBackward = data.state;
        player.wpm = data.wpm;
      }
      pack = [];
      for (let i in PLAYER_LIST){
        let player = PLAYER_LIST[i];
        player.updatePosition(player.wpm);
        pack.push({
          id: player.id,
          x: player.x,
          typingForward: player.typingForward,
          typingBackward: player.typingBackward
        })
      }
    })
    socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  })
  });
})

setInterval( () => {
  for (let i in SOCKET_LIST){
    let socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack);
  }
}, 1000/25);

function notify(...sockets){
  sockets.forEach(socket => {
    socket.emit('msg', 'Start Typing')})
}
