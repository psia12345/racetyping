class Timer{
  constructor(time){
    this.timer = time;
  }
  displayTimer(){
    const timerDiv = document.getElementById('timer');
    const timerSpan = document.createElement('span');
    timerSpan.className = 'timer';
    timerSpan.innerHTML = this.timer;
    let previousTimer = document.getElementsByClassName('timer')[0];
    if ( previousTimer ) timerDiv.removeChild(previousTimer);
    timerDiv.appendChild(timerSpan);
  }
  decrementSeconds(){
    // console.log(this.timer);
    this.timer--;
    this.displayTimer();
  }
}
module.exports = Timer;
