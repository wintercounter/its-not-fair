import * as PIXI from 'pixi.js'
import Player from '@/players'
import { CELL_SIZE } from '@/constants/Sizes'

export default class PacMan extends Player {
    private PacMan1

    private PacMan2

    private customLoopTimer = 0

    public constructor(args) {
        super(args)
        this.beforeSetup()
        this.setup()
        this.afterSetup()
    }

    public setupPacMan1() {
        const PacMan1 = (this.PacMan1 = new PIXI.Graphics())
        PacMan1.beginFill(0xff9900)
        PacMan1.arc(0, 0, CELL_SIZE * 2, Math.PI / 5, -Math.PI / 5, false)
        PacMan1.lineTo(0, 0)
        PacMan1.endFill()
        PacMan1.x = 0
        PacMan1.y = 0
        PacMan1.scale = new PIXI.Point(0.25, 0.25)
    }

    public setupPacMan2() {
        const PacMan2 = (this.PacMan2 = new PIXI.Graphics())
        PacMan2.beginFill(0xff9900)
        PacMan2.arc(0, 0, CELL_SIZE * 2, Math.PI / 15, -Math.PI / 15, false)
        PacMan2.lineTo(0, 0)
        PacMan2.endFill()
        PacMan2.x = 0
        PacMan2.y = 0
        PacMan2.scale = new PIXI.Point(0.25, 0.25)
    }

    private setup() {
        const { x, y, defaultDirection } = this.getSpawnPosition()
        this.direction = this.nextDirection = defaultDirection
        this.setupBase()
        this.setupPacMan1()
        this.setupPacMan2()

        this.container.x = x
        this.container.y = y
        this.container.width = CELL_SIZE
        this.container.height = CELL_SIZE

        this.container.addChild(this.base)
        this.container.addChild(this.PacMan1)
        this.container.addChild(this.PacMan2)
    }

    public draw() {
        if (!this.beforeDraw()) {
            return
        }
        if (this.state === Player.RUNNING && this.customLoopTimer++ > 4) {
            this.PacMan2.visible = !this.PacMan2.visible
            this.customLoopTimer = 0
        }

        // Check buffered direction first
        if (this.nextDirection !== this.direction && this.tryNext(this.nextProps)) {
            // eslint-disable-line
        } else {
            this.tryNext(this.currentProps) && (this.container.angle = this.currentProps.angle)
        }
        this.afterDraw()
    }
}
