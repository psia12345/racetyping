import Timer from './timer';
import highlightCurrentWord from './highlightText';
import randomWords from 'random-words';
import moveCursor from './moveCursor';
import calculateWPM from './calculateWPM';

const pText = document.getElementById('text');
let words = randomWords(5).join(' ');
pText.textContent = words;
const modal = document.getElementById('modal');

let cursorPos = 0;
let numWrong = 0;
let numCorrect = 0;
let wordsArray = words.split(" ");
let time = new Timer(0);
let laterString = "";
let typedWord = "";
let intervalId;

const initializeGame = () => {
  time.timer++;
  time.displayTimer();
  console.log(calculateWPM(time.timer));
  intervalId = window.setInterval(incrementSeconds, 1000);
}

const incrementSeconds = () => {
  let seconds = time.timer++;
  time.displayTimer();
  console.log(input.textContent);
  console.log(calculateWPM(seconds));
};

const gameOver = cursorPos => {
  if (cursorPos === wordsArray.length){
    window.clearInterval(intervalId);
    modal.style.display = 'block';
    console.log(input.textContent);
    // console.log(calculateWPM(seconds));
  }
}

const input = document.getElementById('user-typing');
input.addEventListener('keydown', e => {
  if (time.timer === 0) {
    initializeGame();
    highlightCurrentWord(cursorPos, wordsArray);
  } // starts timer if it's hasn't started already

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
  let lastWord = typedWord.split(" ")[cursorPos];
  let sentenceLength = input.innerHTML.length;

  if (e.keyCode === 32) { // space
    highlightCurrentWord(cursorPos + 1, wordsArray);
    input.innerHTML = input.innerHTML.slice(0, sentenceLength - lastWord.length)
    typedWord += " "; // add space
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
    let lastChar = typedWord[typedWord.length - 1];
    let typedSentence = typedWord.split(' '); //input.textContent.trim().split(" ");
    let wordCount = typedSentence.length;
    if (lastChar === " " && typedSentence[wordCount - 2] === wordsArray[cursorPos - 1]){
      numCorrect--;
      cursorPos--;
      typedWord = typedWord.slice(0, typedWord.length - 1);
    } else if (lastChar === " " && typedSentence[wordCount - 2] !== wordsArray[cursorPos - 1]) {
      numWrong--;
      cursorPos--;
      typedWord = typedWord.slice(0, typedWord.length - 1);
    } else if (lastChar === " "){
      cursorPos--;
      typedWord = typedWord.slice(0, typedWord.length - 1);
    } else {
      typedWord = typedWord.slice(0, typedWord.length - 1);
    }
    highlightCurrentWord(cursorPos, wordsArray);
// missing some sort of input.innerHTML slice method to account for bug
  } else if (alphabet.includes(e.key.toLowerCase())){
    typedWord += e.key;
  } else {
    e.preventDefault();
  }
  gameOver(cursorPos);
});

// const highlightingWords = (word, correctWord) => {
//   // let text = input.innerHTML.split(' ');
//   // let textContent = text.splice(0, text.length - 1).join(' ');
//   // debugger;
//   // input.value = "";
//   // input.textContent = input.textContent.replace(word, "");
//   // input.innerHTML = "";
//   let highlight;
//   if (word === correctWord){
//     highlight = word;
//   } else {
//     // highlight = document.createElement('span');
//     // highlight.textContent = word + " ";
//     // highlight.className = 'incorrect-highlight';
//     highlight = `<i>${word}</i>`;
//   }
//   return highlight;
// }


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
