class Car{
  constructor(x, y, img, ctx){
    this.x = x;
    this.y = y;
    this.img = img;
    this.spd = 0;
    this.ctx = ctx;
    this.imgWidth = 110;
    this.imgHeight = 65;
  }
  moveCarForward(wpm){
    this.updateSpd(wpm);
    this.x += this.spd;
    console.log(this.x);
    this.ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
  }
  moveCarBackward(wpm){
    this.updateSpd(wpm);
    this.x -= this.spd;
    this.ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight);
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
