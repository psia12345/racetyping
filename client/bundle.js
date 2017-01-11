/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//entry file for client
	const socket = io();
	const Game = __webpack_require__(1);
	const Player = __webpack_require__(6);

	const inputDiv = document.getElementById('user-typing');
	const divCanvasContainer = document.getElementById('canvas-container');
	const canvas = document.getElementById('canvas');
	const WIDTH = window.innerWidth;
	canvas.width = WIDTH;
	const ctx = canvas.getContext('2d');
	const newGame = document.getElementsByClassName('new-game')[0];
	let timeLimit;

	newGame.addEventListener('click', () => {
	  const splashPage = document.getElementById('splash-page');
	  splashPage.style.display = 'none';

	  const waiting = document.getElementById('waiting');
	  waiting.style.display = 'none';

	  const time = document.getElementById('time');
	  timeLimit = parseInt(time.options[time.selectedIndex].value); // multiply by 60 to make into second

	  const gameView = document.getElementById('the-game');
	  gameView.style.display = 'unset';

	  socket.emit('newGame');
	});

	socket.on('msg', message);

	function message(msg) {
	  if (msg === "Start Typing") {
	    const waiting = document.getElementById('waiting');
	    waiting.style.display = 'none';
	    const gameView = document.getElementById('the-game');
	    gameView.style.display = 'unset';

	    const redcar = document.getElementById('redcar');
	    const greencar = document.getElementById('greencar');
	    let player1 = new Player(1, 10, 50, redcar, ctx);
	    let player2 = new Player(2, 10, 200, greencar, ctx);
	    let game = new Game(timeLimit, ctx);
	    console.log("game starts");
	    game.initializeGame(20, player1, player2);
	  } else {
	    const gameView = document.getElementById('the-game');
	    gameView.style.display = 'none';

	    const waiting = document.getElementById('waiting');
	    waiting.style.display = 'unset';
	  }
	}

	inputDiv.onkeydown = e => {
	  socket.emit('typedForward', { inputId: 'forward', state: true });

	  socket.on('newPositions', data => {
	    // debugger;
	    ctx.clearRect(0, 0, WIDTH, 350);
	    console.log(data.player1);
	    console.log(data);
	  });
	};

	inputDiv.onkeyup = e => {
	  socket.emit('typedForward', {
	    inputId: 'forward', state: false
	  });
	};

	// document.addEventListener('keydown', (e)=> {
	//   if (e.keyCode === 68){
	//     socket.emit('keyPress', { inputId: 'right', state: true})
	//   }
	// })
	// document.addEventListener('keyup', (e)=> {
	//   if (e.keyCode === 68){
	//     socket.emit('keyPress', { inputId: 'right', state: false})
	//   }
	// })
	//
	// socket.on('newPositions', (data) => {
	//   ctx.clearRect(0, 0, 500, 500);
	//   for (let i = 0; i < data.length; i++){
	//     console.log(data[i]);
	//     ctx.fillText(data[i].number, data[i].x, data[i].y);
	//   }
	// });


	// // const Game = require('./game');
	//
	// import highlightCurrentWord from './highlightText';
	//
	// const textDiv = document.getElementById('text');
	// const modal = document.getElementById('modal');
	//
	// let cursorPos = 0;
	// let numWrong = 0;
	// let numCorrect = 0;
	// let wordsArray = textDiv.textContent.split(' ')
	// let laterString = "";
	// let typedWord = "";
	// let intervalId;
	// // let wpm = new analyzeWPM;
	//
	// const input = document.getElementById('user-typing');
	// input.addEventListener('keydown', e => {
	//
	//   const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
	//   let lastWord = typedWord.split(" ")[cursorPos];
	//   let sentenceLength = input.innerHTML.length;
	//   // wpm.display(time.timer, input.textContent);
	//
	//   if (e.keyCode === 32) { // space
	//     highlightCurrentWord(cursorPos + 1, wordsArray);
	//     input.innerHTML = input.innerHTML.slice(0, sentenceLength - lastWord.length)
	//     typedWord += " "; // add space
	//     if (wordsArray[cursorPos] === lastWord){
	//       numCorrect++;
	//       input.innerHTML += `<font color="gray">${lastWord}</font>`;
	//     } else {
	//       numWrong++;
	//       input.innerHTML += `<font color="red">${lastWord}</font>`;
	//     }
	//     moveCursor(input);
	//     cursorPos++;
	//     document.execCommand('forecolor', false, '000000');
	//
	//   } else if (e.keyCode === 8){ // backspace
	//     let lastChar = typedWord[typedWord.length - 1];
	//     let typedSentence = typedWord.split(' '); //input.textContent.trim().split(" ");
	//     let wordCount = typedSentence.length;
	//     if (lastChar === " " && typedSentence[wordCount - 2] === wordsArray[cursorPos - 1]){
	//       numCorrect--;
	//       cursorPos--;
	//       typedWord = typedWord.slice(0, typedWord.length - 1);
	//     } else if (lastChar === " " && typedSentence[wordCount - 2] !== wordsArray[cursorPos - 1]) {
	//       numWrong--;
	//       cursorPos--;
	//       typedWord = typedWord.slice(0, typedWord.length - 1);
	//     } else if (lastChar === " "){
	//       cursorPos--;
	//       typedWord = typedWord.slice(0, typedWord.length - 1);
	//     } else {
	//       typedWord = typedWord.slice(0, typedWord.length - 1);
	//     }
	//     highlightCurrentWord(cursorPos, wordsArray);
	// // missing some sort of input.innerHTML slice method to account for bug
	//   } else if (alphabet.includes(e.key.toLowerCase())){
	//     typedWord += e.key;
	//   } else {
	//     e.preventDefault();
	//   }
	//   // game.gameOver();
	// });
	//
	// // const highlightingWords = (word, correctWord) => {
	// //   // let text = input.innerHTML.split(' ');
	// //   // let textContent = text.splice(0, text.length - 1).join(' ');
	// //   // debugger;
	// //   // input.value = "";
	// //   // input.textContent = input.textContent.replace(word, "");
	// //   // input.innerHTML = "";
	// //   let highlight;
	// //   if (word === correctWord){
	// //     highlight = word;
	// //   } else {
	// //     // highlight = document.createElement('span');
	// //     // highlight.textContent = word + " ";
	// //     // highlight.className = 'incorrect-highlight';
	// //     highlight = `<i>${word}</i>`;
	// //   }
	// //   return highlight;
	// // }
	//
	//
	//
	// // input.addEventListener('focus', e => {
	// //   if (laterString === "") {
	// //     laterString = pText.innerHTML.slice(cursorPos, numLetters);
	// //     initializeGame();
	// //   }
	// //   pText.innerHTML = pText.innerHTML.replace(laterString, "");
	// //   const span = document.createElement('span');
	// //   span.innerHTML = laterString[0];
	// //   span.className = "highlight";
	// //   pText.appendChild(span);
	// //   let stringToAppend = laterString.replace(laterString[0], ""); ;
	// //   pText.appendChild(document.createTextNode(stringToAppend));
	// // })

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Timer = __webpack_require__(2);
	const randomWords = __webpack_require__(3);
	const Typing = __webpack_require__(4);
	const WordCalculation = __webpack_require__(10);

	class Game {
	  constructor(time, ctx) {
	    this.intervalId = null;
	    this.wordsArray = [];
	    this.ctx = ctx;
	    this.wpm = new WordCalculation();
	    this.time = new Timer(time, this);
	    this.typing = new Typing(this, this.ctx, this.wpm);
	    this.players = [];

	    document.addEventListener('click', this.handleClick.bind(this));
	  }
	  initializeGame(words, ...players) {
	    // debugger;
	    this.players = players;
	    const inputDiv = document.getElementById('user-typing');
	    const racetrack = document.getElementById('racetrack');
	    const redcar = document.getElementById('redcar');
	    const greencar = document.getElementById('greencar');
	    const WIDTH = window.innerWidth;

	    this.players.forEach(player => {
	      debugger;
	      player.drawCar();
	    });

	    inputDiv.contentEditable = true;
	    inputDiv.focus();
	    this.generateWords(words);
	    this.ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
	    this.ctx.drawImage(redcar, 10, 50, 110, 65);
	    this.ctx.drawImage(greencar, 10, 200, 110, 65);
	    this.typing.highlightCurrentWord(0, this.wordsArray);
	  }
	  startCountingTime() {
	    this.time.decrementSeconds(this, this.typing.numWrong);
	    this.intervalId = setInterval(this.time.decrementSeconds.bind(this.time, this), 1000);
	  }
	  gameOver(time, numWrong) {
	    time = time || this.time.timer;
	    const inputDiv = document.getElementById('user-typing');
	    const typedWord = inputDiv.textContent;
	    inputDiv.contentEditable = false;
	    window.clearInterval(this.intervalId);
	    inputDiv.blur();
	    const modal = document.getElementById('modal');
	    modal.style.display = 'block';
	    this.wpm.displayResults(this.time, this.typing.typedWord, this.typing.numWrong);
	    // }else{
	    //   this.generateWords(1);
	    //   return false;
	    // }
	  }
	  generateWords(n) {
	    let words = randomWords(n).join(' ');
	    this.wordsArray = this.wordsArray.concat(words.split(' '));
	    const textDiv = document.getElementById('text');
	    textDiv.innerHTML += `${ words } `;
	  }
	  assignCars() {
	    const redcar = document.getElementById('redcar');
	    const greencar = document.getElementById('greencar');
	  }
	  moveCars(redPos, redVel, greenPos, greenVel) {
	    const WIDTH = window.innerWidth;
	    // debugger;
	    this.players[0].car.drawRaceTrack();
	    this.players[0].car.moveCarForward(this.wpm);

	    // let player2 = this.players[1];


	    // if (player1.)
	    // this.ctx.clearRect(0, 0, WIDTH, 350);
	    // this.ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
	    // this.ctx.drawImage(redcar, player1.car.x, 50, player1.car.spd, 65);
	    // // player1.car.x += player1.car.spd;
	    // // debugger;
	    // this.ctx.drawImage(greencar, greenPos, 200, 110, 65);
	    // greenPos += greenVel;
	    // this.animationId = requestAnimationFrame(() => {
	    //   console.log(player1.car.x);
	    //   this.moveCars(player1.car.x, player1.car.spd, greenPos, greenVel);
	    // })
	  }
	  handleClick(e) {
	    console.log(e.target);
	    if (e.target.id === 'end-game' || e.target.id === 'game-controller') {
	      this.gameOver(this.time, this.typing.numWrong);
	    } else if (e.target.id === 'play-again') {
	      //new game
	    } else if (e.target.id === 'return-main') {
	      // return to splash page
	    }
	  }

	}
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	class Timer {
	  constructor(time, game) {
	    this.timer = time;
	    this.initialTime = time;
	    this.width = 100;
	    this.game = game;
	  }
	  displayTimer() {
	    const bar = document.getElementById('bar');
	    bar.style.width = this.width + '%';
	  }
	  decrementSeconds(game, numWrong) {
	    const decrementFactor = 100 / this.initialTime;
	    this.timer--;
	    this.width -= decrementFactor;
	    if (this.width <= 0) {
	      this.width = 0;
	    }
	    this.displayTimer();
	    if (this.timer === 0) {
	      this.game.gameOver(this.timer, game.typing.numWrong);
	    }
	  }
	}
	module.exports = Timer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var wordList = [
	// Borrowed from xkcd password generator which borrowed it from wherever
	"ability", "able", "aboard", "about", "above", "accept", "accident", "according", "account", "accurate", "acres", "across", "act", "action", "active", "activity", "actual", "actually", "add", "addition", "additional", "adjective", "adult", "adventure", "advice", "affect", "afraid", "after", "afternoon", "again", "against", "age", "ago", "agree", "ahead", "aid", "air", "airplane", "alike", "alive", "all", "allow", "almost", "alone", "along", "aloud", "alphabet", "already", "also", "although", "am", "among", "amount", "ancient", "angle", "angry", "animal", "announced", "another", "answer", "ants", "any", "anybody", "anyone", "anything", "anyway", "anywhere", "apart", "apartment", "appearance", "apple", "applied", "appropriate", "are", "area", "arm", "army", "around", "arrange", "arrangement", "arrive", "arrow", "art", "article", "as", "aside", "ask", "asleep", "at", "ate", "atmosphere", "atom", "atomic", "attached", "attack", "attempt", "attention", "audience", "author", "automobile", "available", "average", "avoid", "aware", "away", "baby", "back", "bad", "badly", "bag", "balance", "ball", "balloon", "band", "bank", "bar", "bare", "bark", "barn", "base", "baseball", "basic", "basis", "basket", "bat", "battle", "be", "bean", "bear", "beat", "beautiful", "beauty", "became", "because", "become", "becoming", "bee", "been", "before", "began", "beginning", "begun", "behavior", "behind", "being", "believed", "bell", "belong", "below", "belt", "bend", "beneath", "bent", "beside", "best", "bet", "better", "between", "beyond", "bicycle", "bigger", "biggest", "bill", "birds", "birth", "birthday", "bit", "bite", "black", "blank", "blanket", "blew", "blind", "block", "blood", "blow", "blue", "board", "boat", "body", "bone", "book", "border", "born", "both", "bottle", "bottom", "bound", "bow", "bowl", "box", "boy", "brain", "branch", "brass", "brave", "bread", "break", "breakfast", "breath", "breathe", "breathing", "breeze", "brick", "bridge", "brief", "bright", "bring", "broad", "broke", "broken", "brother", "brought", "brown", "brush", "buffalo", "build", "building", "built", "buried", "burn", "burst", "bus", "bush", "business", "busy", "but", "butter", "buy", "by", "cabin", "cage", "cake", "call", "calm", "came", "camera", "camp", "can", "canal", "cannot", "cap", "capital", "captain", "captured", "car", "carbon", "card", "care", "careful", "carefully", "carried", "carry", "case", "cast", "castle", "cat", "catch", "cattle", "caught", "cause", "cave", "cell", "cent", "center", "central", "century", "certain", "certainly", "chain", "chair", "chamber", "chance", "change", "changing", "chapter", "character", "characteristic", "charge", "chart", "check", "cheese", "chemical", "chest", "chicken", "chief", "child", "children", "choice", "choose", "chose", "chosen", "church", "circle", "circus", "citizen", "city", "class", "classroom", "claws", "clay", "clean", "clear", "clearly", "climate", "climb", "clock", "close", "closely", "closer", "cloth", "clothes", "clothing", "cloud", "club", "coach", "coal", "coast", "coat", "coffee", "cold", "collect", "college", "colony", "color", "column", "combination", "combine", "come", "comfortable", "coming", "command", "common", "community", "company", "compare", "compass", "complete", "completely", "complex", "composed", "composition", "compound", "concerned", "condition", "congress", "connected", "consider", "consist", "consonant", "constantly", "construction", "contain", "continent", "continued", "contrast", "control", "conversation", "cook", "cookies", "cool", "copper", "copy", "corn", "corner", "correct", "correctly", "cost", "cotton", "could", "count", "country", "couple", "courage", "course", "court", "cover", "cow", "cowboy", "crack", "cream", "create", "creature", "crew", "crop", "cross", "crowd", "cry", "cup", "curious", "current", "curve", "customs", "cut", "cutting", "daily", "damage", "dance", "danger", "dangerous", "dark", "darkness", "date", "daughter", "dawn", "day", "dead", "deal", "dear", "death", "decide", "declared", "deep", "deeply", "deer", "definition", "degree", "depend", "depth", "describe", "desert", "design", "desk", "detail", "determine", "develop", "development", "diagram", "diameter", "did", "die", "differ", "difference", "different", "difficult", "difficulty", "dig", "dinner", "direct", "direction", "directly", "dirt", "dirty", "disappear", "discover", "discovery", "discuss", "discussion", "disease", "dish", "distance", "distant", "divide", "division", "do", "doctor", "does", "dog", "doing", "doll", "dollar", "done", "donkey", "door", "dot", "double", "doubt", "down", "dozen", "draw", "drawn", "dream", "dress", "drew", "dried", "drink", "drive", "driven", "driver", "driving", "drop", "dropped", "drove", "dry", "duck", "due", "dug", "dull", "during", "dust", "duty", "each", "eager", "ear", "earlier", "early", "earn", "earth", "easier", "easily", "east", "easy", "eat", "eaten", "edge", "education", "effect", "effort", "egg", "eight", "either", "electric", "electricity", "element", "elephant", "eleven", "else", "empty", "end", "enemy", "energy", "engine", "engineer", "enjoy", "enough", "enter", "entire", "entirely", "environment", "equal", "equally", "equator", "equipment", "escape", "especially", "essential", "establish", "even", "evening", "event", "eventually", "ever", "every", "everybody", "everyone", "everything", "everywhere", "evidence", "exact", "exactly", "examine", "example", "excellent", "except", "exchange", "excited", "excitement", "exciting", "exclaimed", "exercise", "exist", "expect", "experience", "experiment", "explain", "explanation", "explore", "express", "expression", "extra", "eye", "face", "facing", "fact", "factor", "factory", "failed", "fair", "fairly", "fall", "fallen", "familiar", "family", "famous", "far", "farm", "farmer", "farther", "fast", "fastened", "faster", "fat", "father", "favorite", "fear", "feathers", "feature", "fed", "feed", "feel", "feet", "fell", "fellow", "felt", "fence", "few", "fewer", "field", "fierce", "fifteen", "fifth", "fifty", "fight", "fighting", "figure", "fill", "film", "final", "finally", "find", "fine", "finest", "finger", "finish", "fire", "fireplace", "firm", "first", "fish", "five", "fix", "flag", "flame", "flat", "flew", "flies", "flight", "floating", "floor", "flow", "flower", "fly", "fog", "folks", "follow", "food", "foot", "football", "for", "force", "foreign", "forest", "forget", "forgot", "forgotten", "form", "former", "fort", "forth", "forty", "forward", "fought", "found", "four", "fourth", "fox", "frame", "free", "freedom", "frequently", "fresh", "friend", "friendly", "frighten", "frog", "from", "front", "frozen", "fruit", "fuel", "full", "fully", "fun", "function", "funny", "fur", "furniture", "further", "future", "gain", "game", "garage", "garden", "gas", "gasoline", "gate", "gather", "gave", "general", "generally", "gentle", "gently", "get", "getting", "giant", "gift", "girl", "give", "given", "giving", "glad", "glass", "globe", "go", "goes", "gold", "golden", "gone", "good", "goose", "got", "government", "grabbed", "grade", "gradually", "grain", "grandfather", "grandmother", "graph", "grass", "gravity", "gray", "great", "greater", "greatest", "greatly", "green", "grew", "ground", "group", "grow", "grown", "growth", "guard", "guess", "guide", "gulf", "gun", "habit", "had", "hair", "half", "halfway", "hall", "hand", "handle", "handsome", "hang", "happen", "happened", "happily", "happy", "harbor", "hard", "harder", "hardly", "has", "hat", "have", "having", "hay", "he", "headed", "heading", "health", "heard", "hearing", "heart", "heat", "heavy", "height", "held", "hello", "help", "helpful", "her", "herd", "here", "herself", "hidden", "hide", "high", "higher", "highest", "highway", "hill", "him", "himself", "his", "history", "hit", "hold", "hole", "hollow", "home", "honor", "hope", "horn", "horse", "hospital", "hot", "hour", "house", "how", "however", "huge", "human", "hundred", "hung", "hungry", "hunt", "hunter", "hurried", "hurry", "hurt", "husband", "ice", "idea", "identity", "if", "ill", "image", "imagine", "immediately", "importance", "important", "impossible", "improve", "in", "inch", "include", "including", "income", "increase", "indeed", "independent", "indicate", "individual", "industrial", "industry", "influence", "information", "inside", "instance", "instant", "instead", "instrument", "interest", "interior", "into", "introduced", "invented", "involved", "iron", "is", "island", "it", "its", "itself", "jack", "jar", "jet", "job", "join", "joined", "journey", "joy", "judge", "jump", "jungle", "just", "keep", "kept", "key", "kids", "kill", "kind", "kitchen", "knew", "knife", "know", "knowledge", "known", "label", "labor", "lack", "lady", "laid", "lake", "lamp", "land", "language", "large", "larger", "largest", "last", "late", "later", "laugh", "law", "lay", "layers", "lead", "leader", "leaf", "learn", "least", "leather", "leave", "leaving", "led", "left", "leg", "length", "lesson", "let", "letter", "level", "library", "lie", "life", "lift", "light", "like", "likely", "limited", "line", "lion", "lips", "liquid", "list", "listen", "little", "live", "living", "load", "local", "locate", "location", "log", "lonely", "long", "longer", "look", "loose", "lose", "loss", "lost", "lot", "loud", "love", "lovely", "low", "lower", "luck", "lucky", "lunch", "lungs", "lying", "machine", "machinery", "mad", "made", "magic", "magnet", "mail", "main", "mainly", "major", "make", "making", "man", "managed", "manner", "manufacturing", "many", "map", "mark", "market", "married", "mass", "massage", "master", "material", "mathematics", "matter", "may", "maybe", "me", "meal", "mean", "means", "meant", "measure", "meat", "medicine", "meet", "melted", "member", "memory", "men", "mental", "merely", "met", "metal", "method", "mice", "middle", "might", "mighty", "mile", "military", "milk", "mill", "mind", "mine", "minerals", "minute", "mirror", "missing", "mission", "mistake", "mix", "mixture", "model", "modern", "molecular", "moment", "money", "monkey", "month", "mood", "moon", "more", "morning", "most", "mostly", "mother", "motion", "motor", "mountain", "mouse", "mouth", "move", "movement", "movie", "moving", "mud", "muscle", "music", "musical", "must", "my", "myself", "mysterious", "nails", "name", "nation", "national", "native", "natural", "naturally", "nature", "near", "nearby", "nearer", "nearest", "nearly", "necessary", "neck", "needed", "needle", "needs", "negative", "neighbor", "neighborhood", "nervous", "nest", "never", "new", "news", "newspaper", "next", "nice", "night", "nine", "no", "nobody", "nodded", "noise", "none", "noon", "nor", "north", "nose", "not", "note", "noted", "nothing", "notice", "noun", "now", "number", "numeral", "nuts", "object", "observe", "obtain", "occasionally", "occur", "ocean", "of", "off", "offer", "office", "officer", "official", "oil", "old", "older", "oldest", "on", "once", "one", "only", "onto", "open", "operation", "opinion", "opportunity", "opposite", "or", "orange", "orbit", "order", "ordinary", "organization", "organized", "origin", "original", "other", "ought", "our", "ourselves", "out", "outer", "outline", "outside", "over", "own", "owner", "oxygen", "pack", "package", "page", "paid", "pain", "paint", "pair", "palace", "pale", "pan", "paper", "paragraph", "parallel", "parent", "park", "part", "particles", "particular", "particularly", "partly", "parts", "party", "pass", "passage", "past", "path", "pattern", "pay", "peace", "pen", "pencil", "people", "per", "percent", "perfect", "perfectly", "perhaps", "period", "person", "personal", "pet", "phrase", "physical", "piano", "pick", "picture", "pictured", "pie", "piece", "pig", "pile", "pilot", "pine", "pink", "pipe", "pitch", "place", "plain", "plan", "plane", "planet", "planned", "planning", "plant", "plastic", "plate", "plates", "play", "pleasant", "please", "pleasure", "plenty", "plural", "plus", "pocket", "poem", "poet", "poetry", "point", "pole", "police", "policeman", "political", "pond", "pony", "pool", "poor", "popular", "population", "porch", "port", "position", "positive", "possible", "possibly", "post", "pot", "potatoes", "pound", "pour", "powder", "power", "powerful", "practical", "practice", "prepare", "present", "president", "press", "pressure", "pretty", "prevent", "previous", "price", "pride", "primitive", "principal", "principle", "printed", "private", "prize", "probably", "problem", "process", "produce", "product", "production", "program", "progress", "promised", "proper", "properly", "property", "protection", "proud", "prove", "provide", "public", "pull", "pupil", "pure", "purple", "purpose", "push", "put", "putting", "quarter", "queen", "question", "quick", "quickly", "quiet", "quietly", "quite", "rabbit", "race", "radio", "railroad", "rain", "raise", "ran", "ranch", "range", "rapidly", "rate", "rather", "raw", "rays", "reach", "read", "reader", "ready", "real", "realize", "rear", "reason", "recall", "receive", "recent", "recently", "recognize", "record", "red", "refer", "refused", "region", "regular", "related", "relationship", "religious", "remain", "remarkable", "remember", "remove", "repeat", "replace", "replied", "report", "represent", "require", "research", "respect", "rest", "result", "return", "review", "rhyme", "rhythm", "rice", "rich", "ride", "riding", "right", "ring", "rise", "rising", "river", "road", "roar", "rock", "rocket", "rocky", "rod", "roll", "roof", "room", "root", "rope", "rose", "rough", "round", "route", "row", "rubbed", "rubber", "rule", "ruler", "run", "running", "rush", "sad", "saddle", "safe", "safety", "said", "sail", "sale", "salmon", "salt", "same", "sand", "sang", "sat", "satellites", "satisfied", "save", "saved", "saw", "say", "scale", "scared", "scene", "school", "science", "scientific", "scientist", "score", "screen", "sea", "search", "season", "seat", "second", "secret", "section", "see", "seed", "seeing", "seems", "seen", "seldom", "select", "selection", "sell", "send", "sense", "sent", "sentence", "separate", "series", "serious", "serve", "service", "sets", "setting", "settle", "settlers", "seven", "several", "shade", "shadow", "shake", "shaking", "shall", "shallow", "shape", "share", "sharp", "she", "sheep", "sheet", "shelf", "shells", "shelter", "shine", "shinning", "ship", "shirt", "shoe", "shoot", "shop", "shore", "short", "shorter", "shot", "should", "shoulder", "shout", "show", "shown", "shut", "sick", "sides", "sight", "sign", "signal", "silence", "silent", "silk", "silly", "silver", "similar", "simple", "simplest", "simply", "since", "sing", "single", "sink", "sister", "sit", "sitting", "situation", "six", "size", "skill", "skin", "sky", "slabs", "slave", "sleep", "slept", "slide", "slight", "slightly", "slip", "slipped", "slope", "slow", "slowly", "small", "smaller", "smallest", "smell", "smile", "smoke", "smooth", "snake", "snow", "so", "soap", "social", "society", "soft", "softly", "soil", "solar", "sold", "soldier", "solid", "solution", "solve", "some", "somebody", "somehow", "someone", "something", "sometime", "somewhere", "son", "song", "soon", "sort", "sound", "source", "south", "southern", "space", "speak", "special", "species", "specific", "speech", "speed", "spell", "spend", "spent", "spider", "spin", "spirit", "spite", "split", "spoken", "sport", "spread", "spring", "square", "stage", "stairs", "stand", "standard", "star", "stared", "start", "state", "statement", "station", "stay", "steady", "steam", "steel", "steep", "stems", "step", "stepped", "stick", "stiff", "still", "stock", "stomach", "stone", "stood", "stop", "stopped", "store", "storm", "story", "stove", "straight", "strange", "stranger", "straw", "stream", "street", "strength", "stretch", "strike", "string", "strip", "strong", "stronger", "struck", "structure", "struggle", "stuck", "student", "studied", "studying", "subject", "substance", "success", "successful", "such", "sudden", "suddenly", "sugar", "suggest", "suit", "sum", "summer", "sun", "sunlight", "supper", "supply", "support", "suppose", "sure", "surface", "surprise", "surrounded", "swam", "sweet", "swept", "swim", "swimming", "swing", "swung", "syllable", "symbol", "system", "table", "tail", "take", "taken", "tales", "talk", "tall", "tank", "tape", "task", "taste", "taught", "tax", "tea", "teach", "teacher", "team", "tears", "teeth", "telephone", "television", "tell", "temperature", "ten", "tent", "term", "terrible", "test", "than", "thank", "that", "thee", "them", "themselves", "then", "theory", "there", "therefore", "these", "they", "thick", "thin", "thing", "think", "third", "thirty", "this", "those", "thou", "though", "thought", "thousand", "thread", "three", "threw", "throat", "through", "throughout", "throw", "thrown", "thumb", "thus", "thy", "tide", "tie", "tight", "tightly", "till", "time", "tin", "tiny", "tip", "tired", "title", "to", "tobacco", "today", "together", "told", "tomorrow", "tone", "tongue", "tonight", "too", "took", "tool", "top", "topic", "torn", "total", "touch", "toward", "tower", "town", "toy", "trace", "track", "trade", "traffic", "trail", "train", "transportation", "trap", "travel", "treated", "tree", "triangle", "tribe", "trick", "tried", "trip", "troops", "tropical", "trouble", "truck", "trunk", "truth", "try", "tube", "tune", "turn", "twelve", "twenty", "twice", "two", "type", "typical", "uncle", "under", "underline", "understanding", "unhappy", "union", "unit", "universe", "unknown", "unless", "until", "unusual", "up", "upon", "upper", "upward", "us", "use", "useful", "using", "usual", "usually", "valley", "valuable", "value", "vapor", "variety", "various", "vast", "vegetable", "verb", "vertical", "very", "vessels", "victory", "view", "village", "visit", "visitor", "voice", "volume", "vote", "vowel", "voyage", "wagon", "wait", "walk", "wall", "want", "war", "warm", "warn", "was", "wash", "waste", "watch", "water", "wave", "way", "we", "weak", "wealth", "wear", "weather", "week", "weigh", "weight", "welcome", "well", "went", "were", "west", "western", "wet", "whale", "what", "whatever", "wheat", "wheel", "when", "whenever", "where", "wherever", "whether", "which", "while", "whispered", "whistle", "white", "who", "whole", "whom", "whose", "why", "wide", "widely", "wife", "wild", "will", "willing", "win", "wind", "window", "wing", "winter", "wire", "wise", "wish", "with", "within", "without", "wolf", "women", "won", "wonder", "wonderful", "wood", "wooden", "wool", "word", "wore", "work", "worker", "world", "worried", "worry", "worse", "worth", "would", "wrapped", "write", "writer", "writing", "written", "wrong", "wrote", "yard", "year", "yellow", "yes", "yesterday", "yet", "you", "young", "younger", "your", "yourself", "youth", "zero", "zoo"];

	function words(options) {
	  function word() {
	    return wordList[randInt(wordList.length)];
	  }

	  function randInt(lessThan) {
	    return Math.floor(Math.random() * lessThan);
	  }

	  // No arguments = generate one word
	  if (typeof options === 'undefined') {
	    return word();
	  }

	  // Just a number = return that many words
	  if (typeof options === 'number') {
	    options = { exactly: options };
	  }

	  // options supported: exactly, min, max, join

	  if (options.exactly) {
	    options.min = options.exactly;
	    options.max = options.exactly;
	  }
	  var total = options.min + randInt(options.max + 1 - options.min);
	  var results = [];
	  for (var i = 0; i < total; i++) {
	    results.push(word());
	  }
	  if (options.join) {
	    results = results.join(options.join);
	  }
	  return results;
	}

	module.exports = words;
	// Export the word list as it is often useful
	words.wordList = wordList;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const moveCursor = __webpack_require__(5);
	const Player = __webpack_require__(6);

	class Typing {
	  constructor(game, ctx, wpm) {
	    this.typedWord = "";
	    this.cursorPos = 0;
	    this.wordsArray = [];
	    this.numCorrect = 0;
	    this.numWrong = 0;
	    this.game = game;
	    this.ctx = ctx;
	    this.wpm = wpm;
	    this.animationId = null;
	    this.time = game.time;
	    this.noInput = true;
	    this.player = new Player();

	    const inputDiv = document.getElementById('user-typing');
	    inputDiv.addEventListener('keydown', this.handleKeyEvent.bind(this));
	  }
	  handleKeyEvent(e) {
	    if (this.noInput) {
	      this.game.startCountingTime();
	    }
	    this.game.moveCars(0, 2, 0, 1);
	    this.player.moveCarForward = true;
	    this.player.updatePosition(this.wpm);

	    this.noInput = false;
	    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
	    const input = document.getElementById('user-typing');
	    let lastWord = this.typedWord.split(" ")[this.cursorPos];
	    let sentenceLength = input.innerHTML.length;
	    // this.wordsArray = this.game.wordsArray;
	    // console.log("before space", input.innerHTML)
	    if (e.keyCode === 32) {
	      // space
	      this.highlightCurrentWord(this.cursorPos + 1);
	      // debugger;
	      input.innerHTML = input.innerHTML.slice(0, sentenceLength - lastWord.length);
	      this.typedWord += " "; // add space
	      // console.log("before replacing", input.innerHTML)
	      let elToRemove = input.innerHTML.match(/\<font color="#808080"\>\w+\<\/font\>/g);
	      if (elToRemove) {
	        elToRemove = elToRemove[0];
	      }
	      input.innerHTML = input.innerHTML.replace(elToRemove, "");
	      // console.log(input.innerHTML)
	      if (this.wordsArray[this.cursorPos] === lastWord) {
	        this.numCorrect++;
	        // console.log("after adding correct", input.innerHTML)
	        input.innerHTML += `<font color="gray">${ lastWord }</font>`;
	      } else {
	        this.numWrong++;
	        input.innerHTML += `<font color="red">${ lastWord }</font>`;
	        // console.log("after adding incorrect", input.innerHTML)
	      }
	      moveCursor(input);
	      this.cursorPos++;
	      document.execCommand('forecolor', false, '000000');
	    } else if (e.keyCode === 8) {
	      // backspace
	      let lastChar = this.typedWord[this.typedWord.length - 1];
	      let typedSentence = this.typedWord.split(' '); //input.textContent.trim().split(" ");
	      let wordCount = typedSentence.length;
	      if (lastChar === " " && typedSentence[wordCount - 2] === this.wordsArray[this.cursorPos - 1]) {
	        this.numCorrect--;
	        this.cursorPos--;
	        this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
	      } else if (lastChar === " " && typedSentence[wordCount - 2] !== this.wordsArray[this.cursorPos - 1]) {
	        this.numWrong--;
	        this.cursorPos--;
	        this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
	      } else if (lastChar === " ") {
	        this.cursorPos--;
	        this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
	      } else {
	        this.typedWord = this.typedWord.slice(0, this.typedWord.length - 1);
	      }
	      console.log("backspace", input.innerHTML);
	      this.highlightCurrentWord(this.cursorPos);
	      // missing some sort of input.innerHTML slice method to account for bug
	    } else if (alphabet.includes(e.key.toLowerCase())) {
	      this.typedWord += e.key;
	    } else {
	      e.preventDefault();
	      cancelAnimationFrame(this.animationId);
	    }

	    this.wpm.display(this.time, this.typedWord);
	    // let x = this
	    // requestAnimationFrame(function(x){
	    //   console.log(x);
	    //   x.moveCars(0, 1200/300, 0, 1);
	    // })
	    // this.game.gameOver(this.time.timer, this.numWrong);
	  }
	  highlightCurrentWord(position, wordsArray) {
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

	    if (highlightedElement) {
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	const moveCursor = el => {
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

	module.exports = moveCursor;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Car = __webpack_require__(7);

	class Player {
	  constructor(id, socketId) {
	    this.id = id;
	    this.socketId = socketId;
	    this.typingForward = false;
	    this.typingBackward = false;
	    this.car = null;
	  }
	  updatePosition(wpm) {
	    if (this.typingForward) {
	      this.car.moveCarForward(wpm);
	    } else if (this.typingBackward) {
	      this.car.moveCarBackward(wpm);
	    }
	  }
	  drawCar() {
	    const redcar = document.getElementById('redcar');
	    const greencar = document.getElementById('greencar');
	    const ctx = document.getElementById('canvas').getContext('2d');
	    if (this.id === 1) {
	      this.car = new Car(50, 100, redcar, ctx);
	    } else {
	      this.car = new Car(50, 250, greencar, ctx);
	    }
	  }
	}
	module.exports = Player;

/***/ },
/* 7 */
/***/ function(module, exports) {

	class Car {
	  constructor(x, y, img, ctx) {
	    this.x = x;
	    this.y = y;
	    this.img = img;
	    this.spd = 0;
	    this.ctx = ctx;
	    this.imgWidth = 110;
	    this.imgHeight = 65;
	  }
	  moveCarForward(wpm) {
	    this.updateSpd(wpm);
	    this.x += this.spd;
	    console.log(this.x);
	    this.ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
	  }
	  moveCarBackward(wpm) {
	    this.updateSpd(wpm);
	    this.x -= this.spd;
	    this.ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
	  }
	  drawRaceTrack() {
	    const racetrack = document.getElementById('racetrack');
	    const width = window.innerWidth;
	    this.ctx.clearRect(0, 0, width, 350);
	    this.ctx.drawImage(racetrack, 0, 0, width, 350);
	  }
	  updateSpd(wpm) {
	    //can use switch-case statement here
	    if (wpm === 0) {
	      this.spd = 0;
	    } else if (wpm <= 20) {
	      this.spd = 0.2;
	    } else if (wpm <= 40) {
	      this.spd = 0.4;
	    } else if (wpm <= 60) {
	      this.spd = 0.6;
	    } else if (wpm <= 80) {
	      this.spd = 0.8;
	    } else if (wpm <= 100) {
	      this.spd = 1;
	    } else {
	      this.spd = 1.2;
	    }
	  }
	}
	module.exports = Car;

/***/ },
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	class WordCalculation {
	  calculateWPM(time, text) {
	    // time object
	    const span = document.createElement('span');
	    const currentTimeLeft = time.timer;
	    const totalTime = time.initialTime;
	    span.textContent = Math.floor(text.length / 5 / (totalTime - currentTimeLeft) * 60) + " wpm";
	    span.className = 'wpm';
	    return span;
	  }
	  adjustedWPM(time, text, wrong) {
	    // time object
	    const span = document.createElement('span');
	    const totalTime = time.initialTime;
	    let wpm = text.length / 5;
	    wpm = Math.floor((wpm - wrong) / totalTime * 60);
	    if (wpm <= 0) wpm = 0;
	    span.textContent = wpm + " wpm";
	    span.className = 'wpm';
	    return span;
	  }
	  accuracy(wrong, correct) {
	    // number of correct charcters typed / total number of charcters (should still have accuracy < 100 % if there are any corrected mistake)
	    // const span = document.createElement('span');
	    // const total = correct + wrong;
	    // span.textContent = Math.floor((correct - wrong) / total * 100) + " %";
	    // span.className = 'wpm';
	    // return span;
	  }
	  charInMin(time, text) {
	    const span = document.createElement('span');
	    const timePassed = time.initialTime - time.timer;
	    span.textContent = Math.floor(text.length / timePassed * 60) + " characters";
	    span.className = 'wpm';
	    return span;
	  }
	  display(time, text) {
	    const wpmDiv = document.getElementById('wpm');
	    let span = document.getElementsByClassName('wpm')[1];
	    if (typeof span !== 'undefined') wpmDiv.removeChild(span);
	    wpmDiv.appendChild(this.calculateWPM(time, text));
	  }
	  displayResults(time, text, wrong, actualText) {
	    const resultDivs = document.getElementsByClassName('result');
	    resultDivs[0].appendChild(this.calculateWPM(time, text));
	    resultDivs[1].appendChild(this.adjustedWPM(time, text, wrong));
	    resultDivs[2].appendChild(this.charInMin(time, text));
	    // resultDivs[2].appendChild(this.accuracy(typedtext, actualText));
	  }
	}
	module.exports = WordCalculation;

/***/ }
/******/ ]);