function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Cell from "./Cell";
export default class SimpleSpace extends Cell {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "walkThrough", true);
  }

}