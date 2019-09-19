function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as PIXI from 'pixi.js';
import Cell from "./Cell";
import { CELL_SIZE } from "../constants/Sizes";
export default class SimpleWall extends Cell {
  constructor(args) {
    super(args);

    _defineProperty(this, "graphics", new PIXI.Graphics());

    this.setup();
  }

  setup() {
    this.graphics.beginFill(0x003dff);
    this.graphics.drawRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
    this.graphics.endFill();
    this.map.container.addChild(this.graphics);
  }

  containsPoint(x, y) {
    const point = new PIXI.Point(x, y);
    return this.graphics.containsPoint(point);
  }

}