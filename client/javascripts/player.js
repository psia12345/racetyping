const Car = require('./car');

class Player {
  constructor(id, socketId){
    this.id = id;
    this.socketId = socketId; 
    this.typingForward = false;
    this.typingBackward = false;
    this.car = null;
  }
  updatePosition(wpm){
    if(this.typingForward){
      this.car.moveCarForward(wpm);
    } else if (this.typingBackward) {
      this.car.moveCarBackward(wpm);
    }
  }
  drawCar(){
    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');
    const ctx = document.getElementById('canvas').getContext('2d');
    if (this.id === 1 ){
      this.car = new Car(50, 100, redcar, ctx);
    } else {
      this.car = new Car(50, 250, greencar, ctx);
    }
  }
}
module.exports = Player;
