class ComputerServer{
  constructor(id, socketID, level){
    this.id = id;
    this.socketID = socketID;
    this.x = 10;
    this.spd = 0;
    this.level = level;
  }
  updatePosition(){
    this.x += this.updateSpdLevel(this.level);
  }
  updateSpdLevel(){
    if (this.level === 'easy'){
      this.spd = 2;
    } else if (this.level === 'med'){
      this.spd = 3;
    } else if (this.level === 'hard'){
      this.spd = 5;
    }
    return this.spd;
  }
}
module.exports = ComputerServer;
