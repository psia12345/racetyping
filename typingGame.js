const express = require('express');
const socketIO = require('socket.io');
const app = express();
const PORT = process.env.PORT || 2000;
const server = app.get('/', (req, res) =>
  res.sendFile(__dirname + '/client/index.html')).listen(
    PORT, () => console.log(`LISTENING on ${ PORT}`));
app.use('/client', express.static(__dirname + '/client'));

const io = socketIO(server, {});

const SOCKET_LIST = {};
const PLAYER_LIST = {};
const WAITING_PLAYER = {};
const GAME_IDS = {};
const Player = require('./playerServer');
const Computer = require('./computerPlayer');
let pack;
let ids;

io.sockets.on('connection', socket => {
  socket.id = Math.random();
  // console.log('server started');
  SOCKET_LIST[socket.id] = socket;
  socket.on('single player game', data => {
    socket.singleGame = true;
    setup(socket, data.gameId, 'new')
  })
  socket.on('join available game', data => {
    if (data.type === 'computer'){
      setup(socket, data.gameId, 'join', true, data.level)
    } else {
      if (Object.keys(WAITING_PLAYER).length != 0){
        let gameId = Object.keys(WAITING_PLAYER)[0]
        setup(socket, gameId, 'join')
      } else {
        let gameId = Math.random().toString(36).substring(3, 10);
        setup(socket, gameId, 'new')
      }
    }
  })
  socket.on('new game', (data) => {
    setup(socket, data.gameId, 'new')
  })
  socket.on('join game', (data, callback) => {
    if (typeof GAME_IDS[data] != 'undefined' && GAME_IDS[data].length === 1){
      callback(true);
      setup(socket, data, 'join');
    } else {
      callback(false);
    }
  })

  socket.on('typedForward', data => {
    let player = PLAYER_LIST[socket.id];
    // console.log('typed forward');
    if (data.inputId === 'forward'){
      player.typingForward = data.state;
    } else if (data.inputId === 'backward') {
      player.typingBackward = data.state;
    }
    player.wpm = parseInt(data.wpm);
    pack = [];
    let gameid = SOCKET_LIST[socket.id].gameId;
    ids = GAME_IDS[gameid];
    for (let i in ids){
      let player = PLAYER_LIST[ids[i]];
      player.updatePosition(player.wpm);
      if (typeof player.typingBackward === 'undefined'){
        pack.push({
          id: player.id,
          x: player.x
        })
      } else {
        pack.push({
          id: player.id,
          x: player.x,
          typingForward: player.typingForward,
          typingBackward: player.typingBackward
        })
      }
    }
    socket.on('get position', () => {
      let ids = GAME_IDS[socket.gameId]
      // console.log('GAME IDS', ids);
      for (let i in ids){
        let socket = SOCKET_LIST[ids[i]];
        // socket.emit('newPosition', pack);
        // console.log(pack);
      }
    })
  })
  // initially before typing, pack should only have initial positions
  // socket.on('get position', () =>{
  //
  // })
  socket.on('ready', () => {
    socket.ready = true
    let socketIds = GAME_IDS[socket.gameId];
    for (let i in socketIds){
      let otherSocket = SOCKET_LIST[socketIds[i]];
      // console.log('othersocket id', otherSocket.id);
      if (otherSocket.id != socket.id && otherSocket.ready ){
        socket.emit('both players ready')
        otherSocket.emit('both players ready')
      } else if (socket.singleGame && otherSocket.id != socket.id){
        socket.emit('both players ready')
      }
    }
  })

  socket.on('disconnect', () => {
    if (!socket.gameId) return;
    if (socket.singlePlayer){
      let socketIds = GAME_IDS[socket.gameId];
      delete SOCKET_LIST[socketIds[1]];
      delete PLAYER_LIST[socketIds[1]];
      delete GAME_IDS[socket.gameId];
    } else if (GAME_IDS[socket.gameId].length > 1){
      let idx = GAME_IDS[socket.gameId].indexOf(socket.id);
      GAME_IDS[socket.gameId].splice(idx, 1);
    } else {
      delete GAME_IDS[socket.gameId];
      delete WAITING_PLAYER[socket.gameId];
    }
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  })
})
function notify(...sockets){
  sockets.forEach(socket => {
    socket.emit('msg', 'Start Typing');
  })
}
function setup(socket, gameId, status, computerPlayer, level){
  socket.gameId = gameId;
  if (status === 'new'){
    PLAYER_LIST[socket.id] = new Player(1, socket.id);
    WAITING_PLAYER[gameId] = socket;
    GAME_IDS[gameId] = [socket.id];
    socket.emit('msg', 'waiting for another player');
  } else {
    PLAYER_LIST[socket.id] = computerPlayer ? new Computer(2, socket.id, level) : new Player(2, socket.id);
    GAME_IDS[gameId].push(socket.id);
    notify(WAITING_PLAYER[gameId], socket);
    delete WAITING_PLAYER[gameId];
  }
}
