function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import { DropShadowFilter } from '@pixi/filter-drop-shadow'
import * as PIXI from 'pixi.js';
import Cell from "./Cell";
import { CELL_SIZE } from "../constants/Sizes";
PIXI.GRAPHICS_CURVES.maxLength = 20;
PIXI.GRAPHICS_CURVES.minSegments = 16;
const HALF = CELL_SIZE / 2;
export default class SimpleWall extends Cell {
  constructor(args) {
    super(args);

    _defineProperty(this, "base", new PIXI.Graphics());

    _defineProperty(this, "graphics", {});

    _defineProperty(this, "thicknessBig", 10);

    _defineProperty(this, "thicknessSmall", 2);

    _defineProperty(this, "bigColor", void 0);

    _defineProperty(this, "smallColor", void 0);

    const {
      wallColors: [bigColor = 0x00f7ff, smallColor = 0x003dff] = []
    } = args;
    this.bigColor = bigColor;
    this.smallColor = smallColor;
    this.setup();
  }

  drawByNeighbours() {
    const {
      top,
      right,
      bottom,
      left
    } = this.map.getNeighboursFromMatrix(this.row, this.cell); // TODO have proper draw for this case also

    if (top && bottom && left && right) {
      this.thicknessBig = CELL_SIZE;
      this.thicknessSmall = 0;
    }

    if (top && !bottom && !left && !right) {
      // | bottom to top starter
      this.draw10();
    } else if (!top && bottom && !left && !right) {
      // | top to bottom starter
      this.draw9();
    } else if (!top && !bottom && !left && right) {
      // - left to right starter
      this.draw7();
    } else if (!top && !bottom && !right && left) {
      // - right to left starter
      this.draw8();
    } else if (top !== SimpleWall && left !== SimpleWall) {
      // ( top left corner
      this.draw3();
    } else if (bottom !== SimpleWall && left !== SimpleWall) {
      // ( bottom left corner
      this.draw4();
    } else if (bottom !== SimpleWall && right !== SimpleWall) {
      // ) bottom right corner
      this.draw5();
    } else if (top !== SimpleWall && right !== SimpleWall) {
      // ) top right corner
      this.draw6();
    } else if (!top && right === SimpleWall && left === SimpleWall && bottom === SimpleWall) {
      // - Horizontal with bottom neighbour T
      this.draw11();
    } else if (!bottom && right === SimpleWall && left === SimpleWall && top === SimpleWall) {
      // - Horizontal with top neighbour L
      this.draw12();
    } else if (!right && bottom === SimpleWall && left === SimpleWall && top === SimpleWall) {
      // | Vertical with left neighbour -|
      this.draw13();
    } else if (!left && bottom === SimpleWall && right === SimpleWall && top === SimpleWall) {
      // | Vertical with right neighbour |-
      this.draw14();
    } else if (top === SimpleWall && bottom === SimpleWall) {
      // | Vertical
      this.draw2();
    } else {
      // - Horizontal
      this.draw1();
    }
  } // - Horizontal


  draw1() {
    const g = this.graphics.g1 = new PIXI.Graphics();
    g.beginFill(this.bigColor);
    g.drawRect(0, HALF - this.thicknessBig / 2, CELL_SIZE, this.thicknessBig);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(0, HALF - this.thicknessSmall / 2, CELL_SIZE, this.thicknessSmall);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  } // | Vertical


  draw2() {
    const g = this.graphics.g2 = new PIXI.Graphics();
    g.beginFill(this.bigColor);
    g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, CELL_SIZE);
    g.endFill();
    g.position.set(this.x, this.y);
    g.beginFill(this.smallColor);
    g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, CELL_SIZE);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  } // ( top left corner


  draw3() {
    const l1 = this.graphics.g3l1 = new PIXI.Graphics();
    const l2 = this.graphics.g3l2 = new PIXI.Graphics();
    l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5);
    l1.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF);
    l1.angle = 90;
    l1.position.set(this.x + CELL_SIZE, this.y + HALF);
    l2.lineStyle(this.thicknessSmall, this.smallColor, 1, 0.5);
    l2.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF);
    l2.angle = 90;
    l2.position.set(this.x + CELL_SIZE, this.y + HALF);
    this.map.graphicsLayer.addChild(l1);
    this.map.graphicsLayer.addChild(l2);
  } // ( bottom left corner


  draw4() {
    const l1 = this.graphics.g4l1 = new PIXI.Graphics();
    const l2 = this.graphics.g4l2 = new PIXI.Graphics();
    l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5);
    l1.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF);
    l1.position.set(this.x + HALF, this.y);
    l2.lineStyle(this.thicknessSmall, this.smallColor, 1, 0.5);
    l2.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF);
    l2.position.set(this.x + HALF, this.y);
    this.map.graphicsLayer.addChild(l1);
    this.map.graphicsLayer.addChild(l2);
  } // ) bottom right corner


  draw5() {
    const l1 = this.graphics.g5l1 = new PIXI.Graphics();
    const l2 = this.graphics.g5l2 = new PIXI.Graphics();
    l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5);
    l1.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF);
    l1.position.set(this.x, this.y + HALF);
    l1.angle = -90;
    l2.lineStyle(this.thicknessSmall, this.smallColor, 1, 0.5);
    l2.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF);
    l2.position.set(this.x, this.y + HALF);
    l2.angle = -90;
    this.map.graphicsLayer.addChild(l1);
    this.map.graphicsLayer.addChild(l2);
  } // ) top right corner


  draw6() {
    const l1 = this.graphics.g6l1 = new PIXI.Graphics();
    const l2 = this.graphics.g6l2 = new PIXI.Graphics();
    l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5);
    l1.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF);
    l1.position.set(this.x + HALF, this.y + CELL_SIZE);
    l1.angle = 180;
    l2.lineStyle(this.thicknessSmall, this.smallColor, 1, 0.5);
    l2.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF);
    l2.position.set(this.x + HALF, this.y + CELL_SIZE);
    l2.angle = 180;
    this.map.graphicsLayer.addChild(l1);
    this.map.graphicsLayer.addChild(l2);
  } // - left to right starter


  draw7() {
    const g = this.graphics.g7 = new PIXI.Graphics();
    const diff = this.thicknessBig / 2 / 2;
    g.beginFill(this.bigColor);
    g.drawCircle(diff, HALF, this.thicknessBig / 2);
    g.endFill();
    g.beginFill(this.bigColor);
    g.drawRect(diff, HALF - this.thicknessBig / 2, HALF - diff, this.thicknessBig);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(diff, HALF - this.thicknessSmall / 2, HALF - diff, this.thicknessSmall);
    g.endFill();
    g.position.set(this.x + HALF, this.y);
    this.map.graphicsLayer.addChild(g);
  } // - right to left starter


  draw8() {
    const g = this.graphics.g8 = new PIXI.Graphics();
    const diff = this.thicknessBig / 2 / 2;
    g.beginFill(this.bigColor);
    g.drawCircle(HALF - diff, HALF, this.thicknessBig / 2);
    g.endFill();
    g.beginFill(this.bigColor);
    g.drawRect(0, HALF - this.thicknessBig / 2, HALF - diff, this.thicknessBig);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(0, HALF - this.thicknessSmall / 2, HALF - diff, this.thicknessSmall);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  } // | top to bottom starter


  draw9() {
    const g = this.graphics.g9 = new PIXI.Graphics();
    const diff = this.thicknessBig / 2 / 2;
    g.beginFill(this.bigColor);
    g.drawCircle(HALF, HALF + diff, this.thicknessBig / 2);
    g.endFill();
    g.beginFill(this.bigColor);
    g.drawRect(HALF - this.thicknessBig / 2, HALF + diff, this.thicknessBig, HALF);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(HALF - this.thicknessSmall / 2, HALF + diff, this.thicknessSmall, HALF - diff);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  } // | bottom to top starter


  draw10() {
    const g = this.graphics.g10 = new PIXI.Graphics();
    const diff = this.thicknessBig / 2 / 2;
    g.beginFill(this.bigColor);
    g.drawCircle(HALF, HALF, this.thicknessBig / 2);
    g.endFill();
    g.beginFill(this.bigColor);
    g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, HALF);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, HALF);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  } // - Horizontal with bottom neighbour T


  draw11() {
    const g = this.graphics.g11 = new PIXI.Graphics();
    g.beginFill(this.bigColor);
    g.drawRect(0, HALF - this.thicknessBig / 2, CELL_SIZE, this.thicknessBig);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(0, HALF - this.thicknessSmall / 2, CELL_SIZE, this.thicknessSmall);
    g.endFill(); // Extra

    g.beginFill(this.bigColor);
    g.drawRect(HALF - this.thicknessBig / 2, HALF + this.thicknessSmall, this.thicknessBig, HALF - this.thicknessSmall);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(HALF - this.thicknessSmall / 2, HALF, this.thicknessSmall, HALF);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  } // - Horizontal with top neighbour L


  draw12() {
    const g = this.graphics.g12 = new PIXI.Graphics();
    g.beginFill(this.bigColor);
    g.drawRect(0, HALF - this.thicknessBig / 2, CELL_SIZE, this.thicknessBig);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(0, HALF - this.thicknessSmall / 2, CELL_SIZE, this.thicknessSmall);
    g.endFill(); // Extra

    g.beginFill(this.bigColor);
    g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, HALF - this.thicknessSmall);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, HALF);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  } // | Vertical with left neighbour -|


  draw13() {
    const g = this.graphics.g13 = new PIXI.Graphics();
    g.beginFill(this.bigColor);
    g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, CELL_SIZE);
    g.endFill();
    g.position.set(this.x, this.y);
    g.beginFill(this.smallColor);
    g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, CELL_SIZE);
    g.endFill(); // Extra

    g.beginFill(this.bigColor);
    g.drawRect(0, HALF - this.thicknessBig / 2, HALF - this.thicknessSmall, this.thicknessBig);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(0, HALF - this.thicknessSmall / 2, HALF, this.thicknessSmall);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  } // | Vertical with right neighbour |-


  draw14() {
    const g = this.graphics.g14 = new PIXI.Graphics();
    g.beginFill(this.bigColor);
    g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, CELL_SIZE);
    g.endFill();
    g.position.set(this.x, this.y);
    g.beginFill(this.smallColor);
    g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, CELL_SIZE);
    g.endFill(); // Extra

    g.beginFill(this.bigColor);
    g.drawRect(HALF + this.thicknessSmall, HALF - this.thicknessBig / 2, HALF - this.thicknessSmall, this.thicknessBig);
    g.endFill();
    g.beginFill(this.smallColor);
    g.drawRect(HALF, HALF - this.thicknessSmall / 2, HALF, this.thicknessSmall);
    g.endFill();
    g.position.set(this.x, this.y);
    this.map.graphicsLayer.addChild(g);
  }

  setup() {
    this.base.beginFill(0x000000);
    this.base.drawRect(0, 0, CELL_SIZE, CELL_SIZE);
    this.base.endFill();
    this.base.position.set(this.x, this.y);
    this.drawByNeighbours();
    this.map.baseLayer.addChild(this.base);
  }

  containsPoint(x, y) {
    const point = new PIXI.Point(x, y);
    return this.base.containsPoint(point);
  }

  destroy() {
    Object.entries(this.graphics).forEach(([g, key]) => {
      this.graphics[g].destroy();
      delete this.graphics[key];
    });
    this.base.destroy();
  }

}