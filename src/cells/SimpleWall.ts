import * as PIXI from 'pixi.js'
import Cell from './Cell'
import { CELL_SIZE } from '@/constants/Sizes'

export default class SimpleWall extends Cell {
    public graphics = new PIXI.Graphics()

    public constructor(args) {
        super(args)
        this.setup()
    }

    private setup() {
        this.graphics.beginFill(0x003dff)
        this.graphics.drawRect(this.x, this.y, CELL_SIZE, CELL_SIZE)
        this.graphics.endFill()

        this.map.container.addChild(this.graphics)
    }

    public containsPoint(x, y): boolean {
        const point = new PIXI.Point(x, y)
        return this.graphics.containsPoint(point)
    }
}
