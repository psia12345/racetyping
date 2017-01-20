const randomWords = require('../../node_modules/random-words');
const Timer = require('./timer');
const WordCalculation = require('./wordCalculation');
const Typing = require('./typingLogic');

class Game{
  constructor(maxTime){
    this.intervalId = null;
    this.wordsArray = [];
    this.players = [];
    this.time = new Timer(maxTime, this);
    this.wpm = new WordCalculation;
    this.typing;
  }
  initializeGame(numWords, ...players){
    const inputDiv = document.getElementById('user-typing');
    const racetrack = document.getElementById('racetrack');
    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');
    const WIDTH = window.innerWidth;

    this.typing = new Typing(this, this.wpm);
    this.players = players;
    this.players.forEach( player => player.assignCar() )

    inputDiv.contentEditable = true;
    inputDiv.focus();
    this.generateWords(numWords);
    this.typing.highlightCurrentWord(0, this.wordsArray);


    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
    ctx.drawImage(redcar, 10, 50, 110, 65);
    ctx.drawImage(greencar, 10, 200, 110, 65);
  }
  startCountingTime(){

    this.time.decrementSeconds(this);
    this.wpm.calculateWPM(this.time, this.typing.typedWord);
    // console.log('game', this);
    this.wpm.display(this.time, this.typing.typedWord);

    this.intervalId = setInterval(this.time.decrementSeconds.bind(this.time), 1000);
  }
  gameOver(time, numWrong){
    time = time || this.time.timer
    const inputDiv = document.getElementById('user-typing');
    const typedWord = inputDiv.textContent;
    inputDiv.contentEditable = false;
    window.clearInterval(this.intervalId);
    inputDiv.blur();
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    this.wpm.displayResults(this.time, this.typing.typedWord, this.typing.numWrong);
  }
  // continueGame(){
  //   const ctx = document.getElementById('canvas').getContext('2d');
  //   const WIDTH = window.innerWidth;
  //   let player1 = this.players[0];
  //   let player2 = this.players[1];
  //   ctx.clearRect(0, 0, WIDTH, 350);
  //   player1.car.drawRaceTrack();
  //   let x;
  //   let forward = this.typing.typingForward;
  //   let backward = this.typing.typingBackward;
  //   this.players.forEach( player => {
  //     x = player.updatePosition(this.wpm.currentWPM, forward, backward)
  //   })
  //   player1.car.drawCar(x);
  //   player2.car.drawCar(x);
  // }
  generateWords(numWords){
    const textDiv = document.getElementById('text');
    let words = randomWords(numWords).join(' ');
    this.wordsArray = this.wordsArray.concat(words.split(' '));
    textDiv.innerHTML += `${words} `;
  }
  handleClick(e){
    if (e.target.id === 'end-game' || e.target.id=== 'game-controller'){
      this.gameOver(this.time);
    } else if (e.target.id === 'play-again'){
      //new game
    } else if (e.target.id === 'return-main'){
      // return to splash page
    }
  }

}
module.exports = Game;
