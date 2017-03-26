const Car = require('./car');

class Player {
  constructor(id, socketId, maxTime){
    this.id = id;
    this.car = null; 
  }
  assignCar(){
    const redcar = document.getElementById('redcar');
    const greencar = document.getElementById('greencar');
    const ctx = document.getElementById('canvas').getContext('2d');
    if (this.id === 1 ){
      this.car = new Car(10, 50, redcar, ctx);
    } else {
      this.car = new Car(10, 200, greencar, ctx);
    }
  }
}
module.exports = Player;
