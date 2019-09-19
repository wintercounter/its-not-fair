function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default class Cell {
  constructor({
    map,
    x,
    y,
    row,
    cell
  }) {
    _defineProperty(this, "walkThrough", false);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "row", void 0);

    _defineProperty(this, "cell", void 0);

    this.map = map;
    this.x = x;
    this.y = y;
    this.row = row;
    this.cell = cell;
  } // eslint-disable-next-line


  draw() {} // eslint-disable-next-line


  containsPoint(x, y) {
    return false;
  } // eslint-disable-next-line


  destroy() {}

}