import * as PIXI from 'pixi.js'
import Player from '@/Players'
import { CELL_SIZE } from '@/constants/Sizes'

export default class Monster extends Player {
    private base

    private anim

    private customLoopTimer = 0

    public constructor(args) {
        super(args)
        this.setup()
    }

    public setupMonster() {
        const sheet = this.app.loader.resources['monster'].spritesheet
        const anim = (this.anim = new PIXI.AnimatedSprite(sheet.animations['Walk']))
        anim.x = 0
        anim.y = 0
        anim.anchor.set(0.5)
        anim.animationSpeed = 1
        anim.scale.set(0.125)
        anim.play()
    }

    public setupBase() {
        const base = (this.base = new PIXI.Graphics())
        base.alpha = 0
        base.beginFill(0xff99ff)
        base.drawRect(0, 0, CELL_SIZE, CELL_SIZE)
        base.endFill()
        base.x = CELL_SIZE / -2
        base.y = CELL_SIZE / -2
    }

    private setup() {
        const { x, y, defaultDirection } = this.getSpawnPosition()
        this.direction = this.nextDirection = defaultDirection
        this.setupBase()
        this.setupMonster()

        this.container.x = x
        this.container.y = y
        this.container.width = CELL_SIZE
        this.container.height = CELL_SIZE

        this.container.addChild(this.base)
        this.container.addChild(this.anim)
    }

    public draw() {
        // Check buffered direction first
        if (this.nextDirection !== this.direction && this.tryNext(this.nextProps)) {
            // eslint-disable-line
        } else {
            this.tryNext(this.currentProps)
        }
    }
}
