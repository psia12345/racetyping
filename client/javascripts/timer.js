class Timer{
  constructor(time, game){
    this.timer = time;
    this.initialTime = time;
    this.width = 100;
    this.game = game;
  }
  displayTimer(){
    const bar = document.getElementById('bar');
    bar.style.width = this.width + '%';
  }
  decrementSeconds(game, numWrong){
    const decrementFactor = (100 / this.initialTime);
    this.timer--;
    this.width-= decrementFactor;
    if (this.width <= 0){ this.width = 0}
    this.displayTimer();
    if (this.timer === 0){
      this.game.gameOver(this.timer, game.typing.numWrong);
    }
  }
}
module.exports = Timer;
