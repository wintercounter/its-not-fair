import * as PIXI from 'pixi.js'

import Map, { getNeighboursByCoords } from './map'
import keyboard from './keyboard'
import SpritePacMan from '@/assets/pacman.png'
import './style.scss'

const TOP = 'top'
const RIGHT = 'right'
const BOTTOM = 'bottom'
const LEFT = 'left'

let type = 'WebGL'
let PacMan
let Direction = RIGHT

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

const gameLoop = function() {
    const x = Math.min(
        Math.max(PacMan.width / 2, PacMan.x + PacMan.vx),
        app.screen.width - PacMan.width + PacMan.width / 2
    )
    const y = Math.min(
        Math.max(PacMan.height / 2, PacMan.y + PacMan.vy),
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

        if (
            !walkThrough &&
            (graphics.containsPoint(new PIXI.Point(x - diff, y - diff)) ||
                graphics.containsPoint(new PIXI.Point(x + diff, y + diff)))
        ) {
            return
        }
    }

    PacMan.x = x
    PacMan.y = y
    //Direction = PacMan.direction
}

const setup = function(loader) {
    PacMan = new PIXI.Container()
    const Player = new PIXI.Sprite(loader.resources[SpritePacMan].texture)
    Player.anchor.set(0.5)
    PacMan.addChild(Player)

    app.stage.addChild(Map)
    app.stage.addChild(PacMan)
    PacMan.vx = 0
    PacMan.vy = 0

    PacMan.width = 30
    PacMan.height = 30

    app.stage.addChild(PacMan)

    //Capture the keyboard arrow keys
    const left = keyboard('ArrowLeft'),
        up = keyboard('ArrowUp'),
        right = keyboard('ArrowRight'),
        down = keyboard('ArrowDown')

    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        PacMan.vx = -5
        PacMan.vy = 0
        PacMan.angle = 180
        //PacMan.direction = LEFT
    }

    //Up
    up.press = () => {
        PacMan.vy = -5
        PacMan.vx = 0
        PacMan.angle = 270
        //PacMan.direction = TOP
    }

    //Right
    right.press = () => {
        PacMan.vx = 5
        PacMan.vy = 0
        PacMan.angle = 0
        //PacMan.direction = RIGHT
    }

    //Down
    down.press = () => {
        PacMan.vy = 5
        PacMan.vx = 0
        PacMan.angle = 90
        //PacMan.direction = BOTTOM
    }

    app.ticker.add(gameLoop)
}

app.loader.add(SpritePacMan).load(setup)
