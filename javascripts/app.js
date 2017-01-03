import generateText from './generateText';
import Timer from './timer';
// import rangy from './typingText';

const pText = document.getElementById('text');
let words = generateText();
pText.textContent = words;

let cursorPos = 0;
let numWrong = 0;
let numCorrect = 0;
let wordsArray = words.split(" ");
let numWords = wordsArray.length;
let time = new Timer(0);
let laterString = "";
let typedWord = "";

const initializeGame = () => {
  time.displayTimer();
  startButton.innerHTML = 'Pause';
  let buttonClass = startButton.className;
  if (buttonClass === 'pause' ) {
    clearInterval(incrementTime);
    time.pauseTime();
  } else {
    incrementTime = window.setInterval(incrementSeconds, 1000);
  }
}

const highlightCurrentWord = (position) => {
  laterString = wordsArray.slice(position + 1, wordsArray.length).join(" ");
  const currentWord = document.createElement('span');
  currentWord.textContent = wordsArray[position] + " ";

  const highlightedElement = document.getElementsByClassName("highlight")[0];
  if (highlightedElement){
    highlightedElement.nextSibling.textContent = "";
    pText.removeChild(highlightedElement);
  } else {
    pText.textContent = "";
  }
  currentWord.className = 'highlight';
  pText.appendChild(currentWord);
  pText.appendChild(document.createTextNode(laterString));
}

const input = document.getElementById('user-typing');
input.addEventListener('keydown', e => {
  let lastWord = typedWord.split(" ")[cursorPos];

  if (e.keyCode === 32) { // space
    typedWord += " "; // add space
    highlightCurrentWord(cursorPos + 1);
    input.innerHTML = input.innerHTML.replace(lastWord, '');
    if (wordsArray[cursorPos] === lastWord){
      numCorrect++;
      input.innerHTML += `<font color="gray">${lastWord}</font>`;
    } else {
      numWrong++;
      input.innerHTML += `<font color="red">${lastWord}</font>`;
    }
    moveCursor(input);
    cursorPos++;
    document.execCommand('forecolor', false, '000000');

  } else if (e.keyCode === 8){ // backspace
    // console.log('backspace');
    // let lastChar = typedWord[typedWord.length - 1]; //input.textContent[input.textContent.length - 1]
    // let typedSentence = typedWord; //input.textContent.trim().split(" ");
    // let wordCount = typedSentence.length;
    // if (lastChar === " " && typedSentence[wordCount - 1] === wordsArray[cursorPos - 1]){
    //   numCorrect--;
    //   cursorPos--;
    // } else if (lastChar === " " && typedSentence[wordCount - 1] !== wordsArray[cursorPos - 1]) {
    //   numWrong--;
    //   cursorPos--;
    // } else if (lastChar === " "){
    //   cursorPos--;
    // }
    // typedWord = typedWord.replace(lastChar, "");
    // console.log("backspace", numCorrect);
    // console.log(numWrong);
    // console.log("position", cursorPos);
  } else if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 13) {
    // moving arrow key
  } else {
    typedWord += e.key;
    // debugger;
    // input.textContent = "";
    // let currentInput = document.createElement('span');
    // // debugger;
    // currentInput.textContent = typedWord;
    // input.appendChild(currentInput);
    // moveCursor(input);
  }

  // const currentLetter = document.createElement('span');
  // currentLetter.innerHTML = laterString[0];
  // const nextLetter = document.createElement('span');
  // nextLetter.innerHTML = laterString[1];
  // let highlightedElement = document.getElementsByClassName("highlight")[0];
  // if (highlightedElement){
  //   highlightedElement.nextSibling.textContent = "";
  //   pText.removeChild(highlightedElement);
  // } else {
  //   pText.textContent = "";
  // }
  // nextLetter.className = "highlight";
  // // if (cursorPos > 10 && cursorPos < numLetters){
  // //
  // // }
  // if (cursorPos < numLetters && laterString[0] === e.key){
  //   currentLetter.className = "correct-highlight";
  // } else {
  //   currentLetter.className = "incorrect-highlight";
  // }
  // pText.appendChild(currentLetter);
  // pText.appendChild(nextLetter);
  // laterString = laterString.replace(laterString[0], "");
  // let stringToAppend = laterString.replace(laterString[0], "");
  // pText.appendChild(document.createTextNode(stringToAppend));
  // cursorPos++;
});

const highlightingWords = (word, correctWord) => {
  // let text = input.innerHTML.split(' ');
  // let textContent = text.splice(0, text.length - 1).join(' ');
  // debugger;
  // input.value = "";
  // input.textContent = input.textContent.replace(word, "");
  // input.innerHTML = "";
  let highlight;
  if (word === correctWord){
    highlight = word;
  } else {
    // highlight = document.createElement('span');
    // highlight.textContent = word + " ";
    // highlight.className = 'incorrect-highlight';
    highlight = `<i>${word}</i>`;
  }
  return highlight;
}
const moveCursor = (el) => {
  // debugger;
  el.focus();
  if (typeof window.getSelection != "undefined"
          && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
  }
}

// input.addEventListener('focus', e => {
//   if (laterString === "") {
//     laterString = pText.innerHTML.slice(cursorPos, numLetters);
//     initializeGame();
//   }
//   pText.innerHTML = pText.innerHTML.replace(laterString, "");
//   const span = document.createElement('span');
//   span.innerHTML = laterString[0];
//   span.className = "highlight";
//   pText.appendChild(span);
//   let stringToAppend = laterString.replace(laterString[0], ""); ;
//   pText.appendChild(document.createTextNode(stringToAppend));
// })

// input.addEventListener("keydown", e => {if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39) return false}, false);
//backspace 8

const startButton = document.getElementById('start');
let incrementTime;
startButton.addEventListener('click', e => {
  initializeGame();
  input.focus();
});

const incrementSeconds = () => {
  startButton.innerHTML = 'Pause';
  startButton.className = 'pause';
  let seconds = time.timer++;
  time.displayTimer();
};
