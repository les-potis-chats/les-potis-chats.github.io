export class StateManager {

  static gameMode = 'intro';
  static level = 1;

  static carPosition = {x: 0, y: 0, z: 0};
  static deltaPosition = {x: 0, y: 0, z: 0};

  static setCarPosition(position) {
    this.deltaPosition.x = this.carPosition.x - position.x;
    this.deltaPosition.z = this.carPosition.z - position.z;
    this.carPosition = position;
  }
  
}