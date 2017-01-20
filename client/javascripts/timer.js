class Timer{
  constructor(maxTime, game){
    this.timer = maxTime;
    this.initialTime = maxTime;
    this.width = 100;
    this.game = game;
  }
  displayTimer(){
    const bar = document.getElementById('bar');
    bar.style.width = this.width + '%';
  }
  decrementSeconds(){
    const decrementFactor = (100 / this.initialTime);
    this.timer--;
    this.width-= decrementFactor;
    if (this.width <= 0){ this.width = 0}
    this.displayTimer();
    this.game.wpm.calculateWPM(this, this.game.typing.typedWord)


    if (this.timer === 0){
      this.game.gameOver(this.timer, this.game.typing.numWrong);
    }
  }
}
module.exports = Timer;
