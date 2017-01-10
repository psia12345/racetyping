const express = require('express');
const app = express();
const server = require('http').Server(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));
server.listen(2000);
console.log('server started');


const SOCKET_LIST = {};
const PLAYER_LIST = {};
let waitingPlayer;

const Player = require('./client/javascripts/player');
const io = require('socket.io')(server, {});

io.sockets.on('connection', socket => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
  let player = new Player(socket.id);
  PLAYER_LIST[socket.id] = player;
  socket.on('newGame', () => {
    if (waitingPlayer){
      notify(waitingPlayer, socket);
      waitingPlayer = null;
    } else {
      waitingPlayer = socket;
      socket.emit('msg', 'waiting for another player');
    }
  })

  socket.on('typedForward', data => {
    console.log('typedForward emitted from client');
    if (data.inputId === 'forward'){
      player.typingForward = data.state;
    } else if ( data.inputId === 'backward'){
      player.typingBackward = data.state;
    }
    const pack = [];
    pack.push(player);
    socket.emit('newPositions', pack);
  })

  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];
  })
});

function notify(...sockets){
  sockets.forEach(socket => {
    console.log("1", socket.id);
    socket.emit('msg', 'Start Typing')});
}
// // socket => {
//   // console.log('socket connection');
//   // socket.id = Math.random();
//   // SOCKET_LIST[socket.id] = socket;
//   //
//   // let player = new Player(socket.id);
//   // PLAYER_LIST[socket.id] = player;
//   //
//   // socket.on('disconnect', () => {
//   //   delete SOCKET_LIST[socket.id];
//   //   delete PLAYER_LIST[socket.id]
//   // });
//   //
//   // socket.on('keyPress', data => {
//   //   if (data.inputId === 'right'){
//   //     player.pressingRight = data.state
//   //   }
//   // })
// // }
// // );
//
// function onConnection(socket){
//   socket.id = Math.random();
//   SOCKET_LIST[socket.id] = socket;
//   console.log(SOCKET_LIST)
//   let player = new Player(socket.id);
//   PLAYER_LIST[socket.id] = player;
//
//   debugger;
//   socket.on('typedForward', data => {
//     if (data.inputId === 'forward'){
//       player.typingForward = data.state;
//     } else if ( data.inputId === 'backward'){
//       player.typingBackward = data.state;
//     }
//   })
//
//   socket.on('disconnect', () => {
//     delete SOCKET_LIST[socket.id];
//     delete PLAYER_LIST[socket.id];
//   })

// }

//   // socket.emit('msg', 'Hello!'); //sending msg to client
//   // socket.on('msg', txt => io.emit('msg', txt));
//   socket.id = Math.random();
//   SOCKET_LIST[socket.id] = socket;
//   Player.onConnect(socket);
// }
//
//   // if (waitingPlayer){ // if there are any player waiting
//   //   socket.emit('msg', 'Match starts');
//   //   waitingPlayer.emit('msg', 'Match starts');
//   //   waitingPlayer = null;
//   // } else {
//   //   waitingPlayer = socket;
//   //   socket.emit('msg', 'Wating for a second player');
//   // }
//   // console.log('socket connection');
//   // socket.id = Math.random();
//   // SOCKET_LIST[socket.id] = socket;
//   //
//   // let player = new Player(socket.id);
//   // PLAYER_LIST[socket.id] = player;
//   //
//   // socket.on('disconnect', () => {
//   //   delete SOCKET_LIST[socket.id];
//   //   delete PLAYER_LIST[socket.id]
//   // });
//
// //   socket.on('keyPress', data => {
// //     if (data.inputId === 'right'){
// //       player.pressingRight = data.state
// //     }
// //   })
// // }
//
// setInterval(() => {
//   const pack = [];
//   for (let i in PLAYER_LIST){
//     console.log(PLAYER_LIST)
//     let player = PLAYER_LIST[i];
//     player.updatePosition();
//     pack.push({
//       x: player.x,
//       y: player.y,
//       number: player.number
//     });
//   }
//   for (let i in SOCKET_LIST){
//     let socket = SOCKET_LIST[i];
//     socket.emit('newPositions', pack);
//   }
// }, 1000/25);
//
//
// // var Entity = function(){
// //     var self = {
// //         x:250,
// //         y:250,
// //         spdX:0,
// //         spdY:0,
// //         id:"",
// //     }
// //     self.update = function(){
// //         self.updatePosition();
// //     }
// //     self.updatePosition = function(){
// //         self.x += self.spdX;
// //         self.y += self.spdY;
// //     }
// //     self.getDistance = function(pt){
// //         return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
// //     }
// //     return self;
// // }
// //
// // var Player = function(id){
// //     var self = Entity();
// //     self.id = id;
// //     self.number = "" + Math.floor(10 * Math.random());
// //     self.pressingRight = false;
// //     self.pressingLeft = false;
// //     self.pressingUp = false;
// //     self.pressingDown = false;
// //     self.pressingAttack = false;
// //     self.mouseAngle = 0;
// //     self.maxSpd = 10;
// //
// //     var super_update = self.update;
// //     self.update = function(){
// //         self.updateSpd();
// //         super_update();
// //
// //         if(self.pressingAttack){
// //             self.shootBullet(self.mouseAngle);
// //         }
// //     }
// //     self.shootBullet = function(angle){
// //         var b = Bullet(self.id,angle);
// //         b.x = self.x;
// //         b.y = self.y;
// //     }
// //
// //
// //     self.updateSpd = function(){
// //         if(self.pressingRight)
// //             self.spdX = self.maxSpd;
// //         else if(self.pressingLeft)
// //             self.spdX = -self.maxSpd;
// //         else
// //             self.spdX = 0;
// //
// //         if(self.pressingUp)
// //             self.spdY = -self.maxSpd;
// //         else if(self.pressingDown)
// //             self.spdY = self.maxSpd;
// //         else
// //             self.spdY = 0;
// //     }
// //     Player.list[id] = self;
// //     return self;
// // }
// // Player.list = {};
// // Player.onConnect = function(socket){
// //     var player = Player(socket.id);
// //     socket.on('keyPress',function(data){
// //         if(data.inputId === 'left')
// //             player.pressingLeft = data.state;
// //         else if(data.inputId === 'right')
// //             player.pressingRight = data.state;
// //         else if(data.inputId === 'up')
// //             player.pressingUp = data.state;
// //         else if(data.inputId === 'down')
// //             player.pressingDown = data.state;
// //         else if(data.inputId === 'attack')
// //             player.pressingAttack = data.state;
// //         else if(data.inputId === 'mouseAngle')
// //             player.mouseAngle = data.state;
// //     });
// // }
// // Player.onDisconnect = function(socket){
// //     delete Player.list[socket.id];
// // }
// // Player.update = function(){
// //     var pack = [];
// //     for(var i in Player.list){
// //         var player = Player.list[i];
// //         player.update();
// //         pack.push({
// //             x:player.x,
// //             y:player.y,
// //             number:player.number
// //         });
// //     }
// //     return pack;
// // }
// //
// //
// // var Bullet = function(parent,angle){
// //     var self = Entity();
// //     self.id = Math.random();
// //     self.spdX = Math.cos(angle/180*Math.PI) * 10;
// //     self.spdY = Math.sin(angle/180*Math.PI) * 10;
// //     self.parent = parent;
// //     self.timer = 0;
// //     self.toRemove = false;
// //     var super_update = self.update;
// //     self.update = function(){
// //         if(self.timer++ > 100)
// //             self.toRemove = true;
// //         super_update();
// //
// //         for(var i in Player.list){
// //             var p = Player.list[i];
// //             if(self.getDistance(p) < 32 && self.parent !== p.id){
// //                 //handle collision. ex: hp--;
// //                 self.toRemove = true;
// //             }
// //         }
// //     }
// //     Bullet.list[self.id] = self;
// //     return self;
// // }
// // Bullet.list = {};
// //
// // Bullet.update = function(){
// //     var pack = [];
// //     for(var i in Bullet.list){
// //         var bullet = Bullet.list[i];
// //         bullet.update();
// //         if(bullet.toRemove)
// //             delete Bullet.list[i];
// //         else
// //             pack.push({
// //                 x:bullet.x,
// //                 y:bullet.y,
// //             });
// //     }
// //     return pack;
// // }
// //
// // var DEBUG = true;
// //
// // var io = require('socket.io')(serv,{});
// // io.sockets.on('connection', function(socket){
// //     socket.id = Math.random();
// //     SOCKET_LIST[socket.id] = socket;
// //
// //     Player.onConnect(socket);
// //
// //     socket.on('disconnect',function(){
// //         delete SOCKET_LIST[socket.id];
// //         Player.onDisconnect(socket);
// //     });
// //     socket.on('sendMsgToServer',function(data){
// //         var playerName = ("" + socket.id).slice(2,7);
// //         for(var i in SOCKET_LIST){
// //             SOCKET_LIST[i].emit('addToChat',playerName + ': ' + data);
// //         }
// //     });
// //
// //     socket.on('evalServer',function(data){
// //         if(!DEBUG)
// //             return;
// //         var res = eval(data);
// //         socket.emit('evalAnswer',res);
// //     });
// //
// //
// //
// // });
// //
// // setInterval(function(){
// //     var pack = {
// //         player:Player.update(),
// //         bullet:Bullet.update(),
// //     }
// //
// //     for(var i in SOCKET_LIST){
// //         var socket = SOCKET_LIST[i];
// //         socket.emit('newPositions',pack);
// //     }
// // },1000/25);
// //
