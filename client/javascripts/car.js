
class Car{
  constructor(x, y, img, ctx){
    this.x = x;
    this.y = y;
    this.img = img;
    this.spd = 0;
    this.ctx = ctx;
  }
  moveCarForward(wpm){
    this.updateSpd(wpm);
    this.x += this.spd;
    console.log(this.x);
    this.ctx.drawImage(this.img, this.x, this.y, 110, 65);
  }
  moveCarBackward(wpm){
    this.updateSpd(wpm);
    this.x -= this.spd;
  }
  drawRaceTrack(){
    const racetrack = document.getElementById('racetrack');
    const width = window.innerWidth;
    this.ctx.clearRect(0, 0, width, 350);
    this.ctx.drawImage(racetrack, 0, 0, width, 350);
  }
  updateSpd(wpm){
    //can use switch-case statement here
    if (wpm === 0){
      this.spd = 0;
    } else if (wpm <= 20){
      this.spd = 0.2;
    } else if (wpm <= 40){
      this.spd = 0.4;
    } else if (wpm <= 60){
      this.spd = 0.6;
    } else if (wpm <= 80){
      this.spd = 0.8;
    } else if (wpm <= 100){
      this.spd = 1;
    } else {
      this.spd = 1.2;
    }
  }

}
module.exports = Car;

// const divCanvasContainer = document.getElementById('canvas-container');
// const canvas = document.getElementById('canvas');
// const WIDTH = window.innerWidth;
// canvas.width = WIDTH;
// const ctx = canvas.getContext('2d');
// // const HEIGHT = Math.max(window.innerHeight);
// const racetrack = document.getElementById('racetrack');
// const redcar = document.getElementById('redcar');
// const greencar = document.getElementById('greencar');
// ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
// ctx.drawImage(redcar, 10, 50, 110, 65)
// ctx.drawImage(greencar, 10, 200, 110, 65)
// let animationId;
//
// const moveCars = (redPos, redVel, greenPos, greenVel) => {
//   ctx.clearRect(0, 0, WIDTH, 350);
//   ctx.drawImage(racetrack, 0, 0, WIDTH, 350);
//   ctx.drawImage(redcar, redPos, 50, 110, 65);
//   redPos += redVel;
//   ctx.drawImage(greencar, greenPos, 200, 110, 65);
//   greenPos += greenVel;
//   animationId = requestAnimationFrame(function(){
//     moveCars(redPos, redVel, greenPos, greenVel);
//   })
// }
// // to move cars
// requestAnimationFrame(function(){
//   moveCars(0, 1200/300, 0, 1);
// })
//
// const stopCar = () => {
//   cancelAnimationFrame(animationId);
// }
// setTimeout(stopCar, 5000);
