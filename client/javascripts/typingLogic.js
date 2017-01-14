const moveCursor = require('./moveCursor');

class Typing{
  constructor(game, wpm){
    this.typedWord = "";
    this.cursorPos = 0;
    this.wordsArray = [];
    this.numCorrect = 0;
    this.numWrong = 0;
    this.game = game;
    this.wpm = wpm;
    this.animationId = null;
    this.noInput = true;

    const inputDiv = document.getElementById('user-typing');
    inputDiv.addEventListener('keydown', this.handleKeyEvent.bind(this));
  }
  handleKeyEvent(e){
    if (this.noInput){
      this.game.startCountingTime();
    }
    this.noInput = false;
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    const inputDiv = document.getElementById('user-typing');
    let lastWord = this.typedWord.split(" ")[this.cursorPos];
    let sentenceLength = inputDiv.innerHTML.length;
    // this.wordsArray = this.game.wordsArray;
    // console.log("before space", input.innerHTML)
    if (e.keyCode === 32) { // space
      this.highlightCurrentWord(this.cursorPos + 1);
      inputDiv.innerHTML = inputDiv.innerHTML.slice(0, sentenceLength - lastWord.length)
      this.typedWord += " "; // add space
      // console.log("before replacing", input.innerHTML)
      let elToRemove = inputDiv.innerHTML.match(/\<font color="#808080"\>\w+\<\/font\>/g)
      if (elToRemove){ elToRemove = elToRemove[0] }
      inputDiv.innerHTML = inputDiv.innerHTML.replace(elToRemove, "");
      // console.log(input.innerHTML)
      if (this.wordsArray[this.cursorPos] === lastWord){
        this.numCorrect++;
        inputDiv.innerHTML += `<font color="gray">${lastWord}</font>`;
      } else {
        this.numWrong++;
        inputDiv.innerHTML += `<font color="red">${lastWord}</font>`;
        // console.log("after adding incorrect", input.innerHTML)
      }
      moveCursor(inputDiv);
      this.cursorPos++;
      document.execCommand('forecolor', false, '000000');
    } else if (e.keyCode === 8){ // backspace
      let lastChar = this.typedWord[this.typedWord.length - 1];
      let typedSentence = this.typedWord.split(' '); //input.textContent.trim().split(" ");
      let wordCount = typedSentence.length;
        if (lastChar === " " && typedSentence[wordCount - 2] === this.wordsArray[this.cursorPos - 1]){
          this.numCorrect--;
          this.cursorPos--;
          this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
        } else if (lastChar === " " && typedSentence[wordCount - 2] !== this.wordsArray[this.cursorPos - 1]) {
          this.numWrong--;
          this.cursorPos--;
          this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
        } else if (lastChar === " "){
          this.cursorPos--;
          this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
        } else {
          this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
        }
      console.log("backspace", inputDiv.innerHTML)
      this.highlightCurrentWord(this.cursorPos);
  // missing some sort of input.innerHTML slice method to account for bug
    } else if (alphabet.includes(e.key.toLowerCase())){
      this.typedWord += e.key;
    } else {
      e.preventDefault();
    }

    // this.wpm.display(this.time, this.typedWord);
    // let x = this
    // requestAnimationFrame(function(x){
    //   console.log(x);
    //   x.moveCars(0, 1200/300, 0, 1);
    // })
    // this.game.gameOver(this.time.timer, this.numWrong);

  }
  highlightCurrentWord(position, wordsArray){
    const textDiv = document.getElementById('text');
    this.wordsArray = wordsArray || this.wordsArray;
    let laterString = this.wordsArray.slice(position + 1, this.wordsArray.length).join(" ");
    const currentWord = document.createElement('span');

    if (typeof this.wordsArray[position] !== 'undefined') {
      currentWord.textContent = this.wordsArray[position] + " ";
    } else {
      currentWord.textContent = "";
    }
    const highlightedElement = document.getElementsByClassName("highlight")[0];

    if (highlightedElement){
      highlightedElement.nextSibling.textContent = "";
      textDiv.removeChild(highlightedElement);
    } else {
      textDiv.textContent = "";
    }
    currentWord.className = 'highlight';
    textDiv.appendChild(currentWord);
    textDiv.appendChild(document.createTextNode(laterString));
  }
}
module.exports = Typing;
