import * as PIXI from 'pixi.js'
import Hammer from 'hammerjs'

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
let Player1, Player1a
let pausePlayer = false
let touchTravels = [0, 0]

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
            pausePlayer = CurrentDirection === _direction
            return false
        }
    }
    pausePlayer = false
    PacMan.angle = _angle
    PacMan.x = x
    PacMan.y = y
    CurrentDirection = _direction
    return true
}

let playerState = 0
const gameLoop = function(delta) {
    if (!pausePlayer && playerState++ > 4) {
        Player1a.visible = !Player1a.visible
        playerState = 0
    }

    // Check buffered direction first
    if (PacMan._direction !== CurrentDirection && tryStep(DIRECTION_PROPS[PacMan._direction])) {

    }
    else {
        tryStep(DIRECTION_PROPS[CurrentDirection])
    }
}

const DIRECTION_PROPS = {
    [UP]: {
        _vx: 0,
        _vy: -3,
        _angle: 270,
        _direction: UP
    },
    [RIGHT]: {
        _vx: 3,
        _vy: 0,
        _angle: 0,
        _direction: RIGHT
    },
    [DOWN]: {
        _vx: 0,
        _vy: 3,
        _angle: 90,
        _direction: DOWN
    },
    [LEFT]: {
        _vx: -3,
        _vy: 0,
        _angle: 180,
        _direction: LEFT
    }
}

const setup = function(loader) {
    PacMan = new PIXI.Container()
    //const Player = new PIXI.Sprite(loader.resources[SpritePacMan].texture)
    // pacman
    Player1 = new PIXI.Graphics();
    Player1.beginFill(0xff9900);
    Player1.arc(0, 0, 60, Math.PI/5,-Math.PI/5,false);
    Player1.lineTo(0, 0);
    Player1.endFill();
    Player1.x = 0;
    Player1.y = 0;

    Player1a = new PIXI.Graphics();
    Player1a.beginFill(0xff9900);
    Player1a.arc(0, 0, 60, Math.PI/15,-Math.PI/15,false);
    Player1a.lineTo(0, 0);
    Player1a.endFill();
    Player1a.x = 0;
    Player1a.y = 0;

    PacMan.addChild(Player1)
    PacMan.addChild(Player1a)

    app.stage.addChild(Map)
    app.stage.addChild(PacMan)

    PacMan._vx = 0
    PacMan._vy = 0
    PacMan._direction = RIGHT
    PacMan.x = 45
    PacMan.y = 45
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

console.log(Hammer)

const canvasEl = document.querySelector('canvas')
const mc = new Hammer(canvasEl);
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 10 });

// listen to events...
mc.on("panleft panright panup pandown", function(ev) {
    console.log(ev.type, ev.velocity)
    Math.abs(ev.velocity) > 0.2 && (PacMan._direction = ev.type.replace('pan', ''))
});

app.loader.add(SpritePacMan).load(setup)
