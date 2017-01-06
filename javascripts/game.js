const Timer = require('./timer');
import randomWords from 'random-words';

class Game{
  constructor(time){
    this.time = new Timer(time);
    this.intervalId = null;
    this.wordsArray = [];
  }
  initializeGame(words){
    this.time.decrementSeconds();
    this.generateWords(words);
    this.intervalId = setInterval(this.time.decrementSeconds.bind(this.time), 1000);
  }
  gameOver(time){
    time = time || this.time.timer
    if (time === 0){
      window.clearInterval(this.intervalId);
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
    }
  }
  generateWords(n){
    let words = randomWords(n).join(' ');
    this.wordsArray = this.wordsArray.concat(words.split(' '));
    const textDiv = document.getElementById('text');
    textDiv.textContent += words;
  }
}
module.exports = Game;
