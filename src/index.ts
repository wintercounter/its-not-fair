import * as PIXI from 'pixi.js'

import Map, { getNeighboursByCoords } from './map'
import keyboard from './keyboard'
import SpritePacMan from '@/assets/pacman.png'
import './style.scss'

const UP = 'up'
const RIGHT = 'right'
const DOWN = 'down'
const LEFT = 'left'

let type = 'WebGL'
let PacMan
let CurrentDirection = RIGHT

if (!PIXI.utils.isWebGLSupported()) {
    type = 'canvas'
}

PIXI.utils.sayHello(type)

//Create a Pixi Application
const app = new PIXI.Application({
    width: 900,
    height: 900,
    antialias: true,
    transparent: false,
    resolution: 1
})

app.renderer.backgroundColor = 0x061639

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)

const tryStep = function({_vx, _vy, _angle, _direction}) {
    const x = Math.min(
        Math.max(PacMan.width / 2, PacMan.x + _vx),
        app.screen.width - PacMan.width + PacMan.width / 2
    )
    const y = Math.min(
        Math.max(PacMan.height / 2, PacMan.y + _vy),
        app.screen.height - PacMan.height + PacMan.height / 2
    )

    const cells = getNeighboursByCoords(x, y, PacMan.width, PacMan.height)

    for (const cell of cells) {
        const {
            id,
            graphics,
            props: { walkThrough }
        } = cell

        const diff = PacMan.width / 2 - 1

        if (!walkThrough &&
            (graphics.containsPoint(new PIXI.Point(x - diff, y - diff)) ||
                graphics.containsPoint(new PIXI.Point(x + diff, y + diff)) ||
                graphics.containsPoint(new PIXI.Point(x - diff, y + diff)) ||
                graphics.containsPoint(new PIXI.Point(x + diff, y - diff))
            )
        ) {
            return false
        }
    }
    PacMan.angle = _angle
    PacMan.x = x
    PacMan.y = y
    CurrentDirection = _direction
    return true
}

const gameLoop = function() {
    // Check buffered direction first
    console.log(CurrentDirection, PacMan._direction)
    if (PacMan._direction !== CurrentDirection && tryStep(DIRECTION_PROPS[PacMan._direction])) {

    }
    else {
        tryStep(DIRECTION_PROPS[CurrentDirection])
    }
}

const DIRECTION_PROPS = {
    [UP]: {
        _vx: 0,
        _vy: -5,
        _angle: 270,
        _direction: UP
    },
    [RIGHT]: {
        _vx: 5,
        _vy: 0,
        _angle: 0,
        _direction: RIGHT
    },
    [DOWN]: {
        _vx: 0,
        _vy: 5,
        _angle: 90,
        _direction: DOWN
    },
    [LEFT]: {
        _vx: -5,
        _vy: 0,
        _angle: 180,
        _direction: LEFT
    }
}

const setup = function(loader) {
    PacMan = new PIXI.Container()
    const Player = new PIXI.Sprite(loader.resources[SpritePacMan].texture)
    Player.anchor.set(0.5)
    PacMan.addChild(Player)

    app.stage.addChild(Map)
    app.stage.addChild(PacMan)
    PacMan._vx = 0
    PacMan._vy = 0
    PacMan._direction = RIGHT

    PacMan.width = 30
    PacMan.height = 30

    app.stage.addChild(PacMan)

    //Capture the keyboard arrow keys
    const left = keyboard('ArrowLeft'),
        up = keyboard('ArrowUp'),
        right = keyboard('ArrowRight'),
        down = keyboard('ArrowDown')


    left.press = () => PacMan._direction = LEFT
    up.press = () => PacMan._direction = UP
    right.press = () => PacMan._direction = RIGHT
    down.press = () => PacMan._direction = DOWN

    app.ticker.add(gameLoop)
}

app.loader.add(SpritePacMan).load(setup)
