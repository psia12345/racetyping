const Game = require('./game');
import highlightCurrentWord from './highlightText';
const analyzeWPM = require('./analyzeWPM');
const divCanvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const WIDTH = window.innerWidth;
canvas.width = WIDTH;
const ctx = canvas.getContext('2d');

document.addEventListener("DOMContentLoaded", function(){
    let wpm = new analyzeWPM;
    let game = new Game(5, ctx, wpm);
    game.initializeGame(10);
    let wordsArray = game.wordsArray;
    highlightCurrentWord(0, wordsArray);
});
