import * as PIXI from 'pixi.js'
import { CELL_SIZE } from '@/constants/Sizes'
import Cell from '@/cells/Cell'

interface IMap {
    container: PIXI.Container
    rows: []
}

export default class Map implements IMap {
    public container = new PIXI.Container()

    public rows

    public draw() {
        this.eachCell(cell => cell.draw && cell.draw())
    }

    public eachCell(cb) {
        for (const row of this.rows) {
            for (const cell of row) {
                cb(cell)
            }
        }
    }

    public getCellsByType(proto): Cell[] {
        const results: Cell[] = []
        this.eachCell(cell => {
            if (cell instanceof proto) {
                results.push(cell)
            }
        })
        return results
    }

    public getNeighboursByCoords(x, y, width, height) {
        const x1 = Math.max(0, Math.floor((y - width / 2) / CELL_SIZE) - 1)
        const x2 = Math.min(Math.floor((y + width / 2) / CELL_SIZE), this.rows.length - 1)

        const y1 = Math.max(0, Math.floor((x - height / 2) / CELL_SIZE) - 1)
        const y2 = Math.min(Math.floor((x + height / 2) / CELL_SIZE), this.rows[0].length - 1)

        const neighbours = []
        for (let _x = x1; _x <= x2; _x++) {
            for (let _y = y1; _y <= y2; _y++) {
                // No exact corners needed
                if (
                    (this.rows[_x][_y].x === x && this.rows[_x][_y].y === y) ||
                    (this.rows[_x][_y].x === x + width && this.rows[_x][_y].y === y) ||
                    (this.rows[_x][_y].x === x + width && this.rows[_x][_y].y === y + height) ||
                    (this.rows[_x][_y].x === x && this.rows[_x][_y].y === y + height)
                ) {
                    continue // eslint-disable-line
                }
                // @ts-ignore
                neighbours.push(this.rows[_x][_y])
            }
        }

        return neighbours
    }
}
