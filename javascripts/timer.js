class Timer{
  constructor(time){
    this.timer = time;
    this.initialTime = time;
    this.width = 100;
  }
  displayTimer(){
    const bar = document.getElementById('bar');
    bar.style.width = this.width + '%';
  }
  decrementSeconds(){
    const decrementFactor = Math.floor(100/ this.initialTime);
    this.timer--;
    this.width-= decrementFactor;
    this.displayTimer();
  }
}
module.exports = Timer;
