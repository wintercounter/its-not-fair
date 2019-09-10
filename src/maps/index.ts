import * as PIXI from 'pixi.js'

interface IMap {}

export default class Map implements IMap {
    static CELL_SIZE = 30

    static CELL_PROPS = {
        0: { fill: 0x000000, walkThrough: true },
        1: { fill: 0x003dff, walkThrough: false }
    }

    container = new PIXI.Container()
    rows

    public getNeighboursByCoords(x, y, width, height) {
        const x1 = Math.max(0, Math.floor((y - width / 2) / Map.CELL_SIZE) - 1)
        const x2 = Math.min(Math.floor((y + width / 2) / Map.CELL_SIZE), this.rows.length - 1)

        const y1 = Math.max(0, Math.floor((x - height / 2) / Map.CELL_SIZE) - 1)
        const y2 = Math.min(Math.floor((x + height / 2) / Map.CELL_SIZE), this.rows[0].length - 1)

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
                neighbours.push(this.rows[_x][_y])
            }
        }

        return neighbours
    }
}
