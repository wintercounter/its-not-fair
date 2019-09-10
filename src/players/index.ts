import * as PIXI from 'pixi.js'
import Hammer from 'hammerjs'

import keyboard from '@/utils/keyboardEvents'
import { DOWN, LEFT, RIGHT, UP } from '@/constants/Directions'

const DIRECTION_PROPS = {
    [UP]: {
        vx: 0,
        vy: -1,
        angle: 270,
        direction: UP
    },
    [RIGHT]: {
        vx: 1,
        vy: 0,
        angle: 0,
        direction: RIGHT
    },
    [DOWN]: {
        vx: 0,
        vy: 1,
        angle: 90,
        direction: DOWN
    },
    [LEFT]: {
        vx: -1,
        vy: 0,
        angle: 180,
        direction: LEFT
    }
}

interface IPlayer {
    container: PIXI.Container
}

export default class Player implements IPlayer {
    static RUNNING = 'running'
    static STOPPED = 'stopped'

    container = new PIXI.Container()

    direction = RIGHT
    nextDirection = RIGHT
    state = Player.RUNNING

    app
    map

    get nextProps() {
        return DIRECTION_PROPS[this.nextDirection]
    }

    get currentProps() {
        return DIRECTION_PROPS[this.direction]
    }

    constructor() {
        this.bind()
    }

    tryNext({ vx, vy, angle, direction }) {
        const { x, y, width, height } = this.container
        const newX = Math.min(Math.max(width / 2, x + vx), this.app.screen.width - width + width / 2)
        const newY = Math.min(Math.max(height / 2, y + vy), this.app.screen.height - height + height / 2)

        const cells = this.map.getNeighboursByCoords(x, y, width, height)

        for (const cell of cells) {
            const {
                graphics,
                props: { walkThrough }
            } = cell

            const diff = width / 2 - 1

            if (
                !walkThrough &&
                (graphics.containsPoint(new PIXI.Point(newX - diff, newY - diff)) ||
                    graphics.containsPoint(new PIXI.Point(newX + diff, newY + diff)) ||
                    graphics.containsPoint(new PIXI.Point(newX - diff, newY + diff)) ||
                    graphics.containsPoint(new PIXI.Point(newX + diff, newY - diff)))
            ) {
                this.state = this.direction === direction ? Player.STOPPED : Player.RUNNING
                return false
            }
        }

        this.state = Player.RUNNING
        this.container.angle = angle
        this.container.x = newX
        this.container.y = newY
        this.direction = direction

        return true
    }

    bind() {
        //Capture the keyboard arrow keys
        const left = keyboard('ArrowLeft'),
            up = keyboard('ArrowUp'),
            right = keyboard('ArrowRight'),
            down = keyboard('ArrowDown')

        left.press = () => (this.nextDirection = LEFT)
        up.press = () => (this.nextDirection = UP)
        right.press = () => (this.nextDirection = RIGHT)
        down.press = () => (this.nextDirection = DOWN)

        // Touch events
        const mc = new Hammer(document.documentElement)
        mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 10 })
        mc.on('panleft panright panup pandown', ev => {
            Math.abs(ev.velocity) > 0.2 && (this.nextDirection = ev.type.replace('pan', ''))
        })
    }
}
