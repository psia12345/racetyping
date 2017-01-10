// const Entity = require('./entity');
const Car = require('./car');

class Player {
  constructor(id, x, y, img, ctx){
    this.id = id;
    this.typingForward = false;
    this.typingBackward = false;
    this.img = img;
    this.ctx = document.getElementById('canvas').getContext('2d');
    // this.addDomElement();

    this.car = new Car(x, y, img, this.ctx)
  }
  updatePosition(wpm){
    if(this.typingForward){
      this.car.moveCarForward(wpm);
    } else if (this.typingBackward) {
      this.car.moveCarBackward(wpm);
    }
  }

  // addDomElement(){
  //   this.ctx = document.getElementById('canvas').getContext('2d');
  //   if(this.img === 1){
  //     this.img = document.getElementById('redcar');
  //   } else{
  //     this.img = doucment.getElementById('greencar');
  //   }
  // }

  // static onConnect(socket){
  //   let player = new Player(socket.id);
  //   debugger;
  //   Player.list[player.id] = player;
  //   socket.on('keyPress', data => {
  //     if (data.inputId === 'forward'){
  //       player.typingForward = data.state;
  //     } else if (data.inputId === 'backward'){
  //       player.typingBackward = datat.state;
  //     }
  //   })
  // }
  //
  // static onDisconnect(socket){
  //   delete Player.list[socket.id];
  // }
  // Player.list[id] = this;
}
module.exports = Player;

// const Player = (id) => {
//   const self = {
//     x: 250,
//     y: 250,
//     id: id,
//     number: "" + Math.floor(10 * Math.random()),
//     pressingRight: false,
//     pressingLeft: false,
//     pressingUp: false,
//     pressingDown: false,
//     maxSpd: 10
//   }
//   self.updatePosition = () => {
//     if(self.pressingRight) self.x += self.maxSpd;
//     if (self.pressingLeft) self.x -= self.maxSpd;
//   }
//   return self;
// }
