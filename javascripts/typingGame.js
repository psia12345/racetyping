const Game = require('./game');
import highlightCurrentWord from './highlightText';
const analyzeWPM = require('./analyzeWPM');
const Typing = require('./typingLogic');

document.addEventListener("DOMContentLoaded", function(){
    let game = new Game(5);
    let wpm = new analyzeWPM;
    game.initializeGame(10);
    let wordsArray = game.wordsArray;
    highlightCurrentWord(0, wordsArray);
    new Typing(game);
});
