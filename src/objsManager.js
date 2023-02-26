const level1 = require("./levels/1.json");
const level2 = require("./levels/2.json");
const level3 = require("./levels/3.json");
const level4 = require("./levels/4.json");
const level5 = require("./levels/5.json");
const level6 = require("./levels/6.json");
const level7 = require("./levels/7.json");
const level8 = require("./levels/8.json");
const level9 = require("./levels/9.json");
const level10 = require("./levels/10.json");
const level11 = require("./levels/11.json");
const level12 = require("./levels/12.json");
const level13 = require("./levels/13.json");
const level14 = require("./levels/14.json");
const level15 = require("./levels/15.json");
const level16 = require("./levels/16.json");
const level17 = require("./levels/17.json");

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
  
  static generateLevel(numLevel) {


    let levels = [];
    levels.push(level1);
    levels.push(level2);
    levels.push(level3);
    levels.push(level4);
    levels.push(level5);
    levels.push(level6);
    levels.push(level7);
    levels.push(level8);
    levels.push(level9);
    levels.push(level10);
    levels.push(level11);
    levels.push(level12);
    levels.push(level13);
    levels.push(level14);
    levels.push(level15);
    levels.push(level16);
    levels.push(level17);

    console.log(levels.length);

    this.objs = levels[numLevel - 1]; 

    // min: 1
    // max: 5.5

    /*

    const nbFood = 10;
    const nbBlock = 5;

    let index = 0;
    let objs = [];

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


    this.objs = objs; 

    */
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