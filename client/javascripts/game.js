const Timer = require('./timer');
const randomWords = require('../../node_modules/random-words');
const Typing = require('./typingLogic');
const WordCalculation = require('./wordCalculation');


class Game{
  constructor(time, ctx){
    this.intervalId = null;
    this.wordsArray = [];
    this.ctx = ctx;
    this.wpm = new WordCalculation;
    this.time = new Timer(time, this);
    this.typing = new Typing(this, this.ctx, this.wpm);
    this.players = [];

    document.addEventListener('click', this.handleClick.bind(this))
  }
  initializeGame(words, ...players){
    // debugger;
    this.players = players;
    const inputDiv = document.getElementById('user-typing');
    const racetrack = document.getElementById('racetrack');
    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');
    const WIDTH = window.innerWidth;

    this.players.forEach(player => { debugger;
      player.drawCar();
    })

    inputDiv.contentEditable = true;
    inputDiv.focus();
    this.generateWords(words);
    this.ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
    this.ctx.drawImage(redcar, 10, 50, 110, 65);
    this.ctx.drawImage(greencar, 10, 200, 110, 65);
    this.typing.highlightCurrentWord(0, this.wordsArray);
  }
  startCountingTime(){
    this.time.decrementSeconds(this, this.typing.numWrong);
    this.intervalId = setInterval(this.time.decrementSeconds.bind(this.time, this), 1000);
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
    // }else{
    //   this.generateWords(1);
    //   return false;
    // }
  }
  generateWords(n){
    let words = randomWords(n).join(' ');
    this.wordsArray = this.wordsArray.concat(words.split(' '));
    const textDiv = document.getElementById('text');
    textDiv.innerHTML += `${words} `;
  }
  assignCars(){
    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');


  }
  moveCars(redPos, redVel, greenPos, greenVel){
    const WIDTH = window.innerWidth;
    // debugger;
    this.players[0].car.drawRaceTrack();
    this.players[0].car.moveCarForward(this.wpm);


    // let player2 = this.players[1];


    // if (player1.)
    // this.ctx.clearRect(0, 0, WIDTH, 350);
    // this.ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
    // this.ctx.drawImage(redcar, player1.car.x, 50, player1.car.spd, 65);
    // // player1.car.x += player1.car.spd;
    // // debugger;
    // this.ctx.drawImage(greencar, greenPos, 200, 110, 65);
    // greenPos += greenVel;
    // this.animationId = requestAnimationFrame(() => {
    //   console.log(player1.car.x);
    //   this.moveCars(player1.car.x, player1.car.spd, greenPos, greenVel);
    // })
  }
  handleClick(e){
    console.log(e.target);
    if (e.target.id === 'end-game' || e.target.id=== 'game-controller'){
      this.gameOver(this.time, this.typing.numWrong);
    } else if (e.target.id === 'play-again'){
      //new game
    } else if (e.target.id === 'return-main'){
      // return to splash page
    }
  }

}
module.exports = Game;
