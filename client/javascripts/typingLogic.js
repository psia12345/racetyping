const moveCursor = require('./moveCursor');
const inputDiv = document.getElementById('user-typing');

class Typing{
  constructor(game, wpm, wordsArray){
    // this.typedWord = "";
    this.cursorPos = 0;
    this.wordsArray = wordsArray;
    this.numCorrect = 0;
    this.numWrong = 0;
    this.game = game;
    this.currentWord = "";
    // this.wpm = wpm;
    // this.animationId = null;
    // this.noInput = true;
    this.childNodes = [];
    this.lastWord = "";

    inputDiv.addEventListener('keydown', this.handleKeyEvent.bind(this));
  }
  isCorrectWord(){
      //logic to check the word that just typed
      console.log('last', this.lastWord);
      console.log('current', this.currentWord);
  }
  displayWords(){
    this.isCorrectWord();
    this.removeWord();
    let span = document.createElement('span');
    span.textContent = `${this.lastWord} `;
    inputDiv.appendChild(span);
  }
  removeWord(){
    if (inputDiv.childElementCount < 1){
      // inputDiv.firstChild.data = "";
      inputDiv.textContent = "";
    } else {
      inputDiv.lastChild.innerText = inputDiv.lastChild.innerText.slice(0, inputDiv.lastChild.innerText.length - this.lastWord.length)
    }
  }
  handleKeyEvent(e){
    this.noInput = false;
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    // let lastWord = this.typedWord.split(" ")[this.cursorPos];
    let sentenceLength = inputDiv.innerHTML.length;

    let span = document.createElement('span');
    if (e.keyCode === 32) { // space
      this.highlightCurrentWord(this.cursorPos + 1);
      this.displayWords();
      this.lastWord = ""; // reset lastWord Typed

      moveCursor(inputDiv); // move the pointer
      this.cursorPos++;
      document.execCommand('forecolor', false, '000000');
    } else if (e.keyCode === 8){ // backspace
      // 2 scenario to delete
      //1. in the middle of a word
      //2. finished wrting the word, and going backward to modify it
      // 3. if there are no more typed input, exit

      if (inputDiv.textContent === "") return;

      if (this.lastWord.length > 0){ // backspace w/in same word
        this.lastWord = this.lastWord.slice(0, this.lastWord.length - 1); // modify the lastword tracker
      } else {
        let lastInput = inputDiv.lastChild.textContent;
        this.lastWord = lastInput.split(' ').pop();
        this.lastWord = this.lastWord.slice(0, this.lastWord.length - 1);

        // move the cursor position back
        this.cursorPos--;
        this.highlightCurrentWord(this.cursorPos);
      }
    } else if (alphabet.includes(e.key.toLowerCase())){
      this.typedWord += e.key;
      this.lastWord += e.key;
    } else {
      e.preventDefault();
    }
  }
  highlightCurrentWord(position){
    const textDiv = document.getElementById('text');
    let remainingString = this.wordsArray.slice(position + 1, this.wordsArray.length).join(" ");

    const currentWordSpan = document.createElement('span');

    if (typeof this.wordsArray[position] !== 'undefined') {
      // as long as there's a word at that position
      this.currentWord = this.wordsArray[position];
      console.log(this.currentWord);
      currentWordSpan.textContent = `${this.currentWord} `
    } else {
      currentWordSpan.textContent = "";
    }
    const highlightedElement = document.getElementsByClassName("highlight")[0];

    if (highlightedElement){
      highlightedElement.nextSibling.textContent = "";
      textDiv.removeChild(highlightedElement);
    } else {
      textDiv.textContent = "";
    }
    currentWordSpan.className = 'highlight';
    textDiv.appendChild(currentWordSpan);
    textDiv.appendChild(document.createTextNode(remainingString));
  }

}
module.exports = Typing;
