const socket = io();
const Game = require('./game');
const Player = require('./player');
const socket2 = io();

//canvas
const divCanvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const WIDTH = window.innerWidth;
canvas.width = WIDTH;
const ctx = canvas.getContext('2d');
//Game mode
const newGame = document.getElementsByClassName('new-game')[0];
const singleGame = document.getElementsByClassName('single-game')[0];
//game
const inputDiv = document.getElementById('user-typing');
const time = document.getElementById('time');
//cars
const redcar = document.getElementById('redcar');
const greencar = document.getElementById('greencar');
//game Views
const gameView = document.getElementById('the-game');
const waiting = document.getElementById('waiting');
const splashPage = document.getElementById('splash-page');
const instruction = document.getElementById('instructions');
const instructionModal = document.getElementById('instructionmodal');

let timeLimit;
let player1;
let player2;
let game;

instruction.addEventListener('click', ()=> {
  instructionModal.style.display = 'block';
})

singleGame.addEventListener('click', ()=> {
  let id = Math.random().toString(36).substring(3, 10);
  socket.emit('newGame');
  // socket.join(id);
  socket2.emit('newGame');
  // socket2.join(id);
})

newGame.addEventListener('click', () => {
  startGameSetup();
  let id = Math.random().toString(36).substring(3, 10);
  socket.emit('newGame', {gameId: id});
})

const enterGame = document.getElementsByClassName('join-game')[0];
const gameId = document.getElementById('gameid');
enterGame.addEventListener('click', ()=> {

})
// const joinGame = document.getElementsByClassName('join-game')[1];
// joinGame.addEventListener('click', ()=> {
//   startGameSetup();
//   let id = gameid.value;
//   socket.emit('joinGame', {gameId: id});
// })


function startGameSetup(){
  splashPage.style.display = 'none';
  waiting.style.display = 'none';
  gameView.style.display = 'unset';
  timeLimit = parseInt(time.options[time.selectedIndex].value) * 5 ; // multiply by 60 to make into second
}
socket.on('msg', message);

function message(msg){
  console.log(msg);
  if (msg === "Start Typing"){
    startGameSetup();

    player1 = new Player(1, 10, 50, redcar, ctx);
    player2 = new Player(2, 10, 200, greencar, ctx);
    game = new Game(timeLimit, ctx);
    game.initializeGame(20, player1, player2);

  } else {
    gameView.style.display = 'none';
    waiting.style.display = 'unset';
  }
}

socket.on('newPosition', pack => {
  console.log(pack);

  if (typeof player1 === 'undefined' || typeof player2 === 'undefined'){
    return;
  } else if (player1.car === null || player2.car === null){
    return;
  }
  else if (pack !== null){
    ctx.clearRect(0, 0, WIDTH, 350);
    player1.car.drawRaceTrack();
    i = 0;
    player1.car.drawCar(pack[i].x);
    player2.car.drawCar(pack[i + 1].x)
  }
})
inputDiv.onkeydown = e => {
  socket.emit('typedForward', {
    inputId: 'forward',
    state: true,
    wpm: game.wpm.currentWPM
  })
}

// inputDiv.onkeyup = e => {
//   socket.emit('typedForward', {
//     inputId: 'forward',
//     state: false,
//     wpm: game.wpm.currentWPM
//   })
// }
