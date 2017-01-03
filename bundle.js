/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _generateText = __webpack_require__(1);
	
	var _generateText2 = _interopRequireDefault(_generateText);
	
	var _timer = __webpack_require__(2);
	
	var _timer2 = _interopRequireDefault(_timer);
	
	var _highlightText = __webpack_require__(3);
	
	var _highlightText2 = _interopRequireDefault(_highlightText);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pText = document.getElementById('text');
	var words = (0, _generateText2.default)();
	pText.textContent = words;
	
	var cursorPos = 0;
	var numWrong = 0;
	var numCorrect = 0;
	var wordsArray = words.split(" ");
	var numWords = wordsArray.length;
	var time = new _timer2.default(0);
	var laterString = "";
	var typedWord = "";
	
	var initializeGame = function initializeGame() {
	  time.displayTimer();
	  // startButton.innerHTML = 'Pause';
	  // let buttonClass = startButton.className;
	  // if (buttonClass === 'pause' ) {
	  //   clearInterval(incrementTime);
	  //   time.pauseTime();
	  // } else {
	  //   incrementTime = window.setInterval(incrementSeconds, 1000);
	  // }
	};
	
	var input = document.getElementById('user-typing');
	input.addEventListener('keydown', function (e) {
	  var lastWord = typedWord.split(" ")[cursorPos];
	  var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
	
	  if (e.keyCode === 32) {
	    // space
	    typedWord += " "; // add space
	    (0, _highlightText2.default)(cursorPos + 1, wordsArray);
	    input.innerHTML = input.innerHTML.replace(lastWord, '');
	    if (wordsArray[cursorPos] === lastWord) {
	      numCorrect++;
	      input.innerHTML += '<font color="gray">' + lastWord + '</font>';
	    } else {
	      numWrong++;
	      input.innerHTML += '<font color="red">' + lastWord + '</font>';
	    }
	    moveCursor(input);
	    cursorPos++;
	    document.execCommand('forecolor', false, '000000');
	  } else if (e.keyCode === 8) {
	    // backspace
	    var lastChar = typedWord[typedWord.length - 1]; //input.textContent[input.textContent.length - 1]
	    debugger;
	    var typedSentence = typedWord.split(' '); //input.textContent.trim().split(" ");
	    var wordCount = typedSentence.length;
	    if (lastChar === " " && typedSentence[wordCount - 2] === wordsArray[cursorPos - 1]) {
	      numCorrect--;
	      cursorPos--;
	    } else if (lastChar === " " && typedSentence[wordCount - 2] !== wordsArray[cursorPos - 1]) {
	      numWrong--;
	      cursorPos--;
	    } else if (lastChar === " ") {
	      cursorPos--;
	    } else {
	      typedWord -= e.key;
	    }
	    // typedWord = typedWord.replace(lastChar, "");
	    console.log("backspace", numCorrect);
	    console.log(numWrong);
	    console.log("position", cursorPos);
	    console.log(typedWord);
	  } else if (alphabet.includes(e.key.toLowerCase())) {
	    typedWord += e.key;
	  } else {
	    e.preventDefault();
	  }
	  console.log(e.key);
	  console.log(typedWord);
	
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
	var moveCursor = function moveCursor(el) {
	  el.focus();
	  if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
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
	};
	
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
	
	// const startButton = document.getElementById('start');
	// let incrementTime;
	// startButton.addEventListener('click', e => {
	//   initializeGame();
	//   input.focus();
	// });
	//
	// const incrementSeconds = () => {
	//   startButton.innerHTML = 'Pause';
	//   startButton.className = 'pause';
	//   let seconds = time.timer++;
	//   time.displayTimer();
	// };

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var readTextFile = function readTextFile(file) {
	  var rawFile = new XMLHttpRequest();
	  var wordsArray = void 0;
	  rawFile.open("GET", file, false);
	  rawFile.onreadystatechange = function () {
	    if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
	      var allText = rawFile.responseText;
	      wordsArray = allText.split("\n");
	    }
	  };
	  rawFile.send();
	  return wordsArray;
	};
	
	// const readTextFile = file => {
	//    let str = "";
	//    let txtFile = new File(file);
	//    txtFile.open('r');
	//    while (!txtFile.eof){
	//      str += txtFile.readln() + '/n';
	//    }
	//    return str;
	// }
	
	var reader = new FileReader();
	
	var WORDS = readTextFile('https://github.com/psia12345/racetyping/blob/master/dictionary.txt');
	var generateRandomNumber = function generateRandomNumber(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}; // exclude upper max number
	
	var generateText = function generateText() {
	  var words = "";
	  for (var i = 0; i < 20; i++) {
	    words += WORDS[generateRandomNumber(0, WORDS.length)];
	    words += " ";
	  }
	  return words;
	};
	
	exports.default = generateText;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Timer = function () {
	  function Timer(time) {
	    _classCallCheck(this, Timer);
	
	    this.timer = time;
	  }
	
	  _createClass(Timer, [{
	    key: 'displayTimer',
	    value: function displayTimer() {
	      var timerDiv = document.getElementById('timer');
	      var timerSpan = document.createElement('span');
	      timerSpan.className = 'timer';
	      timerSpan.innerHTML = this.timer;
	      var previousTimer = document.getElementsByClassName('timer')[0];
	      if (previousTimer) timerDiv.removeChild(previousTimer);
	      timerDiv.appendChild(timerSpan);
	    }
	  }, {
	    key: 'pauseTime',
	    value: function pauseTime() {
	      var startButton = document.getElementById('start');
	      startButton.className = 'start';
	      startButton.innerHTML = 'Resume';
	      var input = document.getElementById('user-typing');
	      input.blur();
	    }
	  }]);
	
	  return Timer;
	}();
	
	exports.default = Timer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var laterString = "";
	var currentWord = document.createElement('span');
	var pText = document.getElementById('text');
	
	var highlightCurrentWord = function highlightCurrentWord(position, wordsArray) {
	  laterString = wordsArray.slice(position + 1, wordsArray.length).join(" ");
	  currentWord.textContent = wordsArray[position] + " ";
	  var highlightedElement = document.getElementsByClassName("highlight")[0];
	
	  if (highlightedElement) {
	    highlightedElement.nextSibling.textContent = "";
	    pText.removeChild(highlightedElement);
	  } else {
	    pText.textContent = "";
	  }
	  currentWord.className = 'highlight';
	  pText.appendChild(currentWord);
	  pText.appendChild(document.createTextNode(laterString));
	};
	exports.default = highlightCurrentWord;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map