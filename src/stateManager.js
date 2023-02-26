export class StateManager {

  static gameMode = 'intro';
  static level = 1;

  static carPosition = {x: 0, y: 0, z: 0};
  static deltaPosition = {x: 0, y: 0, z: 0};

  static setCarPosition(position) {
    this.deltaPosition.x = Math.abs(this.carPosition.x - position.x);
    this.deltaPosition.z = Math.abs(this.carPosition.z - position.z);
    this.carPosition = position;
  }
  
}