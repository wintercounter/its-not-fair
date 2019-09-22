function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as PIXI from 'pixi.js';
import { CELL_SIZE } from "../constants/Sizes";
import CellMap from "../cells";
export default class Map {
  constructor() {
    _defineProperty(this, "baseLayer", new PIXI.Container());

    _defineProperty(this, "graphicsLayer", new PIXI.Container());

    _defineProperty(this, "animationLayer", new PIXI.Container());

    _defineProperty(this, "rows", void 0);

    _defineProperty(this, "wallColors", void 0);

    _defineProperty(this, "matrix", void 0);
  }

  draw() {
    this.eachCell(cell => cell.draw && cell.draw());
  }

  renderRows() {
    this.rows = this.matrix.map((cells, rowI) => {
      return cells.map((cell, cellI) => {
        if (this.rows && this.rows.length) {
          this.rows[rowI][cellI].destroy();
        }

        const x = CELL_SIZE * cellI;
        const y = CELL_SIZE * rowI;
        return new CellMap[cell]({
          x,
          y,
          row: rowI,
          cell: cellI,
          map: this,
          wallColors: this.wallColors
        });
      });
    });
  }

  eachCell(cb) {
    for (const row of this.rows) {
      for (const cell of row) {
        cb(cell);
      }
    }
  }

  getCellsByType(proto) {
    const results = [];
    this.eachCell(cell => {
      if (cell instanceof proto) {
        results.push(cell);
      }
    });
    return results;
  }

  getCellByCoords(x, y) {
    const x1 = Math.floor(y / CELL_SIZE);
    const y1 = Math.floor(x / CELL_SIZE);
    return this.rows[x1][y1];
  }

  getNeighboursFromMatrix(row, col) {
    const m = this.matrix;
    const returnObj = {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined
    };
    if (m[row - 1] && m[row - 1][col]) returnObj.top = CellMap[m[row - 1][col]];
    if (m[row][col + 1]) returnObj.right = CellMap[m[row][col + 1]];
    if (m[row + 1] && m[row + 1][col]) returnObj.bottom = CellMap[m[row + 1][col]];
    if (m[row][col - 1]) returnObj.left = CellMap[m[row][col - 1]];
    return returnObj;
  }

  getNeighboursByCoords(x, y, width, height) {
    const x1 = Math.max(0, Math.floor((y - width / 2) / CELL_SIZE) - 1);
    const x2 = Math.min(Math.floor((y + width / 2) / CELL_SIZE), this.rows.length - 1);
    const y1 = Math.max(0, Math.floor((x - height / 2) / CELL_SIZE) - 1);
    const y2 = Math.min(Math.floor((x + height / 2) / CELL_SIZE), this.rows[0].length - 1);
    const neighbours = [];

    for (let _x = x1; _x <= x2; _x++) {
      for (let _y = y1; _y <= y2; _y++) {
        // No exact corners needed
        if (this.rows[_x][_y].x === x && this.rows[_x][_y].y === y || this.rows[_x][_y].x === x + width && this.rows[_x][_y].y === y || this.rows[_x][_y].x === x + width && this.rows[_x][_y].y === y + height || this.rows[_x][_y].x === x && this.rows[_x][_y].y === y + height) {
          continue; // eslint-disable-line
        } // @ts-ignore


        neighbours.push(this.rows[_x][_y]);
      }
    }

    return neighbours;
  }

}