//entry file for client
const socket = io();
const Game = require('./game');
const Player = require('./player');

const inputDiv = document.getElementById('user-typing');
const divCanvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const WIDTH = window.innerWidth;
canvas.width = WIDTH;
const ctx = canvas.getContext('2d');
const newGame = document.getElementsByClassName('new-game')[0];
let timeLimit;

newGame.addEventListener('click', () => {
  const splashPage = document.getElementById('splash-page');
  splashPage.style.display = 'none';

  const waiting = document.getElementById('waiting');
  waiting.style.display = 'none';

  const time = document.getElementById('time');
  timeLimit = parseInt(time.options[time.selectedIndex].value) ; // multiply by 60 to make into second

  const gameView = document.getElementById('the-game');
  gameView.style.display = 'unset';

  socket.emit('newGame');
})

socket.on('msg', message);

function message(msg){
  if (msg === "Start Typing"){
    const waiting = document.getElementById('waiting');
    waiting.style.display = 'none';
    const gameView = document.getElementById('the-game');
    gameView.style.display = 'unset';

    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');
    let player1 = new Player(1, 10, 50, redcar, ctx);
    let player2 = new Player(2, 10, 200, greencar, ctx);
    let game = new Game(timeLimit, ctx);
    console.log("game starts")
    game.initializeGame(20, player1, player2);
  } else {
    const gameView = document.getElementById('the-game');
    gameView.style.display = 'none';

    const waiting = document.getElementById('waiting');
    waiting.style.display = 'unset';
  }
}

inputDiv.onkeydown = e => {
  socket.emit('typedForward', { inputId: 'forward', state: true })

  socket.on('newPositions', data => {
    // debugger;
    ctx.clearRect(0, 0, WIDTH, 350);
    console.log(data.player1);
    console.log(data);
  })
}

inputDiv.onkeyup = e => {
  socket.emit('typedForward', {
    inputId: 'forward', state: false
  })
}

// document.addEventListener('keydown', (e)=> {
//   if (e.keyCode === 68){
//     socket.emit('keyPress', { inputId: 'right', state: true})
//   }
// })
// document.addEventListener('keyup', (e)=> {
//   if (e.keyCode === 68){
//     socket.emit('keyPress', { inputId: 'right', state: false})
//   }
// })
//
// socket.on('newPositions', (data) => {
//   ctx.clearRect(0, 0, 500, 500);
//   for (let i = 0; i < data.length; i++){
//     console.log(data[i]);
//     ctx.fillText(data[i].number, data[i].x, data[i].y);
//   }
// });





// // const Game = require('./game');
//
// import highlightCurrentWord from './highlightText';
//
// const textDiv = document.getElementById('text');
// const modal = document.getElementById('modal');
//
// let cursorPos = 0;
// let numWrong = 0;
// let numCorrect = 0;
// let wordsArray = textDiv.textContent.split(' ')
// let laterString = "";
// let typedWord = "";
// let intervalId;
// // let wpm = new analyzeWPM;
//
// const input = document.getElementById('user-typing');
// input.addEventListener('keydown', e => {
//
//   const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
//   let lastWord = typedWord.split(" ")[cursorPos];
//   let sentenceLength = input.innerHTML.length;
//   // wpm.display(time.timer, input.textContent);
//
//   if (e.keyCode === 32) { // space
//     highlightCurrentWord(cursorPos + 1, wordsArray);
//     input.innerHTML = input.innerHTML.slice(0, sentenceLength - lastWord.length)
//     typedWord += " "; // add space
//     if (wordsArray[cursorPos] === lastWord){
//       numCorrect++;
//       input.innerHTML += `<font color="gray">${lastWord}</font>`;
//     } else {
//       numWrong++;
//       input.innerHTML += `<font color="red">${lastWord}</font>`;
//     }
//     moveCursor(input);
//     cursorPos++;
//     document.execCommand('forecolor', false, '000000');
//
//   } else if (e.keyCode === 8){ // backspace
//     let lastChar = typedWord[typedWord.length - 1];
//     let typedSentence = typedWord.split(' '); //input.textContent.trim().split(" ");
//     let wordCount = typedSentence.length;
//     if (lastChar === " " && typedSentence[wordCount - 2] === wordsArray[cursorPos - 1]){
//       numCorrect--;
//       cursorPos--;
//       typedWord = typedWord.slice(0, typedWord.length - 1);
//     } else if (lastChar === " " && typedSentence[wordCount - 2] !== wordsArray[cursorPos - 1]) {
//       numWrong--;
//       cursorPos--;
//       typedWord = typedWord.slice(0, typedWord.length - 1);
//     } else if (lastChar === " "){
//       cursorPos--;
//       typedWord = typedWord.slice(0, typedWord.length - 1);
//     } else {
//       typedWord = typedWord.slice(0, typedWord.length - 1);
//     }
//     highlightCurrentWord(cursorPos, wordsArray);
// // missing some sort of input.innerHTML slice method to account for bug
//   } else if (alphabet.includes(e.key.toLowerCase())){
//     typedWord += e.key;
//   } else {
//     e.preventDefault();
//   }
//   // game.gameOver();
// });
//
// // const highlightingWords = (word, correctWord) => {
// //   // let text = input.innerHTML.split(' ');
// //   // let textContent = text.splice(0, text.length - 1).join(' ');
// //   // debugger;
// //   // input.value = "";
// //   // input.textContent = input.textContent.replace(word, "");
// //   // input.innerHTML = "";
// //   let highlight;
// //   if (word === correctWord){
// //     highlight = word;
// //   } else {
// //     // highlight = document.createElement('span');
// //     // highlight.textContent = word + " ";
// //     // highlight.className = 'incorrect-highlight';
// //     highlight = `<i>${word}</i>`;
// //   }
// //   return highlight;
// // }
//
//
//
// // input.addEventListener('focus', e => {
// //   if (laterString === "") {
// //     laterString = pText.innerHTML.slice(cursorPos, numLetters);
// //     initializeGame();
// //   }
// //   pText.innerHTML = pText.innerHTML.replace(laterString, "");
// //   const span = document.createElement('span');
// //   span.innerHTML = laterString[0];
// //   span.className = "highlight";
// //   pText.appendChild(span);
// //   let stringToAppend = laterString.replace(laterString[0], ""); ;
// //   pText.appendChild(document.createTextNode(stringToAppend));
// // })
