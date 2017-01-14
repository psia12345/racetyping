const Car = require('./car');

class Player {
  constructor(id, socketId, maxTime){
    this.id = id;
    this.socketId = socketId;
    this.typingForward = false;
    this.typingBackward = false;
    this.car = null;
    this.x = 10;
    this.wpm = 0;
    this.spd = 0;
  }
  updatePosition(wpm){
    console.log('player', this.id)
    console.log('wpm', wpm);
    if (isNaN(wpm)){
      wpm = 0
    }
    console.log('after wpm', wpm);
    if(this.typingForward){
      this.x += this.updateSpd(wpm) + 1;
    } else if (this.typingBackward) {
      this.x -= this.updateSpd(wpm) - 1;
    }
    console.log('x', this.x);
    console.log('**************');
    return this.x;
  }
  updateSpd(wpm){
    //can use switch-case statement here
    if (wpm === 0){
      this.spd = 0;
    } else if (wpm <= 20){
      this.spd = 1;
    } else if (wpm <= 40){
      this.spd = 2;
    } else if (wpm <= 60){
      this.spd = 3;
    } else if (wpm <= 80){
      this.spd = 4;
    } else if (wpm <= 100){
      this.spd = 5;
    } else {
      this.spd = 6;
    }
    console.log('spd', this.spd);
    return this.spd;
  }
  assignCar(){
    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');
    const ctx = document.getElementById('canvas').getContext('2d');
    if (this.id === 1 ){
      this.car = new Car(this.x, 50, redcar, ctx);
    } else {
      this.car = new Car(this.x, 200, greencar, ctx);
    }
  }
}
module.exports = Player;
