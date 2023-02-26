export class objsManager {

  static objs = [
    // {
    //   id: 1,
    //   color : 'black',
    //   type : 'portal',
    //   position: [1, 0.1, 1],
    //   args: [0.2, 0.2, 0.2]
    // },
    // {
    //   id: 2,
    //   color : 'orange',
    //   type : 'food',
    //   position: [0.5, 0.1, -2.5],
    //   args: [0.2, 0.2, 0.2]
    // },
    // {
    //   id: 3,
    //   color : 'black',
    //   type : 'portal',
    //   position: [1, 0.1, -2.5],
    //   args: [0.2, 0.2, 0.2]
    // },
    // {
    //   id: 4,
    //   color : 'orange',
    //   type : 'food',
    //   position: [-1, 0.1, 2.5],
    //   args: [0.2, 0.2, 0.2]
    // }
  ];

  static callbackFunctions = [];

  static addCallback(funct) {
    this.callbackFunctions.push(funct);
  }

  static triggerCallback(funct) {
    this.callbackFunctions.forEach(funct => {
      funct();
    });
  }

  static remove(id) {
    this.objs = this.objs.filter((e) => {
      return e.id !== id
    })
    this.triggerCallback();
  }

  static clear() {
    this.objs = [];
    this.triggerCallback();
  }
  
  static generateLevel() {

    // min: 1
    // max: 5.5

    const nbFood = 10;
    const nbBlock = 5;

    let index = 0;
    let level = [];

    for (let i = 0; i < nbFood; i++) {
      let pos = this.randomInCircle();
      level.push({
        id: index,
        type: 'food',
        position: [pos.x, 0, pos.y],
      });
      index++;
    }

    for (let i = 0; i < 2; i++) {
      let pos = this.randomInCircle();
      level.push({
        id: index,
        type: 'portal',
        position: [pos.x, 0, pos.y],
      });
      index++;
    }

    for (let i = 0; i < nbBlock; i++) {
      let pos = this.randomInCircle();
      level.push({
        id: index,
        type: 'block',
        blockId: Math.floor(Math.random() * 9),
        position: [pos.x, 0, pos.y],
      });
      index++;
    }

    console.log(level);

    this.objs = level; 
  }

  static randomInCircle() {
    let angle = Math.random() * 2 * Math.PI;
    let rad = (Math.floor(Math.random() * 35) + 20) / 10;
    return {x: Math.cos(angle) * rad, y: Math.sin(angle) * rad}
  }

  static randomBall() {
    let position = this.randomInCircle();
    return [position.x, 2, position.y];
  }

}