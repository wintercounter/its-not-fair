//import { DropShadowFilter } from '@pixi/filter-drop-shadow'
import * as PIXI from 'pixi.js'
import Cell from './Cell'
import { CELL_SIZE } from '@/constants/Sizes'

PIXI.GRAPHICS_CURVES.maxLength = 20
PIXI.GRAPHICS_CURVES.minSegments = 16

const HALF = CELL_SIZE / 2

export default class SimpleWall extends Cell {
    public base: PIXI.Graphics = new PIXI.Graphics()

    public graphics = {}

    private thicknessBig = 10

    private thicknessSmall = 2

    private readonly bigColor

    private readonly smallColor

    public constructor(args) {
        super(args)
        const { wallColors: [bigColor = 0x00f7ff, smallColor = 0x003dff] = [] } = args
        this.bigColor = bigColor
        this.smallColor = smallColor
        this.setup()
    }

    private drawByNeighbours() {
        const { top, right, bottom, left } = this.map.getNeighboursFromMatrix(this.row, this.cell)

        if (top !== SimpleWall && bottom !== SimpleWall && left !== SimpleWall && right !== SimpleWall) {
            // • single wall
            this.drawSingleWall()
        } else if (top && bottom !== SimpleWall && left !== SimpleWall && right !== SimpleWall) {
            // | bottom to top starter
            this.drawStarterBottomToTop()
        } else if (top !== SimpleWall && bottom && left !== SimpleWall && !right) {
            // | top to bottom starter
            this.drawStarterTopToBottom()
        } else if (top !== SimpleWall && bottom !== SimpleWall && left !== SimpleWall && right) {
            // - left to right starter
            this.drawStarterLeftToRight()
        } else if (top !== SimpleWall && bottom !== SimpleWall && right !== SimpleWall && left) {
            // - right to left starter
            this.drawStarterRightToLeft()
        } else if (top !== SimpleWall && left !== SimpleWall) {
            // ◜ top left corner
            this.drawCornerTopLeft()
        } else if (bottom !== SimpleWall && left !== SimpleWall) {
            // ◟ bottom left corner
            this.drawCornerBottomLeft()
        } else if (bottom !== SimpleWall && right !== SimpleWall) {
            // ◞ bottom right corner
            this.drawCornerBottomRight()
        } else if (top !== SimpleWall && right !== SimpleWall) {
            // ◝ top right corner
            this.drawCornerTopRight()
        } else if (top !== SimpleWall && right === SimpleWall && left === SimpleWall && bottom === SimpleWall) {
            // ⊤ Horizontal with bottom neighbour
            this.drawHorizontalWithBottomNeighbour()
        } else if (bottom !== SimpleWall && right === SimpleWall && left === SimpleWall && top === SimpleWall) {
            // ⊥  Horizontal with top neighbour
            this.drawHorizontalWithTopNeighbour()
        } else if (right !== SimpleWall && bottom === SimpleWall && left === SimpleWall && top === SimpleWall) {
            // ⊣ Vertical with left neighbour
            this.drawVerticalWithLeftNeighbour()
        } else if (left !== SimpleWall && bottom === SimpleWall && right === SimpleWall && top === SimpleWall) {
            // ⊢ Vertical with right neighbour
            this.drawVerticalWithRightNeighbour()
        } else if (top === SimpleWall && bottom === SimpleWall && left === SimpleWall && right === SimpleWall) {
            // + CrossWall
            this.drawCrossWall()
        } else if (top === SimpleWall && bottom === SimpleWall) {
            // | Vertical
            this.drawVertical()
        } else {
            // - Horizontal
            this.drawHorizontal()
        }
    }

    // • single wall
    private drawSingleWall() {
        const g = (this.graphics.g = new PIXI.Graphics())

        g.beginFill(this.bigColor)
        g.drawCircle(HALF, HALF, this.thicknessBig / 2)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawCircle(HALF, HALF, this.thicknessBig / 4)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // - Horizontal
    private drawHorizontal() {
        const g = (this.graphics.g = new PIXI.Graphics())
        g.beginFill(this.bigColor)
        g.drawRect(0, HALF - this.thicknessBig / 2, CELL_SIZE, this.thicknessBig)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(0, HALF - this.thicknessSmall / 2, CELL_SIZE, this.thicknessSmall)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // | Vertical
    private drawVertical() {
        const g = (this.graphics.g = new PIXI.Graphics())

        g.beginFill(this.bigColor)
        g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, CELL_SIZE)
        g.endFill()
        g.position.set(this.x, this.y)

        g.beginFill(this.smallColor)
        g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, CELL_SIZE)
        g.endFill()

        g.position.set(this.x, this.y)

        this.map.graphicsLayer.addChild(g)
    }

    // + CrossWall
    private drawCrossWall() {
        const l1 = (this.graphics.l1 = new PIXI.Graphics())
        const l2 = (this.graphics.l2 = new PIXI.Graphics())

        l1.beginFill(this.bigColor)
        l1.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, CELL_SIZE)
        l1.endFill()

        l1.beginFill(this.bigColor)
        l1.drawRect(0, HALF - this.thicknessBig / 2, CELL_SIZE, this.thicknessBig)
        l1.endFill()

        l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5)
        l1.drawCircle(HALF, HALF, HALF - this.thicknessBig)
        l1.endFill()

        l1.position.set(this.x, this.y)

        l2.beginFill(this.smallColor)
        l2.drawRect(0, HALF - this.thicknessSmall / 2, CELL_SIZE, this.thicknessSmall)
        l2.endFill()

        l2.beginFill(this.smallColor)
        l2.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, CELL_SIZE)
        l2.endFill()

        l2.beginFill(this.smallColor)
        l2.drawCircle(HALF, HALF, HALF - this.thicknessBig)
        l2.endFill()

        l2.position.set(this.x, this.y)

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    // ◜ top left corner
    private drawCornerTopLeft() {
        const l1 = (this.graphics.l1 = new PIXI.Graphics())
        const l2 = (this.graphics.l2 = new PIXI.Graphics())

        l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5)
        l1.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF)
        l1.angle = 90
        l1.position.set(this.x + CELL_SIZE, this.y + HALF)

        l2.lineStyle(this.thicknessSmall, this.smallColor, 1, 0.5)
        l2.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF)
        l2.angle = 90
        l2.position.set(this.x + CELL_SIZE, this.y + HALF)

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    // ◟bottom left corner
    private drawCornerBottomLeft() {
        const l1 = (this.graphics.l1 = new PIXI.Graphics())
        const l2 = (this.graphics.l2 = new PIXI.Graphics())

        l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5)
        l1.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF)
        l1.position.set(this.x + HALF, this.y)

        l2.lineStyle(this.thicknessSmall, this.smallColor, 1, 0.5)
        l2.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF)
        l2.position.set(this.x + HALF, this.y)

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    // ◞ bottom right corner
    private drawCornerBottomRight() {
        const l1 = (this.graphics.l1 = new PIXI.Graphics())
        const l2 = (this.graphics.l2 = new PIXI.Graphics())

        l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5)
        l1.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF)
        l1.position.set(this.x, this.y + HALF)
        l1.angle = -90

        l2.lineStyle(this.thicknessSmall, this.smallColor, 1, 0.5)
        l2.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF)
        l2.position.set(this.x, this.y + HALF)
        l2.angle = -90

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    // ◝ top right corner
    private drawCornerTopRight() {
        const l1 = (this.graphics.l1 = new PIXI.Graphics())
        const l2 = (this.graphics.l2 = new PIXI.Graphics())

        l1.lineStyle(this.thicknessBig, this.bigColor, 1, 0.5)
        l1.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF)
        l1.position.set(this.x + HALF, this.y + CELL_SIZE)
        l1.angle = 180

        l2.lineStyle(this.thicknessSmall, this.smallColor, 1, 0.5)
        l2.bezierCurveTo(0, HALF, HALF, HALF, HALF, HALF)
        l2.position.set(this.x + HALF, this.y + CELL_SIZE)
        l2.angle = 180

        this.map.graphicsLayer.addChild(l1)
        this.map.graphicsLayer.addChild(l2)
    }

    // - left to right starter
    private drawStarterLeftToRight() {
        const g = (this.graphics.g = new PIXI.Graphics())
        const diff = this.thicknessBig / 2 / 2

        g.beginFill(this.bigColor)
        g.drawCircle(diff, HALF, this.thicknessBig / 2)
        g.endFill()

        g.beginFill(this.bigColor)
        g.drawRect(diff, HALF - this.thicknessBig / 2, HALF - diff, this.thicknessBig)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(diff, HALF - this.thicknessSmall / 2, HALF - diff, this.thicknessSmall)
        g.endFill()

        g.position.set(this.x + HALF, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // - right to left starter
    private drawStarterRightToLeft() {
        const g = (this.graphics.g = new PIXI.Graphics())
        const diff = this.thicknessBig / 2 / 2

        g.beginFill(this.bigColor)
        g.drawCircle(HALF - diff, HALF, this.thicknessBig / 2)
        g.endFill()

        g.beginFill(this.bigColor)
        g.drawRect(0, HALF - this.thicknessBig / 2, HALF - diff, this.thicknessBig)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(0, HALF - this.thicknessSmall / 2, HALF - diff, this.thicknessSmall)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // | top to bottom starter
    private drawStarterTopToBottom() {
        const g = (this.graphics.g = new PIXI.Graphics())
        const diff = this.thicknessBig / 2 / 2

        g.beginFill(this.bigColor)
        g.drawCircle(HALF, HALF + diff, this.thicknessBig / 2)
        g.endFill()

        g.beginFill(this.bigColor)
        g.drawRect(HALF - this.thicknessBig / 2, HALF + diff, this.thicknessBig, HALF)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(HALF - this.thicknessSmall / 2, HALF + diff, this.thicknessSmall, HALF - diff)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // | bottom to top starter
    private drawStarterBottomToTop() {
        const g = (this.graphics.g = new PIXI.Graphics())

        g.beginFill(this.bigColor)
        g.drawCircle(HALF, HALF, this.thicknessBig / 2)
        g.endFill()

        g.beginFill(this.bigColor)
        g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, HALF)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, HALF)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // ⊤ Horizontal with bottom neighbour
    private drawHorizontalWithBottomNeighbour() {
        const g = (this.graphics.g = new PIXI.Graphics())
        g.beginFill(this.bigColor)
        g.drawRect(0, HALF - this.thicknessBig / 2, CELL_SIZE, this.thicknessBig)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(0, HALF - this.thicknessSmall / 2, CELL_SIZE, this.thicknessSmall)
        g.endFill()

        // Extra
        g.beginFill(this.bigColor)
        g.drawRect(
            HALF - this.thicknessBig / 2,
            HALF + this.thicknessSmall,
            this.thicknessBig,
            HALF - this.thicknessSmall
        )
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(HALF - this.thicknessSmall / 2, HALF, this.thicknessSmall, HALF)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // ⊥  Horizontal with top neighbour
    private drawHorizontalWithTopNeighbour() {
        const g = (this.graphics.g = new PIXI.Graphics())
        g.beginFill(this.bigColor)
        g.drawRect(0, HALF - this.thicknessBig / 2, CELL_SIZE, this.thicknessBig)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(0, HALF - this.thicknessSmall / 2, CELL_SIZE, this.thicknessSmall)
        g.endFill()

        // Extra
        g.beginFill(this.bigColor)
        g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, HALF - this.thicknessSmall)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, HALF)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // ⊣ Vertical with left neighbour
    private drawVerticalWithLeftNeighbour() {
        const g = (this.graphics.g = new PIXI.Graphics())

        g.beginFill(this.bigColor)
        g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, CELL_SIZE)
        g.endFill()
        g.position.set(this.x, this.y)

        g.beginFill(this.smallColor)
        g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, CELL_SIZE)
        g.endFill()

        // Extra
        g.beginFill(this.bigColor)
        g.drawRect(0, HALF - this.thicknessBig / 2, HALF - this.thicknessSmall, this.thicknessBig)
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(0, HALF - this.thicknessSmall / 2, HALF, this.thicknessSmall)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    // ⊢ Vertical with right neighbour
    private drawVerticalWithRightNeighbour() {
        const g = (this.graphics.g = new PIXI.Graphics())

        g.beginFill(this.bigColor)
        g.drawRect(HALF - this.thicknessBig / 2, 0, this.thicknessBig, CELL_SIZE)
        g.endFill()
        g.position.set(this.x, this.y)

        g.beginFill(this.smallColor)
        g.drawRect(HALF - this.thicknessSmall / 2, 0, this.thicknessSmall, CELL_SIZE)
        g.endFill()

        // Extra
        g.beginFill(this.bigColor)
        g.drawRect(
            HALF + this.thicknessSmall,
            HALF - this.thicknessBig / 2,
            HALF - this.thicknessSmall,
            this.thicknessBig
        )
        g.endFill()

        g.beginFill(this.smallColor)
        g.drawRect(HALF, HALF - this.thicknessSmall / 2, HALF, this.thicknessSmall)
        g.endFill()

        g.position.set(this.x, this.y)
        this.map.graphicsLayer.addChild(g)
    }

    private setup() {
        this.base.beginFill(0x000000)
        this.base.drawRect(0, 0, CELL_SIZE, CELL_SIZE)
        this.base.endFill()

        this.base.position.set(this.x, this.y)

        this.drawByNeighbours()

        this.map.baseLayer.addChild(this.base)
    }

    public containsPoint(x, y): boolean {
        const point = new PIXI.Point(x, y)
        return this.base.containsPoint(point)
    }

    public destroy() {
        Object.entries(this.graphics).forEach(([g, key]) => {
            this.graphics[g].destroy()
            delete this.graphics[key]
        })
        this.base.destroy()
    }
}
