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
}
export default Timer;
