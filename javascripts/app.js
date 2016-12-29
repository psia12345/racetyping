import generateText from './generateText';
import moveCursor from './typingLogic';
//
// const divCanvasContainer = document.getElementById('canvas-container');
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const WIDTH = Math.max(window.innerWidth * 0.8 || 0);
// const HEIGHT = Math.max(window.innerHeight * 0.8 || 0);

const pText = document.getElementById('text');
let words = generateText();
pText.textContent = words;
console.log(words);

let cursorPos = 0;
let numLetters = words.length;
let numWrong = 0;
let numCorrect = 0;
const timer = 0;
let laterString = "";

const input = document.getElementById('user-typing');
input.addEventListener('keypress', e =>{
  if (laterString === ""){
    laterString = pText.innerHTML.slice(cursorPos, numLetters);
  }
  const span = document.createElement('span');
  span.innerHTML = laterString[0];
  if (cursorPos < numLetters && laterString[0] === e.key){
    pText.innerHTML = pText.innerHTML.replace(laterString, "");
    span.className = "correct-highlight";
    pText.appendChild(span);
  } else {
    pText.innerHTML = pText.innerHTML.replace(laterString, "");
    span.className = "incorrect-highlight";
    pText.appendChild(span);
  }
  cursorPos++;
  laterString = laterString.replace(laterString[0], "");
  pText.appendChild(document.createTextNode(laterString));
});

const startButton = document.getElementById('start');
startButton.addEventListener('click', e => console.log(e));
