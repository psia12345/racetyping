class analyzeWPM {
  calculateWPM(time, text) {
    const span = document.createElement('span');
    span.textContent = Math.floor(text.length / 5 / time * 60);
    span.className = 'number';
    return span;
  }
  adjustedWPM(time, text, wrong){
    const span = document.createElement('span');
    let wpm = text.length / 5 ;
    wpm = Math.floor((wpm - wrong) / time * 60 );
    span.textContent = wpm;
    span.className = 'number';
    return span;
  }
  // accuracy(wrong, correct){
  //   debugger;
  //   const span = document.createElement('span');
  //   let total = correct + wrong;
  //   span.textContent = Math.floor((correct - wrong) / total * 100) + " %";
  //   span.className = 'number';
  //   return span;
  // }
  charInMin(time, text){
    const span = document.createElement('span');
    span.textContent = Math.floor( text.length / time * 60);
    span.className = 'number';
    return span;
  }
  display(time, text){
    const wpmDiv = document.getElementById('wpm');
    let span = document.getElementsByClassName('number')[0];
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
module.exports = analyzeWPM;
