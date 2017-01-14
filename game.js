// const Game = require('./client/javascripts/game');
//
// class TypingGame{
//   constructor(socket1, socket2){
//     this.players = [socket1, socket2];
//     this.turns = []
//     this.initSockets();
//     this.game;
//   }
//   initSockets(){
//     this.players.forEach((socket, index) => {
//       this.game = new Game(5);
//
//       console.log(this.game);
//       socket.emit('msg', 'Match Starts')
//       socket.on('turn', turn => console.log('player', index))
//     })
//   }
// }
// module.exports = TypingGame;
