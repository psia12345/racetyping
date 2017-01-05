const Timer = require('./timer');

class Game{
  constructor(time, wordsArray){
    this.time = new Timer(time);
    this.intervalId = null;
    this.wordsArray = wordsArray;
  }
  initializeGame(){
    this.time.incrementSeconds();
    this.intervalId = setInterval(this.time.incrementSeconds.bind(this.time), 1000);
  }
  gameOver(position){
    if (this.time.timer >= 5){
      console.log(this.time.timer)
      window.clearInterval(this.intervalId);
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
    }
  }
}
module.exports = Game;
