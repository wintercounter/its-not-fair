function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as PIXI from 'pixi.js';
import Hammer from 'hammerjs';
import keyboard from "../utils/keyboardEvents";
import { DOWN, LEFT, RIGHT, UP } from "../constants/Directions";
import SpawnPoint from "../cells/SpawnPoint";
import { CELL_SIZE } from "../constants/Sizes";
const DIRECTION_PROPS = {
  [UP]: {
    angle: 270,
    direction: UP
  },
  [RIGHT]: {
    angle: 0,
    direction: RIGHT
  },
  [DOWN]: {
    angle: 90,
    direction: DOWN
  },
  [LEFT]: {
    angle: 180,
    direction: LEFT
  }
};
export default class Player {
  // eslint-disable-next-line
  get diff() {
    return CELL_SIZE / 2;
  }

  get nextProps() {
    return DIRECTION_PROPS[this.nextDirection];
  }

  get currentProps() {
    return DIRECTION_PROPS[this.direction];
  }

  vx(dir) {
    return dir === LEFT ? this.velocity * -1 : dir === RIGHT ? this.velocity : 0;
  }

  vy(dir) {
    return dir === UP ? this.velocity * -1 : dir === DOWN ? this.velocity : 0;
  }

  setupBase() {
    const base = this.base = new PIXI.Graphics();
    base.alpha = 0;
    base.beginFill(0xff99ff);
    base.drawRect(0, 0, CELL_SIZE, CELL_SIZE);
    base.endFill();
    base.x = CELL_SIZE / -2;
    base.y = CELL_SIZE / -2;
  }

  constructor({
    map,
    app,
    mixins = [],
    control = false
  }) {
    _defineProperty(this, "container", new PIXI.Container());

    _defineProperty(this, "direction", RIGHT);

    _defineProperty(this, "nextDirection", RIGHT);

    _defineProperty(this, "state", Player.RUNNING);

    _defineProperty(this, "previousState", Player.RUNNING);

    _defineProperty(this, "app", void 0);

    _defineProperty(this, "map", void 0);

    _defineProperty(this, "base", void 0);

    _defineProperty(this, "mixins", void 0);

    _defineProperty(this, "control", void 0);

    _defineProperty(this, "velocity", 4);

    this.map = map;
    this.app = app;
    this.control = control; // @ts-ignore

    this.mixins = mixins.map(mixin => new mixin(this));
    this.bind();
  }

  velocityByDirection(dir, additive = 0) {
    if (dir === DOWN || dir === RIGHT) {
      return this.velocity + additive;
    }

    return this.velocity + additive * -1;
  } // eslint-disable-next-line


  newCoordsByDirection(dir, x, y) {
    switch (dir) {
      case UP:
        return [x, y - CELL_SIZE];

      case DOWN:
        return [x, y + CELL_SIZE];

      case RIGHT:
        return [x + CELL_SIZE, y];

      case LEFT:
        return [x - CELL_SIZE, y];
    }

    return [0, 0];
  }

  getSpawnPosition() {
    const cells = this.map.getCellsByType(SpawnPoint).filter(({
      isOccupied
    }) => !isOccupied);
    const cell = cells[Math.floor(Math.random() * cells.length)];
    cell.hasPlayer();
    return {
      x: cell.x + CELL_SIZE / 2,
      y: cell.y + CELL_SIZE / 2,
      defaultDirection: cell.defaultDirection
    };
  }

  canGo(direction) {
    const {
      x,
      y
    } = this.container;
    const [newX, newY] = this.newCoordsByDirection(direction, x, y);
    const cell = this.map.getCellByCoords(newX, newY);
    return cell.walkThrough;
  }

  tryNext({
    direction
  }) {
    const {
      x,
      y
    } = this.container;
    const width = CELL_SIZE;
    const height = CELL_SIZE;
    const newX = x + this.vx(direction);
    const newY = y + this.vy(direction);
    const cells = this.map.getNeighboursByCoords(x, y, width, height);

    for (const cell of cells) {
      const diff = width / 2;

      if (!cell.walkThrough && (cell.containsPoint(newX - diff, newY - diff) || cell.containsPoint(newX + (diff - 4), newY + (diff - 4)) || cell.containsPoint(newX - diff, newY + (diff - 4)) || cell.containsPoint(newX + (diff - 4), newY - diff))) {
        this.previousState = this.state;
        this.state = this.direction === direction ? Player.STOPPED : Player.RUNNING;
        return false;
      }
    }

    this.state = Player.RUNNING;
    this.container.x = newX;
    this.container.y = newY;
    this.direction = direction;
    return true;
  }

  beforeDraw() {
    for (const mixin of this.mixins) {
      if (mixin.beforeDraw && !mixin.beforeDraw()) {
        return false;
      }
    }

    return true;
  }

  afterDraw() {
    for (const mixin of this.mixins) {
      if (mixin.afterDraw && !mixin.afterDraw()) {
        return false;
      }
    }

    return true;
  }

  beforeSetup() {
    for (const mixin of this.mixins) {
      if (mixin.beforeSetup && !mixin.beforeSetup()) {
        return false;
      }
    }

    return true;
  }

  afterSetup() {
    for (const mixin of this.mixins) {
      if (mixin.afterSetup && !mixin.afterSetup()) {
        return false;
      }
    }

    return true;
  } // eslint-disable-next-line


  draw() {
    if (!this.beforeDraw()) {
      return;
    }

    this.afterDraw();
  }

  bind() {
    if (!this.control) {
      return;
    } //Capture the keyboard arrow keys


    const left = keyboard('ArrowLeft'),
          up = keyboard('ArrowUp'),
          right = keyboard('ArrowRight'),
          down = keyboard('ArrowDown');

    left.press = () => this.nextDirection = LEFT;

    up.press = () => this.nextDirection = UP;

    right.press = () => this.nextDirection = RIGHT;

    down.press = () => this.nextDirection = DOWN; // Touch events


    const mc = new Hammer(document.documentElement);
    mc.get('pan').set({
      direction: Hammer.DIRECTION_ALL,
      threshold: 10
    });
    mc.on('panleft panright panup pandown', ev => {
      Math.abs(ev.velocity) > 0.2 && (this.nextDirection = ev.type.replace('pan', ''));
    });
  }

}

_defineProperty(Player, "RUNNING", 'running');

_defineProperty(Player, "STOPPED", 'stopped');