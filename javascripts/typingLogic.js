import highlightCurrentWord from './highlightText';
import moveCursor from './moveCursor';

class Typing{
  constructor(game){
    this.typedWord = "";
    this.cursorPos = 0;
    this.wordsArray = game.wordsArray;
    this.numCorrect = 0;
    this.numWrong = 0;
    this.game = game;

    document.addEventListener('keydown', this.handleKeyEvent.bind(this));
  }
  handleKeyEvent(e){
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    const input = document.getElementById('user-typing');
    let lastWord = this.typedWord.split(" ")[this.cursorPos];
    let sentenceLength = input.innerHTML.length;
    // console.log("before space", input.innerHTML)
    if (e.keyCode === 32) { // space
      highlightCurrentWord(this.cursorPos + 1, this.wordsArray);
      input.innerHTML = input.innerHTML.slice(0, sentenceLength - lastWord.length)
      this.typedWord += " "; // add space
      // console.log("before replacing", input.innerHTML)
      let elToRemove = input.innerHTML.match(/\<font color="#808080"\>\w+\<\/font\>/g)
      if (elToRemove){ elToRemove = elToRemove[0] }
      input.innerHTML = input.innerHTML.replace(elToRemove, "");
      console.log(input.innerHTML)
      if (this.wordsArray[this.cursorPos] === lastWord){
        this.numCorrect++;
        console.log("after adding correct", input.innerHTML)
        input.innerHTML += `<font color="gray">${lastWord}</font>`;
      } else {
        this.numWrong++;
        input.innerHTML += `<font color="red">${lastWord}</font>`;
        console.log("after adding incorrect", input.innerHTML)
      }
      moveCursor(input);
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
      console.log("backspace", input.innerHTML)
      highlightCurrentWord(this.cursorPos, this.wordsArray);
  // missing some sort of input.innerHTML slice method to account for bug
    } else if (alphabet.includes(e.key.toLowerCase())){
      this.typedWord += e.key;
    } else {
      e.preventDefault();
    }
  }

}
module.exports = Typing;
