import generateText from './generateText';

const divCanvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = Math.max(window.innerWidth * 0.8 || 0);
const HEIGHT = Math.max(window.innerHeight * 0.8 || 0);

const pText = document.getElementById('text');
let words = generateText();
pText.textContent = words;
console.log(words);

const moveText = () => {

}
