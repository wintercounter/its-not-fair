import * as PIXI from 'pixi.js'
import Player from '@/Players'

export default class Monster extends Player {
    public constructor() {
        super()

        this.setup()
    }

    private setup() {
        const base = new PIXI.Graphics()
        base.alpha = 0
        base.beginFill(0xff99ff)
        base.drawRect(0, 0, 30, 30)
        base.endFill()
        base.x = -15
        base.y = -15
        console.log(this)
        const sheet = this.app.loader.resources['monster.json'].spritesheet

        console.log(sheet)

        /* // create an array of textures from an image path
        const frames = []

        for (let i = 0; i < 19; i++) {
            const val = i < 10 ? `0${i}` : i

            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.from(`Walk_${val}.png`))
        }

        // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
        const anim = new PIXI.AnimatedSprite(frames)

        anim.x = 0
        anim.y = 0
        anim.anchor.set(0.5)
        anim.animationSpeed = 0.5
        anim.play()

        this.container.addChild(base)
        this.container.addChild(anim)*/
        this.container.addChild(base)
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
