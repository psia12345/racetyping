class Car{
  constructor(x, y, img, ctx){
    this.x = x;
    this.y = y;
    this.img = img;
    this.spd = 0;
    this.ctx = ctx;
    this.imgWidth = 100;
    this.imgHeight = 60;
  }
  moveCarForward(wpm){
    this.updateSpd(wpm);
    this.x += this.spd;
    return this.x;
  }
  moveCarBackward(wpm){
    this.updateSpd(wpm);
    this.x -= this.spd;
    return this.x;
    // this.ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
  }
  drawRaceTrack(){
    const racetrack = document.getElementById('racetrack');
    const width = window.innerWidth;
    this.ctx.clearRect(0, 0, width, 350);
    this.ctx.drawImage(racetrack, 0, 0, width, 350);
  }
  drawCar(x){
    this.ctx.drawImage(this.img, x, this.y, this.imgWidth, this.imgHeight);
  }
}
module.exports = Car;
