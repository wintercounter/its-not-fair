import * as PIXI from 'pixi.js'
import { CELL_SIZE } from '@/constants/Sizes'
import CellMap from '@/cells'
import Cell from '@/cells/Cell'

interface IMap {
    baseLayer: PIXI.Container
    graphicsLayer: PIXI.Container
    animationLayer: PIXI.Container
    rows: []
}

export default class Map implements IMap {
    public baseLayer = new PIXI.Container()

    public graphicsLayer = new PIXI.Container()

    public animationLayer = new PIXI.Container()

    public rows

    public matrix

    public wallColors

    public draw() {
        this.eachCell(cell => cell.draw && cell.draw())
    }

    public renderRows() {
        this.rows = this.matrix.map((cells, rowI) => {
            return cells.map((cell, cellI) => {
                if (this.rows && this.rows.length) {
                    if (!(this.rows[rowI][cellI] instanceof CellMap[cell])) this.rows[rowI][cellI].destroy()
                    else return this.rows[rowI][cellI]
                }
                const x = CELL_SIZE * cellI
                const y = CELL_SIZE * rowI
                return new CellMap[cell]({ x, y, row: rowI, cell: cellI, map: this, wallColors: this.wallColors })
            })
        })
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

    public getCellByCoords(x, y) {
        const x1 = Math.floor(y / CELL_SIZE)
        const y1 = Math.floor(x / CELL_SIZE)
        return this.rows[x1][y1]
    }

    public getNeighboursFromMatrix(row, col) {
        const m = this.matrix
        const returnObj = {
            top: undefined,
            right: undefined,
            bottom: undefined,
            left: undefined
        }

        if (m[row - 1] && m[row - 1][col]) returnObj.top = CellMap[m[row - 1][col]]
        if (m[row][col + 1]) returnObj.right = CellMap[m[row][col + 1]]
        if (m[row + 1] && m[row + 1][col]) returnObj.bottom = CellMap[m[row + 1][col]]
        if (m[row][col - 1]) returnObj.left = CellMap[m[row][col - 1]]
        return returnObj
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
