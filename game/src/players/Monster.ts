import * as PIXI from 'pixi.js'
import Player from '@/players'
import { CELL_SIZE } from '@/constants/Sizes'
import { LEFT, RIGHT } from '@/constants/Directions'

const ANIM_SCALE = 0.8

export default class Monster extends Player {
    private animations

    public constructor(args) {
        super(args)
        this.beforeSetup()
        this.setup()
        this.afterSetup()
    }

    private setupAnimationDirection() {
        const lastScaleX = this.animations.walk.scale.x
        const scaleX =
            this.nextDirection === RIGHT ? -ANIM_SCALE : this.nextDirection === LEFT ? ANIM_SCALE : lastScaleX
        Object.values(this.animations).forEach(anim => {
            // @ts-ignore
            anim.scale.set(scaleX, ANIM_SCALE)
        })
    }

    private setAnimation() {
        switch (this.state) {
            default:
            case Monster.RUNNING:
                this.animations.idle.visible = false
                this.animations.walk.visible = true
                break
            case Monster.STOPPED:
                this.animations.idle.visible = true
                this.animations.walk.visible = false
                break
        }
    }

    public setupMonster() {
        const sheet = this.app.loader.resources.monster.spritesheet
        const animations = (this.animations = {
            walk: new PIXI.AnimatedSprite(sheet.animations.Walk),
            idle: new PIXI.AnimatedSprite(sheet.animations.Idle)
        })
        this.setAnimation()
        this.setupAnimationDirection()
        Object.values(animations).forEach(anim => {
            anim.x = 0
            anim.y = CELL_SIZE / 2 + 4 // some extra cuz of scaling
            anim.anchor.set(0.5, 1)
            anim.play()
        })
        animations.walk.animationSpeed = 1
        animations.idle.animationSpeed = 0.3
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
        this.container.addChild(this.animations.idle)
        this.container.addChild(this.animations.walk)
    }

    public draw() {
        if (!this.beforeDraw()) {
            return
        }
        if (this.previousState !== this.state) {
            this.setAnimation()
        }
        // Check buffered direction first
        if (this.nextDirection !== this.direction && this.tryNext(this.nextProps)) {
            this.setupAnimationDirection()
        } else {
            this.tryNext(this.currentProps)
        }
        this.afterDraw()
    }
}
