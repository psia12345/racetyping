class WordCalculation {
  calculateWPM(time, text) { // time object
    const span = document.createElement('span');
    const currentTimeLeft = time.timer;
    const totalTime = time.initialTime;
    span.textContent = Math.floor((text.length / 5) / (totalTime - currentTimeLeft) * 60) + " wpm";
    span.className = 'wpm';
    return span;
  }
  adjustedWPM(time, text, wrong){ // time object
    const span = document.createElement('span');
    const totalTime = time.initialTime;
    let wpm = (text.length / 5) ;
    wpm = Math.floor((wpm - wrong) / totalTime * 60 );
    if ( wpm <= 0 ) wpm = 0
    span.textContent = wpm + " wpm";
    span.className = 'wpm';
    return span;
  }
  accuracy(wrong, correct){
    // number of correct charcters typed / total number of charcters (should still have accuracy < 100 % if there are any corrected mistake)
    // const span = document.createElement('span');
    // const total = correct + wrong;
    // span.textContent = Math.floor((correct - wrong) / total * 100) + " %";
    // span.className = 'wpm';
    // return span;
  }
  charInMin(time, text){
    const span = document.createElement('span');
    const timePassed = time.initialTime - time.timer;
    span.textContent = Math.floor( text.length / timePassed * 60) + " characters";
    span.className = 'wpm';
    return span;
  }
  display(time, text){
    const wpmDiv = document.getElementById('wpm');
    let span = document.getElementsByClassName('wpm')[1];
    if (typeof span !== 'undefined' ) wpmDiv.removeChild(span);
    wpmDiv.appendChild(this.calculateWPM(time, text));
  }
  displayResults(time, text, wrong, actualText){
    const resultDivs = document.getElementsByClassName('result');
    resultDivs[0].appendChild(this.calculateWPM(time, text));
    resultDivs[1].appendChild(this.adjustedWPM(time, text, wrong));
    resultDivs[2].appendChild(this.charInMin(time, text));
    // resultDivs[2].appendChild(this.accuracy(typedtext, actualText));
  }
}
module.exports = WordCalculation;
