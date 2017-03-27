class WordCalculation {
  constructor(){
    this.currentWPM = 0;
  }
  calculateWPM(charCount, timeLeft, maxTime) { // time object
    //raw WPM = (charCount / 5) / time
    let timeSpent = (maxTime - timeLeft) / 60;
    this.currentWPM = Math.floor( (charCount / 5) / timeSpent);
  }
  adjustedWPM(right, wordCount, maxTime){ // time object
    let wrong = wordCount - right;
    let adjusted = Math.floor(this.currentWPM - ( wrong / maxTime / 60));
    return adjusted <= 0 ? 0 : adjusted
  }
  accuracy(right, wordCount){
    let wrong  = wordCount - right;
    return Math.floor( (right / (wrong + right)) * 100);
  }
  displayWPM(){
    const wpmDiv = document.getElementById('wpm');
    let span = document.getElementsByClassName('wpm')[1];
    wpmDiv.removeChild(span);
    wpmDiv.appendChild(this.createSpan(this.currentWPM, 'wpm'));
  }
  displayResults(right, wordCount, maxTime){
    const resultDivs = document.getElementsByClassName('result');
    let adjusted = this.adjustedWPM(right, wordCount, maxTime);
    let accuracy = this.accuracy(right, wordCount);
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
