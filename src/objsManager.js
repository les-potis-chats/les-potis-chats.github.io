import { LevelsGenerator } from "./LevelsGenerator";

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

    let level = [];

    for (let i = 0; i < 10; i++) {
      let pos = LevelsGenerator.randomInCircle();
      level.push({
        id: i,
        color : 'orange',
        type : 'food',
        position: [pos.x, 0.1, pos.y],
        args: [0.2, 0.2, 0.2]
      });
    }

    this.objs = level; 
  }

}