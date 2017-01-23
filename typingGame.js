const express = require('express');
const socketIO = require('socket.io');
const app = express();
// const server = require('http').Server(app);
const PORT = process.env.PORT || 2000;
const server = app.get('/', (req, res) =>
  res.sendFile(__dirname + '/client/index.html')).listen(
    PORT, () => console.log(`LISTENING on ${ PORT}`));
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/index.html');
// });
app.use('/client', express.static(__dirname + '/client'));
// server.listen(2000);
// console.log('server started');

const io = socketIO(server, {});

const SOCKET_LIST = {};
const PLAYER_LIST = {};
let waitingPlayer = {};
let pack;

const Player = require('./playerServer');
const gameIds = {};

io.sockets.on('connection', socket => {
  socket.id = Math.random();
  console.log('server started');
  SOCKET_LIST[socket.id] = socket;
  socket.on('single player game', data => {
    gameIds[data.gameId] = [socket.id];
    socket.gameId = data.gameId;
    socket.singleGame = true;
    let player = new Player(1, socket.id)
    PLAYER_LIST[socket.id] = player;
    waitingPlayer[data.gameId] = socket;
    socket.emit('msg', 'waiting for another player');
  })
  socket.on('join available game', data => {
    if (data.type === 'computer'){
      socket.gameId = data.gameId;
      let computerPlayer = new Player(2, socket.id);
      PLAYER_LIST[socket.id] = computerPlayer;
      let otherPlayer = waitingPlayer[data.gameId];
      notify(otherPlayer, socket);
      delete waitingPlayer[data.gameId];
    } else {
      // there's no gameID specified
      if (waitingPlayer[data.gameId]){
        let gameId = waitingPlayer.gameId;
        socket.gameId = gameId;
        let player = new Player(2, socket.id);
        PLAYER_LIST[socket.id] = player;
        notify(waitingPlayer[data.gameId], socket);
        delete waitingPlayer[data.gameId];
      } else {
        // pick a random waiting player and set game ID to that player's game ID

        let player = new Player(1, socket.id)
        PLAYER_LIST[socket.id] = player;
        socket.emit('msg', 'waiting for another player');
      }

    }

  })
  socket.on('new game', (data) => {
    gameIds[data.gameId] = [socket.id];
    socket.gameId = data.gameId;
    waitingPlayer = socket;
    let player = new Player(1, socket.id)
    PLAYER_LIST[socket.id] = player;
    socket.emit('msg', 'waiting for another player');
  })
  // waitingPlayer logic is to match with random player
  socket.on('join game', (data, callback) => {
    if (typeof gameIds[data] != 'undefined' && gameIds[data].length === 1){
      callback(true);
      let player1 = PLAYER_LIST[gameIds[data]]
      gameIds[data].push(socket.id);
      socket.gameId = data;
      let player = new Player(2, socket.id);
      PLAYER_LIST[socket.id] = player;
      notify(player1, socket);
    } else {
      callback(false);
    }
  })

  //   if (waitingPlayer.gameId === data){
  //     let player = new Player(2, socket.id);
  //     PLAYER_LIST[socket.id] = player;
  //     // let prevSocket = GAME_LIST[data.gameId];
  //     // GAME_LIST[data.gameId] = Object.assign({}, prevSocket, socket);
  //     notify(waitingPlayer, socket);
  //     waitingPlayer = null;
  //   } else {
  //     socket.gameId = data;
  //     waitingPlayer = socket;
  //     let player = new Player(1, socket.id)
  //     PLAYER_LIST[socket.id] = player;
  //     // GAME_LIST[data.gameId] = socket;
  //     socket.emit('msg', 'waiting for another player');
  //   }
  // })
    socket.on('typedForward', data => {
      if (data.inputId === 'forward'){
        let player = PLAYER_LIST[socket.id];
        console.log(player);
        player.typingForward = data.state;
        player.wpm = data.wpm;
      } else if (data.inputId === 'backward') {
        player.typingBackward = data.state;
        player.wpm = parseInt(data.wpm);
      }
      pack = [];
      console.log("players", PLAYER_LIST);
      for (let i in PLAYER_LIST){
        // work with the gameID
        let player = PLAYER_LIST[i];
        player.updatePosition(player.wpm);
        pack.push({
          id: player.id,
          x: player.x,
          typingForward: player.typingForward,
          typingBackward: player.typingBackward
        })
      }
      setTimeout( () => {
        // for (let i in SOCKET_LIST){
        //   let socket = SOCKET_LIST[i];
          socket.emit('newPosition', pack);
        // }
      }, 1000/25)

      // console.log(pack);
    })
    socket.on('disconnect', (data) => {
      if (!socket.gameId) return;
      // gameIds.splice(gameIds.indexOf(socket.gameId), 1);


      if (socket.singlePlayer){
        // if it's single player game needs to delete the gameID
        delete gameIds[socket.gameId]
      } else if (gameIds[socket.gameId] > 1){
        // else check for the game id
        // more than 1 player
        gameIds[socket.gameId] = 1
      } else {
        delete gameIds[socket.gameId];
      }
      updateGameRooms();
      // socket.leave(gameID)
      delete SOCKET_LIST[socket.id];
      delete PLAYER_LIST[socket.id];

    })


})

function updateGameRooms(){
  io.sockets.emit('gamerooms', gameIds);
}
function notify(...sockets){
  sockets.forEach(socket => {
    socket.emit('msg', {msg: 'Start Typing', players: PLAYER_LIST});
  })
}
