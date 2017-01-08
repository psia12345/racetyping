const Timer = require('./timer');
import randomWords from 'random-words';
const Typing = require('./typingLogic');

class Game{
  constructor(time, ctx, wpm){
    this.time = new Timer(time, this);
    this.intervalId = null;
    this.wordsArray = [];
    this.ctx = ctx;
    this.wpm = wpm;
    this.typing = new Typing(this, this.ctx, this.wpm);
  }
  initializeGame(words){
    const inputDiv = document.getElementById('user-typing');
    inputDiv.contentEditable = true;
    inputDiv.focus();
    this.generateWords(words);
    const racetrack = document.getElementById('racetrack');
    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');
    const WIDTH = window.innerWidth;
    this.ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
    this.ctx.drawImage(redcar, 10, 50, 110, 65)
    this.ctx.drawImage(greencar, 10, 200, 110, 65)
  }
  startCountingTime(){
    this.time.decrementSeconds(this, this.typing.numWrong);
    this.intervalId = setInterval(this.time.decrementSeconds.bind(this.time, this), 1000);
  }
  gameOver(time, numWrong){
    time = time || this.time.timer
    const inputDiv = document.getElementById('user-typing');
    const typedWord = inputDiv.textContent;
    if (time === 0){
      // debugger;
      inputDiv.contentEditable = false;
      window.clearInterval(this.intervalId);
      inputDiv.blur();
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
      this.wpm.displayResults(this.time, typedWord, numWrong);
    }else{
      this.generateWords(1);
      return false;
    }
  }
  generateWords(n){
    let words = randomWords(n).join(' ');
    this.wordsArray = this.wordsArray.concat(words.split(' '));
    const textDiv = document.getElementById('text');
    textDiv.innerHTML += `${words} `;
  }
  moveCars(redPos, redVel, greenPos, greenVel){
    this.ctx.clearRect(0, 0, WIDTH, 350);
    this.ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
    this.ctx.drawImage(redcar, redPos, 50, 110, 65);
    redPos += redVel;
    this.ctx.drawImage(greencar, greenPos, 200, 110, 65);
    greenPos += greenVel;
    this.animationId = requestAnimationFrame(function(){
      this.moveCars(redPos, redVel, greenPos, greenVel);
    })
  }

}
module.exports = Game;
