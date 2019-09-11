export default class Cell {
    public walkThrough = false

    public map

    public x

    public y

    public constructor({ map, x, y }) {
        this.map = map
        this.x = x
        this.y = y
    }

    // eslint-disable-next-line
    public draw() {}

    // eslint-disable-next-line
    public containsPoint(x, y) {
        return false
    }
}
