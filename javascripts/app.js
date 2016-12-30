import generateText from './generateText';
import Timer from './timer';

const pText = document.getElementById('text');
let words = generateText();
pText.textContent = words;

let cursorPos = 0;
let numLetters = words.length;
let numWrong = 0;
let numCorrect = 0;
let wordsArray = words.split(" ");
let numWordsTyped = 0;
let time = new Timer(0);
let laterString = "";

const input = document.getElementById('user-typing');
input.addEventListener('keypress', e =>{
  if (laterString === ""){
    laterString = pText.innerHTML.slice(cursorPos, numLetters);
  }
  const currentLetter = document.createElement('span');
  currentLetter.innerHTML = laterString[0];
  const nextLetter = document.createElement('span');
  nextLetter.innerHTML = laterString[1];
  let highlightedElement = document.getElementsByClassName("highlight")[0];
  if (highlightedElement){
    highlightedElement.nextSibling.textContent = "";
    pText.removeChild(highlightedElement);
  } else {
    pText.textContent = "";
  }
  nextLetter.className = "highlight";
  if (cursorPos > 10 && cursorPos < numLetters){

  }
  if (cursorPos < numLetters && laterString[0] === e.key){
    currentLetter.className = "correct-highlight";
  } else {
    currentLetter.className = "incorrect-highlight";
  }
  pText.appendChild(currentLetter);
  pText.appendChild(nextLetter);
  laterString = laterString.replace(laterString[0], "");
  let stringToAppend = laterString.replace(laterString[0], "");
  pText.appendChild(document.createTextNode(stringToAppend));
  cursorPos++;
});

input.addEventListener('click', e => {
  if (laterString === "") laterString = pText.innerHTML.slice(cursorPos, numLetters);
  pText.innerHTML = pText.innerHTML.replace(laterString, "");
  const span = document.createElement('span');
  span.innerHTML = laterString[0];
  span.className = "highlight";
  pText.appendChild(span);
  let stringToAppend = laterString.replace(laterString[0], ""); ;
  pText.appendChild(document.createTextNode(stringToAppend));
})

input.addEventListener("keydown", e => {if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39) return false}, false);

const startButton = document.getElementById('start');
startButton.addEventListener('click', e => {
  time.displayTimer(0);
  window.setInterval(timer, 1000);
});

const timer = () => {
  let seconds = time.timer++;
  time.displayTimer();
};
