import * as PIXI from 'pixi.js'
import Hammer from 'hammerjs'

import keyboard from '@/utils/keyboardEvents'
import { DOWN, LEFT, RIGHT, UP } from '$hared/../constants/Directions'
import SpawnPoint from '@/cells/SpawnPoint'
import { CELL_SIZE } from '$hared/../constants/Sizes'

const DIRECTION_PROPS = {
    [UP]: {
        angle: 270,
        direction: UP
    },
    [RIGHT]: {
        angle: 0,
        direction: RIGHT
    },
    [DOWN]: {
        angle: 90,
        direction: DOWN
    },
    [LEFT]: {
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

    public previousState = Player.RUNNING

    public app

    public map

    public game

    public base

    public mixins

    public controls

    public velocity = 4

    // eslint-disable-next-line
    public get diff() {
        return CELL_SIZE / 2
    }

    public get nextProps() {
        return DIRECTION_PROPS[this.nextDirection]
    }

    public get currentProps() {
        return DIRECTION_PROPS[this.direction]
    }

    private vx(dir) {
        return dir === LEFT ? this.velocity * -1 : dir === RIGHT ? this.velocity : 0
    }

    private vy(dir) {
        return dir === UP ? this.velocity * -1 : dir === DOWN ? this.velocity : 0
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

    public constructor({ game, map, app, mixins = [], controls = false }) {
        this.map = map
        this.app = app
        this.game = game
        this.controls = controls
        // @ts-ignore
        this.mixins = mixins.map(mixin => new mixin(this))
        this.bind()
    }

    public velocityByDirection(dir, additive = 0) {
        if (dir === DOWN || dir === RIGHT) {
            return this.velocity + additive
        }
        return this.velocity + additive * -1
    }

    // eslint-disable-next-line
    public newCoordsByDirection(dir, x, y): number[] {
        switch (dir) {
            case UP:
                return [x, y - CELL_SIZE]
            case DOWN:
                return [x, y + CELL_SIZE]
            case RIGHT:
                return [x + CELL_SIZE, y]
            case LEFT:
                return [x - CELL_SIZE, y]
        }
        return [0, 0]
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

    public canGo(direction) {
        const { x, y } = this.container
        const [newX, newY] = this.newCoordsByDirection(direction, x, y)
        const cell = this.map.getCellByCoords(newX, newY)

        return cell.walkThrough
    }

    public tryNext({ direction }) {
        const { x, y } = this.container
        const width = CELL_SIZE
        const height = CELL_SIZE
        const newX = x + this.vx(direction)
        const newY = y + this.vy(direction)

        const cells = this.map.getNeighboursByCoords(x, y, width, height)

        for (const cell of cells) {
            const diff = width / 2

            if (
                !cell.walkThrough &&
                (cell.containsPoint(newX - diff, newY - diff) ||
                    cell.containsPoint(newX + (diff - 4), newY + (diff - 4)) ||
                    cell.containsPoint(newX - diff, newY + (diff - 4)) ||
                    cell.containsPoint(newX + (diff - 4), newY - diff))
            ) {
                this.previousState = this.state
                this.state = this.direction === direction ? Player.STOPPED : Player.RUNNING
                return false
            }
        }

        this.state = Player.RUNNING
        this.container.x = newX
        this.container.y = newY
        this.direction = direction

        return true
    }

    public beforeDraw() {
        for (const mixin of this.mixins) {
            if (mixin.beforeDraw && !mixin.beforeDraw()) {
                return false
            }
        }
        return true
    }

    public afterDraw() {
        for (const mixin of this.mixins) {
            if (mixin.afterDraw && !mixin.afterDraw()) {
                return false
            }
        }
        return true
    }

    public beforeSetup() {
        for (const mixin of this.mixins) {
            if (mixin.beforeSetup && !mixin.beforeSetup()) {
                return false
            }
        }
        return true
    }

    public afterSetup() {
        for (const mixin of this.mixins) {
            if (mixin.afterSetup && !mixin.afterSetup()) {
                return false
            }
        }
        return true
    }

    // eslint-disable-next-line
    public draw() {
        if (!this.beforeDraw()) {
            return
        }
        this.afterDraw()
    }

    private bind() {
        if (!this.controls) {
            return
        }
        //Capture the keyboard arrow keys
        const left = keyboard('ArrowLeft'),
            up = keyboard('ArrowUp'),
            right = keyboard('ArrowRight'),
            down = keyboard('ArrowDown')

        left.press = () => {
            this.game.client.room.send({ nextDirection: LEFT })
        }
        up.press = () => {
            this.game.client.room.send({ nextDirection: UP })
        }
        right.press = () => {
            this.game.client.room.send({ nextDirection: RIGHT })
        }
        down.press = () => {
            this.game.client.room.send({ nextDirection: DOWN })
        }

        // Touch events
        const mc = new Hammer(document.documentElement)
        mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 10 })
        mc.on('panleft panright panup pandown', ev => {
            if (Math.abs(ev.velocity) > 0.2) {
                this.game.client.room.send({ nextDirection: ev.type.replace('pan', '') })
            }
        })

        this.game.client.room.onStateChange(({ players }) => {
            console.log('stateChange')
            this.nextDirection = players[this.game.client.room.sessionId].nextDirection
        })
    }
}
