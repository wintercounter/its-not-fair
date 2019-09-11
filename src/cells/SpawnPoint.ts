import * as PIXI from 'pixi.js'
import Cell from './Cell'
import { CELL_SIZE } from '@/constants/Sizes'

export default class SpawnPoint extends Cell {
    public graphics = new PIXI.Graphics()

    public constructor(args) {
        super(args)
        this.setup()
    }

    private setup() {
        this.graphics.beginFill(0xcd9fcc)
        this.graphics.drawRect(this.x, this.y, CELL_SIZE, CELL_SIZE)
        this.graphics.endFill()

        this.map.container.addChild(this.graphics)
    }
}
