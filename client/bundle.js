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

	const modal1 = document.getElementById('one-p-instruction');
	const modal2 = document.getElementById('two-p-instruction');
	const onePlayer = document.getElementById('proceed-1p');
	const twoPlayers = document.getElementById('proceed-2p');
	const singleGame = document.getElementById('start-1p');
	const twoPlayerOptions = document.getElementsByClassName('option-2p');

	const socket = io();
	const socket2 = io();
	const Game = __webpack_require__(1);
	const Player = __webpack_require__(7);

	//canvas
	// const divCanvasContainer = document.getElementById('canvas-container');
	const canvas = document.getElementById('canvas');
	const WIDTH = window.innerWidth;
	canvas.width = WIDTH;
	const ctx = canvas.getContext('2d');
	//game
	const inputDiv = document.getElementById('user-typing');
	const time = document.getElementById('time');
	//cars
	const redcar = document.getElementById('redcar');
	const greencar = document.getElementById('greencar');
	//game Views
	const gameView = document.getElementById('the-game');
	const waiting = document.getElementById('waiting');
	const splashPage = document.getElementById('splash-page');
	let timeLimit;
	let player1;
	let player2;
	let game;

	document.addEventListener('click', e => {
	  e.preventDefault;
	  if (e.target.className === 'single-game') {
	    modal1.style.display = 'block';
	  } else if (e.target.className === 'two-game') {
	    modal2.style.display = 'block';
	  } else if (e.target == modal1 || e.target == modal2) {
	    modal1.style.display = 'none';
	    modal2.style.display = 'none';
	  } else if (e.target == onePlayer) {
	    // console.log('continue single player game');
	    modal1.style.display = 'none';
	    const nextPage = document.getElementById('one-p-page2');
	    nextPage.style.display = 'block';
	  } else if (e.target == twoPlayers) {
	    // console.log('start two player game');
	    modal2.style.display = 'none';
	    const nextPage = document.getElementById('two-p-page2');
	    nextPage.style.display = 'block';
	    let j;
	    for (let i in twoPlayerOptions) {
	      twoPlayerOptions[i].onclick = function (e) {
	        if (e.target == twoPlayerOptions[i] || e.target == twoPlayerOptions[i].children[0] || e.target == twoPlayerOptions[i].children[1]) {
	          if (j) {
	            twoPlayerOptions[j].className = 'option-2p';
	            twoPlayerOptions[j].children[2].className = 'hidden option-buttons';
	          }
	          twoPlayerOptions[i].className = 'selected option-2p';
	          twoPlayerOptions[i].children[2].className = 'option-buttons';
	          j = i;
	        }
	      };
	    }
	  } else if (e.target == singleGame) {
	    let level = document.querySelector('input[name="difficulty"]:checked').value;
	    timeLimit = document.querySelector('input[name="time"]:checked').value;
	    // console.log('start single player game');
	    let id = Math.random().toString(36).substring(3, 10);
	    socket.emit('single player game', { gameId: id });
	    socket2.emit('join available game', { gameId: id, type: 'computer', level: level });
	  } else if (e.target.className === 'option-buttons') {
	    if (e.target.textContent === 'Create New Game Room') {
	      // console.log('create new game');
	      let id = Math.random().toString(36).substring(3, 10);
	      // console.log(id);
	      socket.emit('new game', { gameId: id });
	    } else if (e.target.textContent === 'Join Game') {
	      let gameId = e.target.previousElementSibling;
	      socket.emit('join game', gameId.value, data => {
	        if (data) {
	          // console.log("in the game")
	          // successfully joined game
	          // start the game
	        } else {
	          let msg = 'The game room ID that you entered either doesn\'t exist yet or the room is already full. Please Try again.';
	          // no game room exits, try again or initiate a new game room
	          // console.log(msg);
	        }
	      });
	      gameId.value = "";
	    } else if (e.target.textContent === 'Join Random Game') {
	      socket.emit('join available game', { type: 'player' });
	    }
	  }
	});
	window.onclick = function (e) {
	  let modals = document.getElementsByClassName('modal');
	  for (let i in modals) {
	    if (e.target == modals[i]) {
	      location.reload();
	    }
	  }
	};
	function startGameSetup() {
	  splashPage.style.display = 'none';
	  waiting.style.display = 'none';
	  gameView.style.display = 'unset';
	  timeLimit = parseInt(timeLimit) * 60 || 5 * 60;
	  // console.log(timeLimit);
	  document.getElementById('ready').style.display = 'block';
	}
	socket.on('msg', message);

	function message(msg) {
	  if (msg === "Start Typing") {
	    startGameSetup();

	    player1 = new Player(1, 10, 50, redcar, ctx);
	    player2 = new Player(2, 10, 200, greencar, ctx);
	    game = new Game(timeLimit, ctx);
	    game.initializeGame(2000, player1, player2);
	  } else {
	    splashPage.style.display = 'none';
	    gameView.style.display = 'none';
	    waiting.style.display = 'unset';
	  }
	}

	inputDiv.onkeydown = e => {
	  socket.emit('typedForward', {
	    inputId: 'forward',
	    state: true,
	    wpm: game.wpm.currentWPM
	  });
	};
	inputDiv.onkeyup = e => {
	  socket.emit('typedForward', {
	    inputId: 'forward',
	    state: false,
	    wpm: game.wpm.currentWPM
	  });
	};
	socket.on('newPosition', pack => {
	  if (typeof player1 === 'undefined' || typeof player2 === 'undefined') {
	    return;
	  } else if (player1.car === null || player2.car === null) {
	    return;
	  } else if (pack !== null) {
	    ctx.clearRect(0, 0, WIDTH, 350);
	    player1.car.drawRaceTrack();
	    i = pack.length - 2;
	    player1.car.drawCar(pack[i].x);
	    player2.car.drawCar(pack[i + 1].x);
	  }
	  if (game.time.timer === 0) {
	    clearInterval(interval);
	  }
	});

	document.addEventListener('click', e => {
	  if (e.target.id === 'ready-button') {
	    document.getElementsByClassName('default')[0].style.display = 'none';
	    socket.emit('ready');
	    document.getElementsByClassName('waiting')[0].style.display = 'block';
	  }
	});
	let interval = null;
	socket.on('both players ready', startgame);
	function startgame() {
	  document.getElementsByClassName('waiting')[0].style.display = 'none';
	  document.getElementsByClassName('countdown')[0].style.display = 'block';
	  setTimeout(function () {
	    document.getElementById('ready').style.display = 'none';
	  }, 1000);
	  setTimeout(game.startCountingTime(), 2000);
	  triggerGetPosition();
	}
	function triggerGetPosition() {
	  // console.log('trigger called');
	  interval = setInterval(() => getpostion(), 1000);
	  // console.log(interval);
	}
	function getpostion() {
	  // console.log('get position');
	  socket.emit('get position');
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const randomWords = __webpack_require__(2);
	const Timer = __webpack_require__(3);
	const WordCalculation = __webpack_require__(4);
	const Typing = __webpack_require__(5);

	class Game {
	  constructor(maxTime) {
	    this.intervalId = null;
	    this.wordsArray = [];
	    this.players = [];
	    this.time = new Timer(maxTime, this);
	    this.wpm = new WordCalculation();
	    this.typing;
	  }
	  initializeGame(numWords, ...players) {
	    const inputDiv = document.getElementById('user-typing');
	    const racetrack = document.getElementById('racetrack');
	    const redcar = document.getElementById('redcar');
	    const greencar = document.getElementById('greencar');
	    const WIDTH = window.innerWidth;

	    this.generateWords(numWords);
	    this.players = players;
	    this.players.forEach(player => player.assignCar());

	    inputDiv.contentEditable = true;
	    // inputDiv.focus();
	    this.typing = new Typing(this, this.wpm, this.wordsArray);
	    this.typing.highlightCurrentWord(0, this.wordsArray);

	    const ctx = document.getElementById('canvas').getContext('2d');
	    ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
	    ctx.drawImage(redcar, 10, 50, 110, 65);
	    ctx.drawImage(greencar, 10, 200, 110, 65);
	  }
	  startCountingTime() {
	    const inputDiv = document.getElementById('user-typing');
	    inputDiv.focus();
	    this.intervalId = setInterval(this.time.decrementSeconds.bind(this.time), 1000);
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
	    this.wpm.displayResults(this.time, this.typing.typedWord, this.typing.numCorrect, this.typing.numWrong);
	  }
	  // continueGame(){
	  //   const ctx = document.getElementById('canvas').getContext('2d');
	  //   const WIDTH = window.innerWidth;
	  //   let player1 = this.players[0];
	  //   let player2 = this.players[1];
	  //   ctx.clearRect(0, 0, WIDTH, 350);
	  //   player1.car.drawRaceTrack();
	  //   let x;
	  //   let forward = this.typing.typingForward;
	  //   let backward = this.typing.typingBackward;
	  //   this.players.forEach( player => {
	  //     x = player.updatePosition(this.wpm.currentWPM, forward, backward)
	  //   })
	  //   player1.car.drawCar(x);
	  //   player2.car.drawCar(x);
	  // }
	  generateWords(numWords) {
	    const textDiv = document.getElementById('text');
	    let words = randomWords(numWords).join(' ');
	    this.wordsArray = this.wordsArray.concat(words.split(' '));
	    textDiv.innerHTML += `${ words } `;
	  }
	  handleClick(e) {
	    if (e.target.id === 'end-game' || e.target.id === 'game-controller') {
	      this.gameOver(this.time);
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
/* 3 */
/***/ function(module, exports) {

	const bar = document.getElementById('bar');
	class Timer {
	  constructor(maxTime, game) {
	    this.maxTime = maxTime;
	    this.timeLeft = maxTime;
	    this.width = 100; //timer starts at 100%
	    this.game = game;
	  }
	  displayTimer() {
	    bar.style.width = this.width + '%';
	  }
	  decrementSeconds() {
	    const decrementFactor = 100 / this.maxTime;
	    this.timeLeft--;
	    this.width -= decrementFactor;

	    if (this.width <= 0) {
	      this.width = 0;
	    }
	    this.displayTimer();
	    this.game.wpm.calculateWPM(this, this.game.typing.numCorrect);
	    this.game.wpm.displayWPM();

	    if (this.timer === 0) {
	      this.game.gameOver(this.timer, this.game.typing.numWrong);
	    }
	  }
	}
	module.exports = Timer;

/***/ },
/* 4 */
/***/ function(module, exports) {

	class WordCalculation {
	  constructor() {
	    this.currentWPM = 0;
	    this.totalTime = 0;
	  }
	  calculateWPM(time, right) {
	    // time object
	    this.totalTime = time.initialTime;
	    let currentTimeLeft = this.totalTime - time.timer;
	    this.currentWPM = Math.floor(right / currentTimeLeft * 60);
	  }
	  adjustedWPM(right, wrong) {
	    // time object
	    let adjusted = this.currentWPM - wrong / this.totalTime * 60;
	    return adjusted <= 0 ? 0 : adjusted;
	  }
	  accuracy(right, wrong) {
	    return Math.floor(right / (wrong + right) * 100);
	  }
	  displayWPM() {
	    const wpmDiv = document.getElementById('wpm');
	    let span = document.getElementsByClassName('wpm')[1];
	    wpmDiv.removeChild(span);
	    wpmDiv.appendChild(this.createSpan(this.currentWPM, 'wpm'));
	  }
	  displayResults(time, text, right, wrong, actualText) {
	    const resultDivs = document.getElementsByClassName('result');
	    let adjusted = this.adjustedWPM(right, wrong);
	    let accuracy = this.accuracy(right, wrong);
	    resultDivs[0].appendChild(this.createSpan(this.currentWPM, 'WPM'));
	    resultDivs[1].appendChild(this.createSpan(adjusted, 'WPM'));
	    resultDivs[2].appendChild(this.createSpan(accuracy, '%'));
	  }
	  createSpan(num, unit) {
	    const span = document.createElement('span');
	    span.textContent = `${ num } ${ unit }`;
	    span.className = 'wpm';
	    return span;
	  }
	}
	module.exports = WordCalculation;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const moveCursor = __webpack_require__(6);
	const inputDiv = document.getElementById('user-typing');
	const textDiv = document.getElementById('text');

	class Typing {
	  constructor(game, wpm, wordsArray) {
	    this.cursorPos = 0;
	    this.wordsArray = wordsArray;
	    this.numCorrect = 0;
	    this.game = game;
	    this.currentWord = "";
	    this.lastWord = "";

	    inputDiv.addEventListener('keydown', this.handleKeyEvent.bind(this));
	  }
	  isCorrectWord() {
	    //logic to check the word that just typed
	    return this.lastWord === this.getWord(this.cursorPos);
	    debugger;
	  }
	  displayWords() {
	    this.removeWord();
	    let span = document.createElement('span');
	    span.textContent = `${ this.lastWord } `;
	    if (this.isCorrectWord()) {
	      span.className = 'gray';
	      this.numCorrect++;
	    } else {
	      span.className = 'red';
	    }
	    inputDiv.appendChild(span);
	  }
	  removeWord() {
	    if (inputDiv.childElementCount < 1) {
	      inputDiv.textContent = "";
	    } else {
	      inputDiv.lastChild.innerText = inputDiv.lastChild.innerText.slice(0, inputDiv.lastChild.innerText.length - this.lastWord.length);
	    }
	  }
	  handleKeyEvent(e) {
	    const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

	    let span = document.createElement('span');
	    if (e.keyCode === 32) {
	      // space
	      this.highlightCurrentWord(this.cursorPos + 1);
	      this.displayWords();
	      this.lastWord = ""; // reset lastWord Typed

	      moveCursor(inputDiv); // move the pointer
	      this.cursorPos++;
	      document.execCommand('forecolor', false, '000000');
	    } else if (e.keyCode === 8) {
	      // backspace
	      // 2 scenario to delete
	      //1. in the middle of a word
	      //2. finished wrting the word, and going backward to modify it
	      // 3. if there are no more typed input, exit

	      if (inputDiv.textContent === "") return;

	      if (this.lastWord.length > 0) {
	        // backspace w/in same word
	        this.lastWord = this.lastWord.slice(0, this.lastWord.length - 1); // modify the lastword tracker
	      } else {
	        let lastInput = inputDiv.lastChild.textContent;
	        this.lastWord = lastInput.split(' ').pop();
	        this.lastWord = this.lastWord.slice(0, this.lastWord.length - 1);

	        // move the cursor position back
	        this.cursorPos--;
	        this.highlightCurrentWord(this.cursorPos);
	      }
	    } else if (alphabet.includes(e.key.toLowerCase())) {
	      this.typedWord += e.key;
	      this.lastWord += e.key;
	    } else {
	      e.preventDefault();
	    }
	  }
	  getWord(position) {
	    if (typeof this.wordsArray[position] !== 'undefined') {
	      // as long as there's a word at that position
	      this.currentWord = this.wordsArray[position];
	    } else {
	      this.currentWord = "";
	    }
	    return this.currentWord;
	  }
	  highlightCurrentWord(position) {
	    this.getWord(position);
	    const currentWordSpan = document.createElement('span');
	    currentWordSpan.textContent = `${ this.currentWord } `;

	    const highlightedElement = document.getElementsByClassName("highlight")[0];
	    if (highlightedElement) {
	      highlightedElement.nextSibling.textContent = "";
	      textDiv.removeChild(highlightedElement);
	    } else {
	      textDiv.textContent = "";
	    }
	    currentWordSpan.className = 'highlight';
	    textDiv.appendChild(currentWordSpan);

	    let remainingString = this.wordsArray.slice(position + 1, this.wordsArray.length).join(" ");
	    textDiv.appendChild(document.createTextNode(remainingString));
	  }

	}
	module.exports = Typing;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Car = __webpack_require__(8);

	class Player {
	  constructor(id, socketId, maxTime) {
	    this.id = id;
	    this.car = null;
	  }
	  assignCar() {
	    const redcar = document.getElementById('redcar');
	    const greencar = document.getElementById('greencar');
	    const ctx = document.getElementById('canvas').getContext('2d');
	    if (this.id === 1) {
	      this.car = new Car(10, 50, redcar, ctx);
	    } else {
	      this.car = new Car(10, 200, greencar, ctx);
	    }
	  }
	}
	module.exports = Player;

/***/ },
/* 8 */
/***/ function(module, exports) {

	class Car {
	  constructor(x, y, img, ctx) {
	    this.x = x;
	    this.y = y;
	    this.img = img;
	    this.spd = 0;
	    this.ctx = ctx;
	    this.imgWidth = 100;
	    this.imgHeight = 60;
	  }
	  moveCarForward(wpm) {
	    this.updateSpd(wpm);
	    this.x += this.spd;
	    return this.x;
	  }
	  moveCarBackward(wpm) {
	    this.updateSpd(wpm);
	    this.x -= this.spd;
	    return this.x;
	    // this.ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
	  }
	  drawRaceTrack() {
	    const racetrack = document.getElementById('racetrack');
	    const width = window.innerWidth;
	    this.ctx.clearRect(0, 0, width, 350);
	    this.ctx.drawImage(racetrack, 0, 0, width, 350);
	  }
	  drawCar(x) {
	    this.ctx.drawImage(this.img, x, this.y, this.imgWidth, this.imgHeight);
	  }
	}
	module.exports = Car;

/***/ }
/******/ ]);