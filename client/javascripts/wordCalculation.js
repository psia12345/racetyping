class WordCalculation {
  constructor(){
    this.currentWPM = 0;
    this.totalTime = 0;
  }
  calculateWPM(time, right) { // time object
    this.totalTime = time.initialTime;
    let currentTimeLeft = this.totalTime - time.timer;
    this.currentWPM = Math.floor(right / currentTimeLeft * 60);
  }
  adjustedWPM(right, wrong){ // time object
    let adjusted = this.currentWPM - (wrong / this.totalTime * 60);
    return adjusted <= 0 ? 0 : adjusted
  }
  accuracy(right, wrong){
    return Math.floor((right) / (wrong + right) * 100);
  }
  displayWPM(){
    const wpmDiv = document.getElementById('wpm');
    let span = document.getElementsByClassName('wpm')[1];
    wpmDiv.removeChild(span);
    wpmDiv.appendChild(this.createSpan(this.currentWPM, 'wpm'));
  }
  displayResults(time, text, right, wrong, actualText){
    const resultDivs = document.getElementsByClassName('result');
    let adjusted = this.adjustedWPM(right, wrong);
    let accuracy = this.accuracy(right, wrong);
    resultDivs[0].appendChild(this.createSpan(this.currentWPM, 'WPM'));
    resultDivs[1].appendChild(this.createSpan(adjusted, 'WPM'));
    resultDivs[2].appendChild(this.createSpan(accuracy, '%'));
  }
  createSpan(num, unit){
    const span = document.createElement('span');
    span.textContent = `${num} ${unit}`;
    span.className = 'wpm';
    return span;
  }
}
module.exports = WordCalculation;
