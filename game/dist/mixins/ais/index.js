function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Mixin from "./..";
export default class AI extends Mixin {
  constructor(player) {
    super();

    _defineProperty(this, "player", void 0);

    this.player = player;
  }

}