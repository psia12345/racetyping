const divCanvasContainer = document.getElementById('canvas-container');
const canvas = document.getElementById('canvas');
const WIDTH = window.innerWidth;
canvas.width = WIDTH;
const ctx = canvas.getContext('2d');
// const HEIGHT = Math.max(window.innerHeight);
const racetrack = document.getElementById('racetrack');
const redcar = document.getElementById('redcar');
const greencar = document.getElementById('greencar');
ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
ctx.drawImage(redcar, 10, 50, 110, 65)
ctx.drawImage(greencar, 10, 200, 110, 65)
let animationId;

const moveCars = (redPos, redVel, greenPos, greenVel) => {
  ctx.clearRect(0, 0, WIDTH, 350);
  ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
  ctx.drawImage(redcar, redPos, 50, 110, 65);
  redPos += redVel;
  ctx.drawImage(greencar, greenPos, 200, 110, 65);
  greenPos += greenVel;
  animationId = requestAnimationFrame(function(){
    moveCars(redPos, redVel, greenPos, greenVel);
  })
}
// to move cars
requestAnimationFrame(function(){
  moveCars(0, 1200/300, 0, 1);
})

const stopCar = () => {
  cancelAnimationFrame(animationId);
}
setTimeout(stopCar, 5000);
