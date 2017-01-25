class PlayerServer{
  constructor(id, socketID){
    this.id = id;
    this.socketID = socketID;
    this.x = 10;
    this.wpm = 0;
    this.spd = 0;
    this.typingForward = false;
    this.typingBackward = false;
  }
  updatePosition(){
    if(this.typingForward){
      this.x += this.updateSpd(this.wpm);
    } else if (this.typingBackward) {
      this.x -= this.updateSpd(this.wpm);
    }
  }
  updateSpd(){
    console.log('updateSpd in player server');
    if (this.wpm === 0){
      this.spd = 0;
    } else if (this.wpm <= 20){
      this.spd = 1;
    } else if (this.wpm <= 40){
      this.spd = 2;
    } else if (this.wpm <= 60){
      this.spd = 3;
    } else if (this.wpm <= 80){
      this.spd = 4;
    } else if (this.wpm <= 90){
      this.spd = 5;
    } else {
      this.spd = 6;
    }
    return this.spd;
  }
}
module.exports = PlayerServer;
