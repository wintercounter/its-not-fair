import * as PIXI from 'pixi.js'
import { CELL_SIZE } from '@/constants/Sizes'
import SimpleSpace from '@/cells/SimpleSpace'

export default class SpawnPoint extends SimpleSpace {
    public graphics = new PIXI.Graphics()

    public isOccupied = false

    public hasPlayer(): void {
        this.isOccupied = true
        this.update()
    }

    public update(): void {
        this.graphics.clear()
        this.graphics.beginFill(0xffffff)
        this.graphics.drawRect(this.x, this.y, CELL_SIZE, CELL_SIZE)
        this.graphics.endFill()
    }

    public destroy() {
        this.graphics.destroy()
    }
}
