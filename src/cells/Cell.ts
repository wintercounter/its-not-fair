export default class Cell {
    public walkThrough = false

    public map

    public x

    public y

    public row

    public cell

    public constructor({ map, x, y, row, cell }) {
        this.map = map
        this.x = x
        this.y = y
        this.row = row
        this.cell = cell
    }

    // eslint-disable-next-line
    public draw() {}

    // eslint-disable-next-line
    public containsPoint(x, y) {
        return false
    }
}
