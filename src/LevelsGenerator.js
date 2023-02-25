export class LevelsGenerator {
  static randomInCircle() {
    let angle = Math.random() * 2 * Math.PI;
    let rad = (Math.floor(Math.random() * 35) + 20) / 10;
    return {x: Math.cos(angle) * rad, y: Math.sin(angle) * rad}
  }
}