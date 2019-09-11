import * as PIXI from 'pixi.js'
import Player from '@/Players'

export default class PacMan extends Player {
    PacMan1
    PacMan2
    customLoopTimer = 0

    constructor() {
        super()
        this.setup()
    }

    setup() {
        const base = new PIXI.Graphics()
        base.width = 30
        base.height = 30
        base.alpha = 0

        const PacMan1 = (this.PacMan1 = new PIXI.Graphics())
        PacMan1.beginFill(0xff9900)
        PacMan1.arc(0, 0, 60, Math.PI / 5, -Math.PI / 5, false)
        PacMan1.lineTo(0, 0)
        PacMan1.endFill()
        PacMan1.x = 0
        PacMan1.y = 0

        const PacMan2 = (this.PacMan2 = new PIXI.Graphics())
        PacMan2.beginFill(0xff9900)
        PacMan2.arc(0, 0, 60, Math.PI / 15, -Math.PI / 15, false)
        PacMan2.lineTo(0, 0)
        PacMan2.endFill()
        PacMan2.x = 0
        PacMan2.y = 0

        this.container.addChild(base)
        this.container.addChild(PacMan1)
        this.container.addChild(PacMan2)

        this.container.x = 45
        this.container.y = 45
        this.container.width = 30
        this.container.height = 30
    }

    draw() {
        if (this.state === Player.RUNNING && this.customLoopTimer++ > 4) {
            this.PacMan2.visible = !this.PacMan2.visible
            this.customLoopTimer = 0
        }

        // Check buffered direction first
        if (this.nextDirection !== this.direction && this.tryNext(this.nextProps)) {
        } else {
            this.tryNext(this.currentProps)
        }
    }
}
