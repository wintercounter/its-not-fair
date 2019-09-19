function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as PIXI from 'pixi.js';
import { CELL_SIZE } from "../constants/Sizes";
import SimpleSpace from "./SimpleSpace";
export default class SpawnPoint extends SimpleSpace {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "graphics", new PIXI.Graphics());

    _defineProperty(this, "isOccupied", false);
  }

  hasPlayer() {
    this.isOccupied = true;
    this.update();
  }

  update() {
    this.graphics.clear();
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
    this.graphics.endFill();
  }

  destroy() {
    this.graphics.destroy();
  }

}