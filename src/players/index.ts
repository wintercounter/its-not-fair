import * as PIXI from 'pixi.js'
import Hammer from 'hammerjs'

import keyboard from '@/utils/keyboardEvents'
import { DOWN, LEFT, RIGHT, UP } from '@/constants/Directions'
import SpawnPoint from '@/cells/SpawnPoint'
import { CELL_SIZE } from '@/constants/Sizes'

const DIRECTION_PROPS = {
    [UP]: {
        vx: 0,
        vy: -5,
        angle: 270,
        direction: UP
    },
    [RIGHT]: {
        vx: 5,
        vy: 0,
        angle: 0,
        direction: RIGHT
    },
    [DOWN]: {
        vx: 0,
        vy: 5,
        angle: 90,
        direction: DOWN
    },
    [LEFT]: {
        vx: -5,
        vy: 0,
        angle: 180,
        direction: LEFT
    }
}

interface IPlayer {
    container: PIXI.Container
}

export default class Player implements IPlayer {
    public static RUNNING = 'running'

    public static STOPPED = 'stopped'

    public container = new PIXI.Container()

    public direction = RIGHT

    public nextDirection = RIGHT

    public state = Player.RUNNING

    public app

    public map

    public get nextProps() {
        return DIRECTION_PROPS[this.nextDirection]
    }

    public get currentProps() {
        return DIRECTION_PROPS[this.direction]
    }

    public constructor({ map }) {
        this.map = map
        this.bind()
    }

    public getSpawnPosition() {
        const cells = this.map.getCellsByType(SpawnPoint).filter(({ isOccupied }) => !isOccupied)
        const cell = cells[Math.floor(Math.random() * cells.length)]
        cell.hasPlayer()
        return {
            x: cell.x + CELL_SIZE / 2,
            y: cell.y + CELL_SIZE / 2,
            defaultDirection: cell.defaultDirection
        }
    }

    public tryNext({ vx, vy, angle, direction }) {
        const { x, y, width, height } = this.container
        const newX = x + vx
        const newY = y + vy

        const cells = this.map.getNeighboursByCoords(x, y, width, height)

        for (const cell of cells) {
            const diff = width / 2

            if (
                !cell.walkThrough &&
                (cell.containsPoint(newX - diff, newY - diff) ||
                    cell.containsPoint(newX + (diff - 0.01), newY + (diff - 0.01)) ||
                    cell.containsPoint(newX - diff, newY + (diff - 0.01)) ||
                    cell.containsPoint(newX + (diff - 0.01), newY - diff))
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

    // eslint-disable-next-line
    public draw() {}

    private bind() {
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
