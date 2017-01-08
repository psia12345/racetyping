const Timer = require('./timer');
import randomWords from 'random-words';

class Game{
  constructor(time, ctx, wpm){
    this.time = new Timer(time);
    this.intervalId = null;
    this.wordsArray = [];
    this.ctx = ctx;
    this.wpm = wpm;
    // this.typingLogic =
  }
  initializeGame(words){
    this.time.decrementSeconds();
    this.generateWords(words);
    this.intervalId = setInterval(this.time.decrementSeconds.bind(this.time), 1000);
    const racetrack = document.getElementById('racetrack');
    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');
    const WIDTH = window.innerWidth;
    this.ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
    this.ctx.drawImage(redcar, 10, 50, 110, 65)
    this.ctx.drawImage(greencar, 10, 200, 110, 65)
  }
  gameOver(time, numWrong){
    time = time || this.time.timer
    const inputDiv = document.getElementById('user-typing');
    const typedWord = inputDiv.textContent;
    if (time <= 0){
      window.clearInterval(this.intervalId);
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
      this.wpm.displayResults(this.time, typedWord, numWrong);
      inputDiv.blur();
    }else{
      this.generateWords(1);
    }
  }
  generateWords(n){
    let words = randomWords(n).join(' ');
    this.wordsArray = this.wordsArray.concat(words.split(' '));
    const textDiv = document.getElementById('text');
    textDiv.textContent += `${words} `;
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
