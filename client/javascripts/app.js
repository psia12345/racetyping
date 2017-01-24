// const socket = io();
// const Game = require('./game');
// const Player = require('./player');
// const socket2 = io();
//
// //canvas
// const divCanvasContainer = document.getElementById('canvas-container');
// const canvas = document.getElementById('canvas');
// const WIDTH = window.innerWidth;
// canvas.width = WIDTH;
// const ctx = canvas.getContext('2d');
// //Game mode
// const newGame = document.getElementsByClassName('new-game')[0];
// const singleGame = document.getElementsByClassName('single-game')[0];
// //game
// const inputDiv = document.getElementById('user-typing');
// const time = document.getElementById('time');
// //cars
// const redcar = document.getElementById('redcar');
// const greencar = document.getElementById('greencar');
// //game Views
// const gameView = document.getElementById('the-game');
// const waiting = document.getElementById('waiting');
// const splashPage = document.getElementById('splash-page');
// const instruction = document.getElementById('instructions');
// const instructionModal = document.getElementById('instructionmodal');
//
// let timeLimit;
// let player1;
// let player2;
// let game;
//
// instruction.addEventListener('click', ()=> {
//   instructionModal.style.display = 'block';
// })
//
// singleGame.addEventListener('click', ()=> {
//   let id = Math.random().toString(36).substring(3, 10);
//   socket.emit('single player game', {gameId: id});
//   // socket.join(id);
//   socket2.emit('join available game', {gameId: id, type: 'computer'});
//   // socket2.join(id);
// })
// const joinRandom = document.getElementsByClassName('join-random-game')[0];
// joinRandom.addEventListener('click', ()=> {
//   socket.emit('join available game', {gameId: '', type: ''});
// })
// newGame.addEventListener('click', () => {
//   startGameSetup();
//   let id = Math.random().toString(36).substring(3, 10);
//   console.log(id);
//   socket.emit('new game', {gameId: id});
// })
//
// const enterGame = document.getElementsByClassName('join-game')[0];
// const gameId = document.getElementById('gameid');
// // join a game with specific game id
// enterGame.addEventListener('click', (e)=> {
//   e.preventDefault();
//   socket.emit('join game', gameId.value, data => {
//     if (data){
//       console.log("in the game")
//       // successfully joined game
//       // start the game
//     } else {
//       let msg = 'The game room ID that you entered either doesn\'t exist yet or the room is already full. Please Try again.'
//       // no game room exits, try again or initiate a new game room
//       console.log(msg);
//     }
//   })
//   gameId.value = "" // set the input string empty again
//
// })
//
// // creates a list of available game room
// socket.on('gamerooms', data => {
//   let html = "";
//   for (let i = 0; i < data.length; i++){
//     html += data[i] + '<br/>'
//   }
//   // add this html string to document
// })
//
//
//
//
//
// // const joinGame = document.getElementsByClassName('join-game')[1];
// // joinGame.addEventListener('click', ()=> {
// //   startGameSetup();
// //   let id = gameid.value;
// //   socket.emit('joinGame', {gameId: id});
// // })
//
//
// function startGameSetup(){
//   splashPage.style.display = 'none';
//   waiting.style.display = 'none';
//   gameView.style.display = 'unset';
//   timeLimit = parseInt(time.options[time.selectedIndex].value) * 5 ; // multiply by 60 to make into second
// }
// socket.on('msg', message);
//
// function message(msg){
//   console.log(msg);
//   if (msg === "Start Typing"){
//     startGameSetup();
//
//     player1 = new Player(1, 10, 50, redcar, ctx);
//     player2 = new Player(2, 10, 200, greencar, ctx);
//     game = new Game(timeLimit, ctx);
//     game.initializeGame(20, player1, player2);
//
//   } else {
//     gameView.style.display = 'none';
//     waiting.style.display = 'unset';
//   }
// }
//
// socket.on('newPosition', pack => {
//   console.log(pack);
//
//   if (typeof player1 === 'undefined' || typeof player2 === 'undefined'){
//     return;
//   } else if (player1.car === null || player2.car === null){
//     return;
//   }
//   else if (pack !== null){
//     ctx.clearRect(0, 0, WIDTH, 350);
//     player1.car.drawRaceTrack();
//     i = 0;
//     player1.car.drawCar(pack[i].x);
//     player2.car.drawCar(pack[i + 1].x)
//   }
// })
// inputDiv.onkeydown = e => {
//   socket.emit('typedForward', {
//     inputId: 'forward',
//     state: true,
//     wpm: game.wpm.currentWPM
//   })
// }

// inputDiv.onkeyup = e => {
//   socket.emit('typedForward', {
//     inputId: 'forward',
//     state: false,
//     wpm: game.wpm.currentWPM
//   })
// }
//////////////////
const modal1 = document.getElementById('one-p-instruction');
const modal2 = document.getElementById('two-p-instruction');
const onePlayer = document.getElementById('proceed-1p');
const twoPlayers = document.getElementById('proceed-2p');
const singleGame = document.getElementById('start-1p');
const twoPlayerOptions = document.getElementsByClassName('option-2p');

const socket = io();
const socket2 = io();
const Game = require('./game');
const Player = require('./player');

//canvas
// const divCanvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const WIDTH = window.innerWidth;
canvas.width = WIDTH;
const ctx = canvas.getContext('2d');
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
let timeLimit;
let player1;
let player2;
let game;

document.addEventListener('click', e => {
  e.preventDefault;
  if (e.target.className === 'single-game'){
    modal1.style.display = 'block';
  } else if (e.target.className === 'two-game'){
    modal2.style.display = 'block';
  } else if (e.target == modal1 || e.target == modal2){
    modal1.style.display = 'none';
    modal2.style.display = 'none';
  } else if (e.target == onePlayer){
    console.log('continue single player game');
    modal1.style.display = 'none';
    const nextPage = document.getElementById('one-p-page2');
    nextPage.style.display = 'block';
  } else if (e.target == twoPlayers){
    console.log('start two player game');
    modal2.style.display = 'none';
    const nextPage = document.getElementById('two-p-page2');
    nextPage.style.display = 'block';
    let j;
    for (let i in twoPlayerOptions){
      twoPlayerOptions[i].onclick = function(e){
        if (e.target == twoPlayerOptions[i] || e.target == twoPlayerOptions[i].children[0] || e.target == twoPlayerOptions[i].children[1]){
          if (j){
            twoPlayerOptions[j].className = 'option-2p';
            twoPlayerOptions[j].children[2].className = 'hidden option-buttons'
          }
          twoPlayerOptions[i].className = 'selected option-2p';
          twoPlayerOptions[i].children[2].className = 'option-buttons'
          j = i;
        }
      }
    }
  } else if ( e.target == singleGame ){
    let level = document.querySelector('input[name="difficulty"]:checked').value;
    timeLimit = document.querySelector('input[name="time"]:checked').value;
    console.log('start single player game');
    let id = Math.random().toString(36).substring(3, 10);
    socket.emit('single player game', {gameId: id });
    socket2.emit('join available game', {gameId: id, type: 'computer', level: level});
  } else if ( e.target.className === 'option-buttons'){
    if (e.target.textContent === 'Create New Game Room'){
      console.log('create new game');
      let id = Math.random().toString(36).substring(3, 10);
      console.log(id);
      socket.emit('new game', {gameId: id})
    } else if (e.target.textContent === 'Join Game'){
      let gameId = e.target.previousElementSibling;
      socket.emit('join game', gameId.value, data => {
          if (data){
            console.log("in the game")
            // successfully joined game
            // start the game
          } else {
            let msg = 'The game room ID that you entered either doesn\'t exist yet or the room is already full. Please Try again.'
            // no game room exits, try again or initiate a new game room
            console.log(msg);
          }
        })
        gameId.value = ""
    } else if (e.target.textContent === 'Join Random Game'){
      socket.emit('join available game', {type: 'player'})
    }
  }
})
window.onclick = function(e){
  let modals = document.getElementsByClassName('modal');
  for ( let i in modals ){
    if ( e.target == modals[i] ){
      location.reload();
    }
  }
}
function startGameSetup(){
  splashPage.style.display = 'none';
  waiting.style.display = 'none';
  gameView.style.display = 'unset';
  timeLimit = parseInt(timeLimit) * 5 || 10;
  console.log(timeLimit);
}
socket.on('msg', message);

function message(msg){
  if (msg === "Start Typing"){
    startGameSetup();

    player1 = new Player(1, 10, 50, redcar, ctx);
    player2 = new Player (2, 10, 200, greencar, ctx);
    game = new Game(timeLimit, ctx);
    game.initializeGame(20, player1, player2);

  } else {
    splashPage.style.display = 'none';
    gameView.style.display = 'none';
    waiting.style.display = 'unset';
  }
}

inputDiv.onkeydown = e => {
  socket.emit('typedForward', {
    inputId: 'forward',
    state: true,
    wpm: game.wpm.currentWPM
  })
}
inputDiv.onkeyup = e => {
  socket.emit('typedForward', {
    inputId: 'forward',
    state: false,
    wpm: game.wpm.currentWPM
  })
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
    i = pack.length - 2;
    player1.car.drawCar(pack[i].x);
    player2.car.drawCar(pack[i + 1].x)
  }
})
