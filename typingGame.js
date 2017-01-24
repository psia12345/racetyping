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


io.sockets.on('connection', socket => {
  socket.id = Math.random();
  console.log('server started');
  SOCKET_LIST[socket.id] = socket;
  socket.on('single player game', data => {
    socket.singleGame = true;
    setup(socket, data.gameId, 'new')
  })
  socket.on('join available game', data => {
    if (data.type === 'computer'){
      // need to set up computer player to join
      setup(socket, data.gameId, 'join', true, data.level)
    } else {
      // there's no gameID specified but there are waiting player
      if (Object.keys(WAITING_PLAYER).length != 0){
        let gameId = Object.keys(WAITING_PLAYER)[0]
        setup(socket, gameId, 'join')
      } else {
        // starting a new game since there are no waiting player
        let id = Math.random().toString(36).substring(3, 10);
        setup(socket, id, 'new')
      }
    }
  })
  socket.on('new game', (data) => {
    setup(socket, data.gameId, 'new')
  })
  // WAITING_PLAYER logic is to match with random player
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
      if (data.inputId === 'forward'){
        player.typingForward = data.state;
        player.wpm = data.wpm;
      } else if (data.inputId === 'backward') {
        player.typingBackward = data.state;
        player.wpm = parseInt(data.wpm);
      }
      pack = [];
      console.log("players", PLAYER_LIST);
      let socketid = player.socketID;
      console.log('=================');
      console.log('socket id', socketid);
      let gameid = SOCKET_LIST[socketid].gameId;
      console.log('gameid', gameid);
      for (let i in GAME_IDS[gameid]){
        let ids = GAME_IDS[gameid]
        let player = PLAYER_LIST[ids[i]];
        player.updatePosition(player.wpm);
        pack.push({
          id: player.id,
          x: player.x,
          typingForward: player.typingForward,
          typingBackward: player.typingBackward
        })
      }
      setTimeout( () => {
        for (let i in GAME_IDS[gameid]){
          let ids = GAME_IDS[gameid]
          let socket = SOCKET_LIST[ids[i]];
          socket.emit('newPosition', pack);
        }
      }, 1000/25)

      // console.log(pack);
    })
    socket.on('disconnect', (data) => {
      if (!socket.gameId) return;
      // GAME_IDS.splice(GAME_IDS.indexOf(socket.gameId), 1);


      if (socket.singlePlayer){
        // if it's single player game needs to delete the gameID
        delete GAME_IDS[socket.gameId]
      } else if (GAME_IDS[socket.gameId] > 1){
        // else check for the game id
        // more than 1 player
        GAME_IDS[socket.gameId] = 1
      } else {
        delete GAME_IDS[socket.gameId];
      }
      updateGameRooms();
      // socket.leave(gameID)
      delete SOCKET_LIST[socket.id];
      delete PLAYER_LIST[socket.id];

    })


})

function updateGameRooms(){
  io.sockets.emit('gamerooms', GAME_IDS);
}
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
