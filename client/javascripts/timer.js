const bar = document.getElementById('bar');
class Timer{
  constructor(maxTime, game){
    this.maxTime = maxTime;
    this.timeLeft = maxTime;
    this.width = 100; //timer starts at 100%
    this.game = game;
  }
  displayTimer(){
    bar.style.width = this.width + '%';
  }
  decrementSeconds(){
    const decrementFactor = (100 / this.maxTime);
    this.timeLeft--;
    this.width-= decrementFactor;

    if (this.width <= 0){ this.width = 0 }
    this.displayTimer();
    this.game.wpm.calculateWPM(this, this.game.typing.numCorrect)
    this.game.wpm.displayWPM();

    if (this.timer === 0){
      this.game.gameOver(this.timer, this.game.typing.numWrong);
    }
  }
}
module.exports = Timer;
