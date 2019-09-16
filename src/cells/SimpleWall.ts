//import { DropShadowFilter } from '@pixi/filter-drop-shadow'
import * as PIXI from 'pixi.js'
import Cell from './Cell'
import { CELL_SIZE } from '@/constants/Sizes'

PIXI.GRAPHICS_CURVES.maxLength = 20
PIXI.GRAPHICS_CURVES.minSegments = 16

export default class SimpleWall extends Cell {
    public base: PIXI.Graphics = new PIXI.Graphics()

    private thickness = 8

    public constructor(args) {
        super(args)
        this.setup()
    }

    private drawByNeighbours() {
        const { top, right, bottom, left } = this.map.getNeighboursFromMatrix(this.row, this.cell)

        if (top === SimpleWall && bottom === SimpleWall) {
            // | Vertical
            this.draw2()
        } else if (top !== SimpleWall && left !== SimpleWall) {
            // ( top left corner
            this.draw3()
        } else if (bottom !== SimpleWall && left !== SimpleWall) {
            // ( bottom left corner
            this.draw4()
        } else if (bottom !== SimpleWall && right !== SimpleWall) {
            // ) bottom right corner
            this.draw5()
        } else if (top !== SimpleWall && right !== SimpleWall) {
            // ) top right corner
            this.draw6()
        } else {
            // - Horizontal
            this.draw1()
        }
    }

    // - Horizontal
    private draw1() {
        const g = new PIXI.Graphics()
        g.beginFill(0x00f7ff)
        g.drawRect(0, CELL_SIZE / 2 - Math.floor(this.thickness / 2), CELL_SIZE, this.thickness)
        g.endFill()

        g.beginFill(0x003dff)
        g.drawRect(0, CELL_SIZE / 2, CELL_SIZE, 1)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // | Vertical
    private draw2() {
        const g = new PIXI.Graphics()

        g.beginFill(0x00f7ff)
        g.drawRect(CELL_SIZE / 2 - Math.floor(this.thickness / 2), 0, this.thickness, CELL_SIZE)
        g.endFill()
        g.position.set(this.x, this.y)

        g.beginFill(0x003dff)
        g.drawRect(CELL_SIZE / 2, 0, 1, CELL_SIZE)
        g.endFill()

        g.position.set(this.x, this.y)

        this.map.graphicsLayer.addChild(g)
    }

    // ( top left corner
    private draw3() {
        const l1 = new PIXI.Graphics()
        const l2 = new PIXI.Graphics()

        l1.lineStyle(this.thickness, 0x00f7ff, 1, 0.5)
        l1.bezierCurveTo(0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2)
        l1.angle = 90
        l1.position.set(this.x + CELL_SIZE, this.y + CELL_SIZE / 2)

        l2.lineStyle(1, 0x003dff, 1, 1)
        l2.bezierCurveTo(0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2)
        l2.angle = 90
        l2.position.set(this.x + CELL_SIZE, this.y + CELL_SIZE / 2)

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    // ( bottom left corner
    private draw4() {
        const l1 = new PIXI.Graphics()
        const l2 = new PIXI.Graphics()

        l1.lineStyle(this.thickness, 0x00f7ff, 1, 0.5)
        l1.bezierCurveTo(0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2)
        l1.position.set(this.x + CELL_SIZE / 2, this.y)

        l2.lineStyle(1, 0x003dff, 1, 1)
        l2.bezierCurveTo(0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2)
        l2.position.set(this.x + CELL_SIZE / 2, this.y)

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    // ) bottom right corner
    private draw5() {
        const l1 = new PIXI.Graphics()
        const l2 = new PIXI.Graphics()

        l1.lineStyle(this.thickness, 0x00f7ff, 1, 0.5)
        l1.bezierCurveTo(0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2)
        l1.position.set(this.x, this.y + CELL_SIZE / 2)
        l1.angle = -90

        l2.lineStyle(1, 0x003dff, 1, 1)
        l2.bezierCurveTo(0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2)
        l2.position.set(this.x, this.y + CELL_SIZE / 2)
        l2.angle = -90

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    // ) top right corner
    private draw6() {
        const l1 = new PIXI.Graphics()
        const l2 = new PIXI.Graphics()

        l1.lineStyle(this.thickness, 0x00f7ff, 1, 0.5)
        l1.bezierCurveTo(0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2)
        l1.position.set(this.x + CELL_SIZE / 2, this.y + CELL_SIZE)
        l1.angle = 180

        l2.lineStyle(1, 0x003dff, 1, 1)
        l2.bezierCurveTo(0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2)
        l2.position.set(this.x + CELL_SIZE / 2, this.y + CELL_SIZE)
        l2.angle = 180

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    private setup() {
        this.base.beginFill(0x000000)
        this.base.drawRect(0, 0, CELL_SIZE, CELL_SIZE)
        this.base.endFill()

        this.base.position.set(this.x, this.y)

        this.drawByNeighbours()

        /*const shadow = new DropShadowFilter({
            distance: 0,
            blur: 5,
            color: 0xffffff,
            alpha: 1
        })
        this.map.graphicsLayer.filters = [shadow]*/

        this.map.baseLayer.addChild(this.base)
    }

    public containsPoint(x, y): boolean {
        const point = new PIXI.Point(x, y)
        return this.base.containsPoint(point)
    }
}
