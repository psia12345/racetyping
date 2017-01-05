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
	
	var _highlightText = __webpack_require__(2);
	
	var _highlightText2 = _interopRequireDefault(_highlightText);
	
	var _randomWords = __webpack_require__(3);
	
	var _randomWords2 = _interopRequireDefault(_randomWords);
	
	var _moveCursor = __webpack_require__(4);
	
	var _moveCursor2 = _interopRequireDefault(_moveCursor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Timer = __webpack_require__(1);
	var analyzeWPM = __webpack_require__(5);
	
	var pText = document.getElementById('text');
	var words = (0, _randomWords2.default)(5).join(' ');
	pText.textContent = words;
	var modal = document.getElementById('modal');
	
	var cursorPos = 0;
	var numWrong = 0;
	var numCorrect = 0;
	var wordsArray = words.split(" ");
	var laterString = "";
	var typedWord = "";
	var time = new Timer(0);
	var intervalId = void 0;
	var wpm = new analyzeWPM();
	
	var initializeGame = function initializeGame() {
	  time.timer++;
	  time.displayTimer();
	  intervalId = setInterval(time.incrementSeconds.bind(time), 1000);
	};
	
	var gameOver = function gameOver(cursorPos) {
	  if (cursorPos === wordsArray.length) {
	    window.clearInterval(intervalId);
	    modal.style.display = 'block';
	    wpm.displayResults(time.timer, input.textContent, numWrong, numCorrect);
	  }
	};
	
	var input = document.getElementById('user-typing');
	input.addEventListener('keydown', function (e) {
	  if (time.timer === 0) {
	    initializeGame();
	    (0, _highlightText2.default)(cursorPos, wordsArray);
	  } // starts timer if it's hasn't started already
	
	  var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
	  var lastWord = typedWord.split(" ")[cursorPos];
	  var sentenceLength = input.innerHTML.length;
	  wpm.display(time.timer, input.textContent);
	
	  if (e.keyCode === 32) {
	    // space
	    (0, _highlightText2.default)(cursorPos + 1, wordsArray);
	    input.innerHTML = input.innerHTML.slice(0, sentenceLength - lastWord.length);
	    typedWord += " "; // add space
	    if (wordsArray[cursorPos] === lastWord) {
	      numCorrect++;
	      input.innerHTML += '<font color="gray">' + lastWord + '</font>';
	    } else {
	      numWrong++;
	      input.innerHTML += '<font color="red">' + lastWord + '</font>';
	    }
	    (0, _moveCursor2.default)(input);
	    cursorPos++;
	    document.execCommand('forecolor', false, '000000');
	  } else if (e.keyCode === 8) {
	    // backspace
	    var lastChar = typedWord[typedWord.length - 1];
	    var typedSentence = typedWord.split(' '); //input.textContent.trim().split(" ");
	    var wordCount = typedSentence.length;
	    if (lastChar === " " && typedSentence[wordCount - 2] === wordsArray[cursorPos - 1]) {
	      numCorrect--;
	      cursorPos--;
	      typedWord = typedWord.slice(0, typedWord.length - 1);
	    } else if (lastChar === " " && typedSentence[wordCount - 2] !== wordsArray[cursorPos - 1]) {
	      numWrong--;
	      cursorPos--;
	      typedWord = typedWord.slice(0, typedWord.length - 1);
	    } else if (lastChar === " ") {
	      cursorPos--;
	      typedWord = typedWord.slice(0, typedWord.length - 1);
	    } else {
	      typedWord = typedWord.slice(0, typedWord.length - 1);
	    }
	    (0, _highlightText2.default)(cursorPos, wordsArray);
	    // missing some sort of input.innerHTML slice method to account for bug
	  } else if (alphabet.includes(e.key.toLowerCase())) {
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
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
	    key: 'incrementSeconds',
	    value: function incrementSeconds() {
	      this.timer++;
	      this.displayTimer();
	    }
	  }]);
	
	  return Timer;
	}();
	
	module.exports = Timer;

/***/ },
/* 2 */
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
	  if (typeof wordsArray[position] !== 'undefined') {
	    currentWord.textContent = wordsArray[position] + " ";
	  } else {
	    currentWord.textContent = "";
	  }
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	var wordList = [
	  // Borrowed from xkcd password generator which borrowed it from wherever
	  "ability","able","aboard","about","above","accept","accident","according",
	  "account","accurate","acres","across","act","action","active","activity",
	  "actual","actually","add","addition","additional","adjective","adult","adventure",
	  "advice","affect","afraid","after","afternoon","again","against","age",
	  "ago","agree","ahead","aid","air","airplane","alike","alive",
	  "all","allow","almost","alone","along","aloud","alphabet","already",
	  "also","although","am","among","amount","ancient","angle","angry",
	  "animal","announced","another","answer","ants","any","anybody","anyone",
	  "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
	  "appropriate","are","area","arm","army","around","arrange","arrangement",
	  "arrive","arrow","art","article","as","aside","ask","asleep",
	  "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
	  "attention","audience","author","automobile","available","average","avoid","aware",
	  "away","baby","back","bad","badly","bag","balance","ball",
	  "balloon","band","bank","bar","bare","bark","barn","base",
	  "baseball","basic","basis","basket","bat","battle","be","bean",
	  "bear","beat","beautiful","beauty","became","because","become","becoming",
	  "bee","been","before","began","beginning","begun","behavior","behind",
	  "being","believed","bell","belong","below","belt","bend","beneath",
	  "bent","beside","best","bet","better","between","beyond","bicycle",
	  "bigger","biggest","bill","birds","birth","birthday","bit","bite",
	  "black","blank","blanket","blew","blind","block","blood","blow",
	  "blue","board","boat","body","bone","book","border","born",
	  "both","bottle","bottom","bound","bow","bowl","box","boy",
	  "brain","branch","brass","brave","bread","break","breakfast","breath",
	  "breathe","breathing","breeze","brick","bridge","brief","bright","bring",
	  "broad","broke","broken","brother","brought","brown","brush","buffalo",
	  "build","building","built","buried","burn","burst","bus","bush",
	  "business","busy","but","butter","buy","by","cabin","cage",
	  "cake","call","calm","came","camera","camp","can","canal",
	  "cannot","cap","capital","captain","captured","car","carbon","card",
	  "care","careful","carefully","carried","carry","case","cast","castle",
	  "cat","catch","cattle","caught","cause","cave","cell","cent",
	  "center","central","century","certain","certainly","chain","chair","chamber",
	  "chance","change","changing","chapter","character","characteristic","charge","chart",
	  "check","cheese","chemical","chest","chicken","chief","child","children",
	  "choice","choose","chose","chosen","church","circle","circus","citizen",
	  "city","class","classroom","claws","clay","clean","clear","clearly",
	  "climate","climb","clock","close","closely","closer","cloth","clothes",
	  "clothing","cloud","club","coach","coal","coast","coat","coffee",
	  "cold","collect","college","colony","color","column","combination","combine",
	  "come","comfortable","coming","command","common","community","company","compare",
	  "compass","complete","completely","complex","composed","composition","compound","concerned",
	  "condition","congress","connected","consider","consist","consonant","constantly","construction",
	  "contain","continent","continued","contrast","control","conversation","cook","cookies",
	  "cool","copper","copy","corn","corner","correct","correctly","cost",
	  "cotton","could","count","country","couple","courage","course","court",
	  "cover","cow","cowboy","crack","cream","create","creature","crew",
	  "crop","cross","crowd","cry","cup","curious","current","curve",
	  "customs","cut","cutting","daily","damage","dance","danger","dangerous",
	  "dark","darkness","date","daughter","dawn","day","dead","deal",
	  "dear","death","decide","declared","deep","deeply","deer","definition",
	  "degree","depend","depth","describe","desert","design","desk","detail",
	  "determine","develop","development","diagram","diameter","did","die","differ",
	  "difference","different","difficult","difficulty","dig","dinner","direct","direction",
	  "directly","dirt","dirty","disappear","discover","discovery","discuss","discussion",
	  "disease","dish","distance","distant","divide","division","do","doctor",
	  "does","dog","doing","doll","dollar","done","donkey","door",
	  "dot","double","doubt","down","dozen","draw","drawn","dream",
	  "dress","drew","dried","drink","drive","driven","driver","driving",
	  "drop","dropped","drove","dry","duck","due","dug","dull",
	  "during","dust","duty","each","eager","ear","earlier","early",
	  "earn","earth","easier","easily","east","easy","eat","eaten",
	  "edge","education","effect","effort","egg","eight","either","electric",
	  "electricity","element","elephant","eleven","else","empty","end","enemy",
	  "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
	  "environment","equal","equally","equator","equipment","escape","especially","essential",
	  "establish","even","evening","event","eventually","ever","every","everybody",
	  "everyone","everything","everywhere","evidence","exact","exactly","examine","example",
	  "excellent","except","exchange","excited","excitement","exciting","exclaimed","exercise",
	  "exist","expect","experience","experiment","explain","explanation","explore","express",
	  "expression","extra","eye","face","facing","fact","factor","factory",
	  "failed","fair","fairly","fall","fallen","familiar","family","famous",
	  "far","farm","farmer","farther","fast","fastened","faster","fat",
	  "father","favorite","fear","feathers","feature","fed","feed","feel",
	  "feet","fell","fellow","felt","fence","few","fewer","field",
	  "fierce","fifteen","fifth","fifty","fight","fighting","figure","fill",
	  "film","final","finally","find","fine","finest","finger","finish",
	  "fire","fireplace","firm","first","fish","five","fix","flag",
	  "flame","flat","flew","flies","flight","floating","floor","flow",
	  "flower","fly","fog","folks","follow","food","foot","football",
	  "for","force","foreign","forest","forget","forgot","forgotten","form",
	  "former","fort","forth","forty","forward","fought","found","four",
	  "fourth","fox","frame","free","freedom","frequently","fresh","friend",
	  "friendly","frighten","frog","from","front","frozen","fruit","fuel",
	  "full","fully","fun","function","funny","fur","furniture","further",
	  "future","gain","game","garage","garden","gas","gasoline","gate",
	  "gather","gave","general","generally","gentle","gently","get","getting",
	  "giant","gift","girl","give","given","giving","glad","glass",
	  "globe","go","goes","gold","golden","gone","good","goose",
	  "got","government","grabbed","grade","gradually","grain","grandfather","grandmother",
	  "graph","grass","gravity","gray","great","greater","greatest","greatly",
	  "green","grew","ground","group","grow","grown","growth","guard",
	  "guess","guide","gulf","gun","habit","had","hair","half",
	  "halfway","hall","hand","handle","handsome","hang","happen","happened",
	  "happily","happy","harbor","hard","harder","hardly","has","hat",
	  "have","having","hay","he","headed","heading","health","heard",
	  "hearing","heart","heat","heavy","height","held","hello","help",
	  "helpful","her","herd","here","herself","hidden","hide","high",
	  "higher","highest","highway","hill","him","himself","his","history",
	  "hit","hold","hole","hollow","home","honor","hope","horn",
	  "horse","hospital","hot","hour","house","how","however","huge",
	  "human","hundred","hung","hungry","hunt","hunter","hurried","hurry",
	  "hurt","husband","ice","idea","identity","if","ill","image",
	  "imagine","immediately","importance","important","impossible","improve","in","inch",
	  "include","including","income","increase","indeed","independent","indicate","individual",
	  "industrial","industry","influence","information","inside","instance","instant","instead",
	  "instrument","interest","interior","into","introduced","invented","involved","iron",
	  "is","island","it","its","itself","jack","jar","jet",
	  "job","join","joined","journey","joy","judge","jump","jungle",
	  "just","keep","kept","key","kids","kill","kind","kitchen",
	  "knew","knife","know","knowledge","known","label","labor","lack",
	  "lady","laid","lake","lamp","land","language","large","larger",
	  "largest","last","late","later","laugh","law","lay","layers",
	  "lead","leader","leaf","learn","least","leather","leave","leaving",
	  "led","left","leg","length","lesson","let","letter","level",
	  "library","lie","life","lift","light","like","likely","limited",
	  "line","lion","lips","liquid","list","listen","little","live",
	  "living","load","local","locate","location","log","lonely","long",
	  "longer","look","loose","lose","loss","lost","lot","loud",
	  "love","lovely","low","lower","luck","lucky","lunch","lungs",
	  "lying","machine","machinery","mad","made","magic","magnet","mail",
	  "main","mainly","major","make","making","man","managed","manner",
	  "manufacturing","many","map","mark","market","married","mass","massage",
	  "master","material","mathematics","matter","may","maybe","me","meal",
	  "mean","means","meant","measure","meat","medicine","meet","melted",
	  "member","memory","men","mental","merely","met","metal","method",
	  "mice","middle","might","mighty","mile","military","milk","mill",
	  "mind","mine","minerals","minute","mirror","missing","mission","mistake",
	  "mix","mixture","model","modern","molecular","moment","money","monkey",
	  "month","mood","moon","more","morning","most","mostly","mother",
	  "motion","motor","mountain","mouse","mouth","move","movement","movie",
	  "moving","mud","muscle","music","musical","must","my","myself",
	  "mysterious","nails","name","nation","national","native","natural","naturally",
	  "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
	  "needed","needle","needs","negative","neighbor","neighborhood","nervous","nest",
	  "never","new","news","newspaper","next","nice","night","nine",
	  "no","nobody","nodded","noise","none","noon","nor","north",
	  "nose","not","note","noted","nothing","notice","noun","now",
	  "number","numeral","nuts","object","observe","obtain","occasionally","occur",
	  "ocean","of","off","offer","office","officer","official","oil",
	  "old","older","oldest","on","once","one","only","onto",
	  "open","operation","opinion","opportunity","opposite","or","orange","orbit",
	  "order","ordinary","organization","organized","origin","original","other","ought",
	  "our","ourselves","out","outer","outline","outside","over","own",
	  "owner","oxygen","pack","package","page","paid","pain","paint",
	  "pair","palace","pale","pan","paper","paragraph","parallel","parent",
	  "park","part","particles","particular","particularly","partly","parts","party",
	  "pass","passage","past","path","pattern","pay","peace","pen",
	  "pencil","people","per","percent","perfect","perfectly","perhaps","period",
	  "person","personal","pet","phrase","physical","piano","pick","picture",
	  "pictured","pie","piece","pig","pile","pilot","pine","pink",
	  "pipe","pitch","place","plain","plan","plane","planet","planned",
	  "planning","plant","plastic","plate","plates","play","pleasant","please",
	  "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
	  "point","pole","police","policeman","political","pond","pony","pool",
	  "poor","popular","population","porch","port","position","positive","possible",
	  "possibly","post","pot","potatoes","pound","pour","powder","power",
	  "powerful","practical","practice","prepare","present","president","press","pressure",
	  "pretty","prevent","previous","price","pride","primitive","principal","principle",
	  "printed","private","prize","probably","problem","process","produce","product",
	  "production","program","progress","promised","proper","properly","property","protection",
	  "proud","prove","provide","public","pull","pupil","pure","purple",
	  "purpose","push","put","putting","quarter","queen","question","quick",
	  "quickly","quiet","quietly","quite","rabbit","race","radio","railroad",
	  "rain","raise","ran","ranch","range","rapidly","rate","rather",
	  "raw","rays","reach","read","reader","ready","real","realize",
	  "rear","reason","recall","receive","recent","recently","recognize","record",
	  "red","refer","refused","region","regular","related","relationship","religious",
	  "remain","remarkable","remember","remove","repeat","replace","replied","report",
	  "represent","require","research","respect","rest","result","return","review",
	  "rhyme","rhythm","rice","rich","ride","riding","right","ring",
	  "rise","rising","river","road","roar","rock","rocket","rocky",
	  "rod","roll","roof","room","root","rope","rose","rough",
	  "round","route","row","rubbed","rubber","rule","ruler","run",
	  "running","rush","sad","saddle","safe","safety","said","sail",
	  "sale","salmon","salt","same","sand","sang","sat","satellites",
	  "satisfied","save","saved","saw","say","scale","scared","scene",
	  "school","science","scientific","scientist","score","screen","sea","search",
	  "season","seat","second","secret","section","see","seed","seeing",
	  "seems","seen","seldom","select","selection","sell","send","sense",
	  "sent","sentence","separate","series","serious","serve","service","sets",
	  "setting","settle","settlers","seven","several","shade","shadow","shake",
	  "shaking","shall","shallow","shape","share","sharp","she","sheep",
	  "sheet","shelf","shells","shelter","shine","shinning","ship","shirt",
	  "shoe","shoot","shop","shore","short","shorter","shot","should",
	  "shoulder","shout","show","shown","shut","sick","sides","sight",
	  "sign","signal","silence","silent","silk","silly","silver","similar",
	  "simple","simplest","simply","since","sing","single","sink","sister",
	  "sit","sitting","situation","six","size","skill","skin","sky",
	  "slabs","slave","sleep","slept","slide","slight","slightly","slip",
	  "slipped","slope","slow","slowly","small","smaller","smallest","smell",
	  "smile","smoke","smooth","snake","snow","so","soap","social",
	  "society","soft","softly","soil","solar","sold","soldier","solid",
	  "solution","solve","some","somebody","somehow","someone","something","sometime",
	  "somewhere","son","song","soon","sort","sound","source","south",
	  "southern","space","speak","special","species","specific","speech","speed",
	  "spell","spend","spent","spider","spin","spirit","spite","split",
	  "spoken","sport","spread","spring","square","stage","stairs","stand",
	  "standard","star","stared","start","state","statement","station","stay",
	  "steady","steam","steel","steep","stems","step","stepped","stick",
	  "stiff","still","stock","stomach","stone","stood","stop","stopped",
	  "store","storm","story","stove","straight","strange","stranger","straw",
	  "stream","street","strength","stretch","strike","string","strip","strong",
	  "stronger","struck","structure","struggle","stuck","student","studied","studying",
	  "subject","substance","success","successful","such","sudden","suddenly","sugar",
	  "suggest","suit","sum","summer","sun","sunlight","supper","supply",
	  "support","suppose","sure","surface","surprise","surrounded","swam","sweet",
	  "swept","swim","swimming","swing","swung","syllable","symbol","system",
	  "table","tail","take","taken","tales","talk","tall","tank",
	  "tape","task","taste","taught","tax","tea","teach","teacher",
	  "team","tears","teeth","telephone","television","tell","temperature","ten",
	  "tent","term","terrible","test","than","thank","that","thee",
	  "them","themselves","then","theory","there","therefore","these","they",
	  "thick","thin","thing","think","third","thirty","this","those",
	  "thou","though","thought","thousand","thread","three","threw","throat",
	  "through","throughout","throw","thrown","thumb","thus","thy","tide",
	  "tie","tight","tightly","till","time","tin","tiny","tip",
	  "tired","title","to","tobacco","today","together","told","tomorrow",
	  "tone","tongue","tonight","too","took","tool","top","topic",
	  "torn","total","touch","toward","tower","town","toy","trace",
	  "track","trade","traffic","trail","train","transportation","trap","travel",
	  "treated","tree","triangle","tribe","trick","tried","trip","troops",
	  "tropical","trouble","truck","trunk","truth","try","tube","tune",
	  "turn","twelve","twenty","twice","two","type","typical","uncle",
	  "under","underline","understanding","unhappy","union","unit","universe","unknown",
	  "unless","until","unusual","up","upon","upper","upward","us",
	  "use","useful","using","usual","usually","valley","valuable","value",
	  "vapor","variety","various","vast","vegetable","verb","vertical","very",
	  "vessels","victory","view","village","visit","visitor","voice","volume",
	  "vote","vowel","voyage","wagon","wait","walk","wall","want",
	  "war","warm","warn","was","wash","waste","watch","water",
	  "wave","way","we","weak","wealth","wear","weather","week",
	  "weigh","weight","welcome","well","went","were","west","western",
	  "wet","whale","what","whatever","wheat","wheel","when","whenever",
	  "where","wherever","whether","which","while","whispered","whistle","white",
	  "who","whole","whom","whose","why","wide","widely","wife",
	  "wild","will","willing","win","wind","window","wing","winter",
	  "wire","wise","wish","with","within","without","wolf","women",
	  "won","wonder","wonderful","wood","wooden","wool","word","wore",
	  "work","worker","world","worried","worry","worse","worth","would",
	  "wrapped","write","writer","writing","written","wrong","wrote","yard",
	  "year","yellow","yes","yesterday","yet","you","young","younger",
	  "your","yourself","youth","zero","zoo"
	];
	
	function words(options) {
	  function word() {
	    return wordList[randInt(wordList.length)];
	  }
	
	  function randInt(lessThan) {
	    return Math.floor(Math.random() * lessThan);
	  }
	
	  // No arguments = generate one word
	  if (typeof(options) === 'undefined') {
	    return word();
	  }
	
	  // Just a number = return that many words
	  if (typeof(options) === 'number') {
	    options = { exactly: options };
	  }
	
	  // options supported: exactly, min, max, join
	
	  if (options.exactly) {
	    options.min = options.exactly;
	    options.max = options.exactly;
	  }
	  var total = options.min + randInt(options.max + 1 - options.min);
	  var results = [];
	  for (var i = 0; (i < total); i++) {
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
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	
	exports.default = moveCursor;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var analyzeWPM = function () {
	  function analyzeWPM() {
	    _classCallCheck(this, analyzeWPM);
	  }
	
	  _createClass(analyzeWPM, [{
	    key: 'calculateWPM',
	    value: function calculateWPM(time, text) {
	      var span = document.createElement('span');
	      span.textContent = Math.floor(text.length / 5 / time * 60);
	      span.className = 'number';
	      return span;
	    }
	  }, {
	    key: 'adjustedWPM',
	    value: function adjustedWPM(time, text, wrong) {
	      var span = document.createElement('span');
	      var wpm = text.length / 5;
	      wpm = Math.floor((wpm - wrong) / time * 60);
	      span.textContent = wpm;
	      span.className = 'number';
	      return span;
	    }
	    // accuracy(wrong, correct){
	    //   debugger;
	    //   const span = document.createElement('span');
	    //   let total = correct + wrong;
	    //   span.textContent = Math.floor((correct - wrong) / total * 100) + " %";
	    //   span.className = 'number';
	    //   return span;
	    // }
	
	  }, {
	    key: 'charInMin',
	    value: function charInMin(time, text) {
	      var span = document.createElement('span');
	      span.textContent = Math.floor(text.length / time * 60);
	      span.className = 'number';
	      return span;
	    }
	  }, {
	    key: 'display',
	    value: function display(time, text) {
	      var wpmDiv = document.getElementById('wpm');
	      var span = document.getElementsByClassName('number')[0];
	      if (typeof span !== 'undefined') wpmDiv.removeChild(span);
	      wpmDiv.appendChild(this.calculateWPM(time, text));
	    }
	  }, {
	    key: 'displayResults',
	    value: function displayResults(time, text, wrong, actualText) {
	      var resultDivs = document.getElementsByClassName('result');
	      resultDivs[0].appendChild(this.calculateWPM(time, text));
	      resultDivs[1].appendChild(this.adjustedWPM(time, text, wrong));
	      resultDivs[2].appendChild(this.charInMin(time, text));
	      // resultDivs[2].appendChild(this.accuracy(typedtext, actualText));
	    }
	  }]);
	
	  return analyzeWPM;
	}();
	
	module.exports = analyzeWPM;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map